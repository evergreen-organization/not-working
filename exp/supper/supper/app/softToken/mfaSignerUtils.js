import CryptoJS from 'crypto-js';
import Moment from 'moment';
import { NativeModules } from 'react-native';
import { clientServerTimeShiftStored, requestExecTransaction, requestServerUtcTime } from 'stores';
import { MFA_ERROR } from '../screens/mfa/mfaErrorCodes';

const { SoftTokenModule, SoftTokenSigner } = NativeModules;

const DigipassSDKConstants = {
	CRYPTO_APPLICATION_INDEX_APP_1: 1,
	CRYPTO_APPLICATION_INDEX_APP_2: 2,
};

export const OTP_TYPE = {
	DISPLAY: DigipassSDKConstants.CRYPTO_APPLICATION_INDEX_APP_1,
	LOGIN: DigipassSDKConstants.CRYPTO_APPLICATION_INDEX_APP_2,
};

export const generateClientServerTimeShift = async ({ dispatch }) => {
	const { payload } = await dispatch(requestServerUtcTime({}));
	if (payload?.problem) {
		return {
			status: 'E',
			errorMessage: payload?.problem,
		};
	}

	// check if payload.data is only string
	// prompt error if object or null and is valid number
	if (!isNumeric(payload?.data)) {
		return {
			status: 'E',
			errorMessage: `Server returning UTC time not a number. ${payload?.data}`,
		};
	}
	const utcTime = payload?.data.toString();
	const validDate = Moment(utcTime, 'x').isValid();

	if (!validDate) {
		return {
			status: 'E',
			errorMessage: `Server returning invalid UTC time. ${payload?.data}`,
		};
	}

	const clientServerTimeShift = await SoftTokenModule.getClientServerTimeShift(utcTime);

	//check if its only string
	// prompt error if object or null and is valid number
	if (!isNumeric(clientServerTimeShift)) {
		return {
			status: 'E',
			errorMessage: `Client Time shift is not a number.${clientServerTimeShift}`,
		};
	}

	dispatch(clientServerTimeShiftStored(clientServerTimeShift));
	return {
		status: 'S',
		data: {
			clientServerTimeShift,
		},
	};
};

const isNumeric = (value) => {
	if (value === null || value === '' || value === undefined) {
		return false;
	}
	return /^(-\d+|\d+)$/.test(value);
};

export const generateOTP = async ({ pinToken, type, clientServerTimeShift }) => {
	try {
		if (
			clientServerTimeShift === null ||
			clientServerTimeShift === undefined ||
			clientServerTimeShift === ''
		) {
			return {
				status: 'E',
				errorMessage: 'Client Server Time Shift is not available',
			};
		}

		return SoftTokenSigner.generateOTP(pinToken.toString(), clientServerTimeShift.toString(), type);
	} catch (error) {}
};

export const loginOTP = async ({ pinToken, dispatch }) => {
	const { payload } = await dispatch(requestServerUtcTime({}));
	if (payload?.problem) {
		return {
			status: 'E',
			errorMessage: payload?.problem,
		};
	}

	// check if payload.data is only string
	// prompt error if object or null and is valid number
	if (!isNumeric(payload?.data)) {
		return {
			status: 'E',
			errorMessage: `Server returning UTC time not a number. ${payload?.data}`,
		};
	}
	const utcTime = payload?.data.toString();
	const validDate = Moment(utcTime, 'x').isValid();

	if (!validDate) {
		return {
			status: 'E',
			errorMessage: `Server returning invalid UTC time. ${payload?.data}`,
		};
	}

	const response = await SoftTokenSigner.loginOTP(pinToken.toString(), utcTime.toString());

	// Store server time shift for offline usage during generate OTP
	if (response.status === 'S') {
		const { clientServerTimeShift } = response.data || {};
		//check if string only contains numeric
		if (isNumeric(clientServerTimeShift)) {
			await dispatch(clientServerTimeShiftStored(clientServerTimeShift));
		}
	}
	return response;
};

export const signTransactionOas = async ({ pinToken, domain, username, payload, dispatch }) => {
	const {
		status: timeStatus,
		data: timeData,
		errorMessage: timeError,
	} = await generateClientServerTimeShift({ dispatch });
	// if backend pass value then use it, else use the stored value
	if (timeStatus !== 'S') {
		return {
			status: timeStatus,
			errorCode: 999,
			errorMessage: timeError,
		};
	}

	const payloadHash = getSHA256hash(payload);
	const hexResetPayload = stringToHex(payload);
	const signatureResult = await SoftTokenSigner.signOASTransaction(
		pinToken,
		hexResetPayload,
		payloadHash,
		timeData.clientServerTimeShift,
	);
	if (signatureResult.status !== 'S') {
		let errorStatus = signatureResult.errorCode === MFA_ERROR.INVALID_PIN ? 'P01' : 'E';
		return {
			status: errorStatus,
			errorCode: signatureResult.errorCode,
			errorMessage: signatureResult.problem,
		};
	}

	const { payload: transResponse } = await dispatch(
		requestExecTransaction({
			domain,
			username,
			secureChnInfoMsg: signatureResult?.data?.SCIM,
			serialNo: signatureResult?.data?.serialNumber,
			sequenceNo: signatureResult?.data?.sequenceNumber,
			signature: signatureResult?.data?.signature,
		}),
	);
	if (!transResponse.ok) {
		return {
			status: 'E',
			errorCode: transResponse.status,
			errorMessage: transResponse.problem,
		};
	}

	return {
		status: 'S',
		payload: transResponse,
	};
};

export const changePin = async ({ oldPin, newPin }) => {
	return await SoftTokenSigner.changePin(oldPin, newPin);
};

export const oasBiometric = async () => {
	return await SoftTokenSigner.onBiometric();
};

const getSHA256hash = (text) => CryptoJS.SHA256(text).toString().toUpperCase();

const stringToHex = (text) => {
	let hex = '';
	for (let i = 0; i < text.length; i++) {
		let charCode = text.charCodeAt(i).toString(16);
		hex += ('00' + charCode).slice(-2); // Ensure two digits
	}
	return hex;
};
