import { NativeModules } from 'react-native';
import {
	requestExchangeKeyOAS,
	requestGenLicenseActivationMsg,
	requestInitActivation,
	requestPostActivation,
	mfaActivated,
	mfaReset,
	biometricMFADestroyed,
} from 'stores';

const { SoftTokenModule } = NativeModules;

/** Soft Token Activation **/
export const activateOASSoftToken = async ({
	registrationId,
	deviceId,
	staffNo,
	activationPassword,
	dispatch,
}) => {
	try {
		const {
			status: s1,
			data: d1,
			errorCode: ec1,
			errorMessage: em1,
		} = await setupSaltKey({
			registrationId,
			deviceId,
			staffNo,
			dispatch,
		});
		if (s1 !== 'S') {
			return {
				status: s1,
				errorCode: ec1,
				errorMessage: em1,
			};
		}
		const {
			status: s2,
			data: d2,
			errorCode: ec2,
			errorMessage: em2,
		} = await setupSessionKey({
			activationPassword,
			registrationId,
			dispatch,
			...d1,
		});
		if (s2 !== 'S') {
			return {
				status: s2,
				errorCode: ec2,
				errorMessage: em2,
			};
		}
		const {
			status: s3,
			data: d3,
			errorCode: ec3,
			errorMessage: em3,
		} = await setupLicense({
			dispatch,
			deviceId,
			staffNo,
			registrationId,
			...d2,
		});
		if (s3 !== 'S') {
			return {
				status: s3,
				errorCode: ec3,
				errorMessage: em3,
			};
		}
		const data = {
			registrationId,
			deviceId,
			staffNo,
			activationPassword,
			...d3,
		};
		return { status: 'S', data };
	} catch (error) {
		return { status: 'E', errorMessage: error.localizedDescription };
	}
};

/** Soft Token Activation Utils Function **/
const setupSaltKey = async (props) => {
	const { registrationId, deviceId, staffNo, dispatch } = props;
	const {
		status,
		data: SRPCData,
		errorCode,
		errorMessage,
	} = await SoftTokenModule.generateSRPClientEphemeralKey();
	if (status !== 'S') {
		return {
			status: `F01${status}`,
			errorCode,
			errorMessage,
		};
	}
	const { clientEphemeralPrivateKey, clientEphemeralPublicKey } = SRPCData || {};

	const { payload } = await dispatch(
		requestExchangeKeyOAS({
			clientEphemeralPublicKey,
			registrationId,
			deviceId,
			staffNo,
		}),
	);

	const { problem, data } = payload || {};
	if (problem) {
		return {
			status: 'B01',
			errorCode: 'B01',
			errorMessage: problem,
		};
	}
	const { salt, serverEphemeralPubKey } = data;
	return {
		status: 'S',
		data: {
			salt,
			serverEphemeralPubKey,
			clientEphemeralPrivateKey,
			clientEphemeralPublicKey,
		},
	};
};

const setupSessionKey = async ({
	registrationId,
	activationPassword,
	salt,
	serverEphemeralPubKey,
	clientEphemeralPrivateKey,
	clientEphemeralPublicKey,
}) => {
	const { status, data, errorCode, errorMessage } = await SoftTokenModule.generateSRPSessionKey(
		clientEphemeralPublicKey,
		clientEphemeralPrivateKey,
		serverEphemeralPubKey,
		registrationId,
		activationPassword,
		salt,
	);
	if (status !== 'S') {
		return {
			status: `F02${status}`,
			errorCode,
			errorMessage,
		};
	}
	const { clientSessionKey, clientEvidenceMessage } = data;
	return {
		status: 'S',
		data: {
			clientEphemeralPublicKey,
			clientSessionKey,
			clientEvidenceMessage,
		},
	};
};

const setupLicense = async (props) => {
	const {
		dispatch,
		clientEphemeralPublicKey,
		clientSessionKey,
		clientEvidenceMessage,
		registrationId,
		deviceId,
		staffNo,
	} = props;
	const { payload } = await dispatch(
		requestGenLicenseActivationMsg({
			registrationId,
			deviceId,
			staffNo,
			clientEvidenceMessage,
		}),
	);
	const { problem, data } = payload || {};
	if (problem) {
		return {
			status: 'B02',
			errorMessage: problem,
		};
	}
	const { encryptedData, serverEvidenceMessage, mac, encryptionCounter } = data;

	const { status, errorCode, errorMessage } = await SoftTokenModule.verifySRPServerEvidenceMessage(
		clientEphemeralPublicKey,
		clientEvidenceMessage,
		serverEvidenceMessage,
		clientSessionKey,
	);

	if (status !== 'S') {
		return {
			status: `F03${status}`,
			errorCode,
			errorMessage,
		};
	}

	const {
		status: dStatus,
		data: dSRPData,
		errorCode: dSRPErrorCode,
		errorMessage: dSRPErrorMessage,
	} = await SoftTokenModule.decryptSRPData(clientSessionKey, encryptedData, encryptionCounter, mac);
	if (dStatus !== 'S') {
		return {
			status: `F04${dStatus}`,
			errorCode: dSRPErrorCode,
			errorMessage: dSRPErrorMessage,
		};
	}
	const { multiDeviceLicenseActivationMessage } = dSRPData;

	const {
		status: pStatus,
		data: pData,
		errorCode: pErrorCode,
		errorMessage: pErrorMessage,
	} = await SoftTokenModule.parseSecureChannelMessage(multiDeviceLicenseActivationMessage);
	if (pStatus !== 'S') {
		return {
			status: `F05${pStatus}`,
			errorCode: pErrorCode,
			errorMessage: pErrorMessage,
		};
	}
	const { deviceCode } = pData;
	return {
		status: 'S',
		data: {
			deviceCode,
		},
	};
};

///Step 2---------------------------------------------------------------------------------------

export const postPinSoftToken = async ({
	deviceCode,
	registrationId,
	deviceId,
	staffNo,
	tokenPin,
	dispatch,
}) => {
	try {
		const {
			status: iStatus,
			data: iData,
			errorMessage: iErrorMessage,
			errorCode: iErrorCode,
		} = await setupTokenInstance({
			deviceCode,
			registrationId,
			deviceId,
			staffNo,
			tokenPin,
			dispatch,
		});
		// Should call api even though post init failed we should still call api for api to delete the token
		// API will definitely return error.
		const { sequenceNumber, signature = 0, serialNumber } = iData;
		const { status: aStatus, errorMessage: aErrorMessage } = await setupTokenActivation({
			dispatch,
			deviceId,
			staffNo,
			registrationId,
			sequenceNumber,
			signature,
			serialNumber,
		});

		if (iStatus !== 'S') {
			destroyPBSSToken(dispatch).then();
			return {
				status: iStatus,
				errorMessage: `${iErrorCode}:${iErrorMessage}`,
			};
		}
		if (aStatus !== 'S') {
			destroyPBSSToken(dispatch).then();
			return { status: aStatus, errorMessage: aErrorMessage };
		}

		dispatch(
			mfaActivated({
				isActivated: true,
				stfNo: staffNo,
			}),
		);

		return { status: 'S' };
	} catch ({ message }) {
		//dangerous
		destroyPBSSToken(dispatch).then();
		return { status: 'E', errorMessage: message };
	}
};

const setupTokenInstance = async (props) => {
	const { dispatch, deviceCode, registrationId, deviceId, staffNo, tokenPin } = props;

	const { payload } = await dispatch(
		requestInitActivation({
			deviceCode,
			registrationId,
			deviceId,
			staffNo,
		}),
	);
	const { problem, data } = payload || {};
	if (problem) {
		return { status: 'B03', errorMessage: problem };
	}

	const { instanceActivationMessage, serverUtcTime } = data;
	const {
		status,
		data: parseData,
		errorCode: parseErrorCode,
		errorMessage,
	} = await SoftTokenModule.parseSecureChannelMessagePostInit(
		instanceActivationMessage,
		serverUtcTime.toString(),
		tokenPin,
	);
	if (status !== 'S') {
		return {
			status: 'F06',
			errorCode: parseErrorCode,
			errorMessage,
		};
	}
	const { sequenceNumber, signature, serialNumber } = parseData;
	return {
		status: 'S',
		data: {
			sequenceNumber,
			signature,
			serialNumber,
		},
	};
};

const setupTokenActivation = async (props) => {
	const { dispatch, sequenceNumber, signature, serialNumber, deviceId, staffNo, registrationId } =
		props;
	const { payload } = await dispatch(
		requestPostActivation({
			registrationId,
			deviceId,
			signature,
			serialNumber,
			sequenceNumber,
			staffNo,
		}),
	);
	const { problem } = payload || {};
	if (problem) {
		return { status: 'B04', errorMessage: problem };
	}
	return { status: 'S' };
};

export const destroyPBSSToken = async (dispatch) => {
	const { status, errorMessage } = await SoftTokenModule.deleteSecureStorage();
	if (status !== 'S') {
		return { status, errorMessage };
	}
	dispatch(biometricMFADestroyed());
	dispatch(mfaReset());
	return { status };
};
