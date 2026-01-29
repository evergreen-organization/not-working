import { biometricError, getKeychainPIN } from 'utils';

const INVALID_TOKEN = 'E0001';

const isRecaptchaSessionValid = ({ status, error }) => {
	return !(error === INVALID_TOKEN && status === 401);
};

const isPinLoginValid = ({ pinRemainingAttempts }) => {
	return !pinRemainingAttempts;
};

const checkBindingRequired = async ({ validateDevice }) => {
	const { isDeviceBinded, isValidDevice } = validateDevice || {};

	return !(isDeviceBinded && isValidDevice);
};

const getBiometric = async (isMfa = false) => {
	const quickPin = await getKeychainPIN('MFA Pin');
	if (quickPin === biometricError.limit) {
		return {
			ok: false,
			errorMessage: 'Biometric limit',
			errorTitle: 'Error',
		};
	}
	if (quickPin === biometricError.locked) {
		return {
			ok: false,
			errorMessage: 'Biometric locked',
			errorTitle: 'Error',
		};
	}
	if (quickPin === biometricError.noKeychain) {
		return {
			ok: false,
			errorMessage: 'Please authenticate with PIN and enable in Settings',
			errorTitle: 'No keychain found',
		};
	}

	if (quickPin === biometricError.cancelled) {
		return {
			ok: false,
			errorMessage: null,
			errorTitle: null,
		};
	}

	if (quickPin === biometricError.failed) {
		return {
			ok: false,
			errorMessage: 'Biometric error',
			errorTitle: 'Error',
		};
	}

	if (quickPin === biometricError.newEnrollment) {
		return {
			ok: false,
			quickPin,
			errorTitle: 'Biometric ID: Security Update',
			errorMessage: isMfa
				? 'Your Biometric Access has expired and has been disabled. You will need to re-enrol your fingerprint/face ID to enable Biometric Login and Biometric Approval.\n\nYou may enable it later from Profile > Settings'
				: "Your Biometric Access has expired and has been disabled. You will need to re-enrol your fingerprint/face ID to enable Biometric Login and Biometric Approval.\n\nDo you want to continue?\n\nNote:\nIf you click 'No', you may enable it later from Profile > Settings",
		};
	}

	if (!quickPin) {
		return {
			ok: false,
			errorMessage: null,
			errorTitle: null,
		};
	}

	return {
		ok: true,
		quickPin: quickPin,
		errorMessage: null,
		errorTitle: null,
	};
};
export const loginUtils = {
	isRecaptchaSessionValid,
	isPinLoginValid,
	checkBindingRequired,
	getBiometric,
};
