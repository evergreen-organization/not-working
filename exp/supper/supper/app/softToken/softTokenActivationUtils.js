import CryptoJS from 'crypto-js';
import { NativeModules } from 'react-native';
import {
	activateTokenInstance,
	generateTokenInstance,
	generateTokenLicense,
	softTokenActivated,
} from 'stores';

const { SoftTokenModule } = NativeModules;

/** Soft Token Activation **/
export const activateSoftToken = async ({
	id,
	activationPassword,
	salt,
	serverEphemeralPublicKey,
	dispatch,
	deviceName,
}) => {
	const userIdentifier = getUserIdentifier(id);

	try {
		const responseSessionKey = await setupSessionKey({
			userIdentifier,
			activationPassword,
			salt,
			serverEphemeralPublicKey,
		});
		const responseTokenLicense = await setupTokenLicense({
			dispatch,
			...responseSessionKey,
		});
		const responseTokenInstance = await setupTokenInstance({
			deviceName,
			dispatch,
			...responseTokenLicense,
		});
		await setupTokenActivation({
			dispatch,
			userIdentifier,
			clientSessionKey: responseSessionKey.clientSessionKey,
			...responseTokenInstance,
		});

		dispatch(
			softTokenActivated({
				isActivated: true,
			}),
		);

		return { status: true };
	} catch ({ message }) {
		return { status: false, msg: message };
	}
};

/** Soft Token Activation Utils Function **/
const setupSessionKey = async (props) => {
	const { userIdentifier, activationPassword, salt, serverEphemeralPublicKey } = props;
	const clientEphemeralKey = await SoftTokenModule.generateSRPClientEphemeralKey();

	if (!clientEphemeralKey) {
		throw new Error('F01');
	}

	const { clientEphemeralPrivateKey, clientEphemeralPublicKey } = clientEphemeralKey;
	const sessionKey = await SoftTokenModule.generateSRPSessionKey(
		clientEphemeralPublicKey,
		clientEphemeralPrivateKey,
		serverEphemeralPublicKey,
		userIdentifier,
		activationPassword,
		salt,
	);

	if (!sessionKey) {
		throw new Error('F02');
	}

	const { clientSessionKey, clientEvidenceMessage } = sessionKey;

	return { clientEphemeralPublicKey, clientSessionKey, clientEvidenceMessage };
};

const setupTokenLicense = async (props) => {
	const { dispatch, clientEphemeralPublicKey, clientSessionKey, clientEvidenceMessage } = props;
	const { payload } = await dispatch(
		generateTokenLicense({
			clientEphemeralPublicKey,
			clientEvidenceMessage,
		}),
	);
	const { problem, data } = payload || {};
	if (problem) {
		throw new Error('B02');
	}
	const {
		encryptedMultiDeviceLicenseActivationMessage,
		serverEvidenceMessage,
		mac,
		encryptionCounter,
	} = data;

	const verifyServerEvidenceResult = await SoftTokenModule.verifySRPServerEvidenceMessage(
		clientEphemeralPublicKey,
		clientEvidenceMessage,
		serverEvidenceMessage,
		clientSessionKey,
	);

	if (!verifyServerEvidenceResult) {
		throw new Error('F03');
	}

	const decryptSRPDataResult = await SoftTokenModule.decryptSRPData(
		clientSessionKey,
		encryptedMultiDeviceLicenseActivationMessage,
		encryptionCounter,
		mac,
	);

	if (!decryptSRPDataResult) {
		throw new Error('F04');
	}
	const { multiDeviceLicenseActivationMessage } = decryptSRPDataResult;

	const parseSecureChannelMessageResult = await SoftTokenModule.parseSecureChannelMessage(
		multiDeviceLicenseActivationMessage,
	);

	if (!parseSecureChannelMessageResult) {
		throw new Error('F05');
	}
	const { deviceCode } = parseSecureChannelMessageResult;

	return { deviceCode };
};

const setupTokenInstance = async (props) => {
	const { dispatch, deviceCode, deviceName } = props;

	const { payload } = await dispatch(generateTokenInstance({ deviceCode, deviceName }));
	const { problem, data } = payload || {};
	if (problem) {
		throw new Error('B03');
	}
	const { instanceActivationMessage, randomPasswordDerivator, serverUTCTime } = data;

	const encrypt_rp_iv = getRandomString(16);

	const parseSecureChannelMessage2Result = await SoftTokenModule.parseSecureChannelMessage2(
		instanceActivationMessage,
		randomPasswordDerivator,
		serverUTCTime.toString(),
		encrypt_rp_iv,
	);

	if (!parseSecureChannelMessage2Result) {
		throw new Error('F06');
	}
	const { sequenceNumber, signature } = parseSecureChannelMessage2Result;
	return { sequenceNumber, signature };
};

const setupTokenActivation = async (props) => {
	const { dispatch, sequenceNumber, signature, clientSessionKey, userIdentifier } = props;
	const { payload } = await dispatch(activateTokenInstance({ sequenceNumber, signature }));

	const { problem, data } = payload || {};
	if (problem) {
		throw new Error('B04');
	}
	const { mac: SRPMAC } = data;

	const verifySRPMACResult = await SoftTokenModule.verifySRPMAC(
		SRPMAC,
		clientSessionKey,
		userIdentifier,
	);

	if (!verifySRPMACResult) {
		throw new Error('F07');
	}
};

/** Encryption & Decryption Utils Function **/
const getRandomString = (length) => {
	const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	}
	return result;
};

export const genSecretKey = (pwd, salt) =>
	CryptoJS.PBKDF2(pwd, salt, {
		keySize: 8,
		iterations: 1,
		hasher: CryptoJS.algo.SHA1,
	}).toString(CryptoJS.enc.Base64);

export const decrypt = (encryptedData, secretKey, iv) =>
	CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Base64.parse(secretKey), {
		iv: CryptoJS.enc.Utf8.parse(iv),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	}).toString(CryptoJS.enc.Utf8);

const getUserIdentifier = (text) => CryptoJS.SHA256(text).toString().toUpperCase();

export const getNumbersFromHash = (hash) => hash.replace(/\D/g, '');
