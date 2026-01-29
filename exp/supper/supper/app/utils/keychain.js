import SInfo from 'react-native-sensitive-info';
import { localDeviceInfo } from './localDeviceInfo';
import { isIos } from 'constant';
const keychainService = 'keychainService';
const header = 'Touch ID Authorization';
const desc_set = 'Store login credentials to enable Quick Login';
const desc_get = 'Biometric Login with Touch ID';
const keyName = 'pbexKey';

export const biometricError = {
	limit: 'limit',
	locked: 'locked',
	noKeychain: 'noKeychain',
	cancelled: 'cancelled',
	failed: 'failed',
	disabled: 'disabled',
	newEnrollment: 'newEnrollment',
};

export const hasSensor = async () => {
	try {
		return await SInfo.isSensorAvailable();
	} catch (error) {
		if (error.message?.includes('locked')) {
			return biometricError.locked;
		}
		return null;
	}
};

export const setKeychain = async (pin) => {
	await deleteKeychain();
	return SInfo.setItem(keyName, pin, {
		sharedPreferencesName: localDeviceInfo.deviceBundleId,
		keychainService: keychainService,
		touchID: true,
		showModal: true,
		kSecAccessControl: 'kSecAccessControlBiometryAny',
		strings: {
			header: header,
			description: desc_set,
		},
	});
};

export const getKeychain = async (prompt) => {
	try {
		return await SInfo.getItem(keyName, {
			sharedPreferencesName: localDeviceInfo.deviceBundleId,
			keychainService: keychainService,
			touchID: true,
			showModal: true,
			strings: {
				header: header,
				description: desc_get,
			},
			kSecUseOperationPrompt: prompt,
		});
	} catch (error) {
		return handleBiometricError(error);
	}
};

export const deleteKeychain = async () => {
	return SInfo.deleteItem(keyName, {
		sharedPreferencesName: localDeviceInfo.deviceBundleId,
		keychainService: keychainService,
	});
};

//Transaction Approval
const desc_set_pin = 'Store approval credentials to enable Biometric Approval';
const desc_get_pin = 'Biometric Approval with Touch ID';
const keyPINName = 'pbexKeyPIN';

export const setKeychainPIN = async (pin) => {
	// Invalidate biometric enrollment when PIN is set on android
	if (!isIos) {
		SInfo?.setInvalidatedByBiometricEnrollment?.(true);
	}
	await deleteKeychainPIN();
	return SInfo.setItem(keyPINName, pin, {
		sharedPreferencesName: localDeviceInfo.deviceBundleId,
		keychainService: keychainService,
		touchID: true,
		showModal: true,
		kSecAccessControl: 'kSecAccessControlBiometryAny',
		strings: {
			header: header,
			description: desc_set_pin,
		},
	});
};

export const getKeychainPIN = async (prompt) => {
	try {
		return await SInfo.getItem(keyPINName, {
			sharedPreferencesName: localDeviceInfo.deviceBundleId,
			keychainService: keychainService,
			touchID: true,
			showModal: true,
			strings: {
				header: header,
				description: desc_get_pin,
			},
			kSecUseOperationPrompt: prompt,
		});
	} catch (error) {
		return handleBiometricError(error);
	}
};

const handleBiometricError = (error) => {
	// Handle new biometric enrollment
	if (
		error?.message?.includes('BadPaddingException') ||
		error?.message?.includes('Key permanently invalidated')
	) {
		return biometricError.newEnrollment;
	}

	//IOS = Retry limit exceeeded, Android = Fingerprint operation cancelled (3 times), Android = Too many attempts (5 times)
	if (
		error.message?.includes('exceeded') ||
		error.message?.includes('operation cancel') ||
		error.message?.includes('attempts')
	) {
		return biometricError.limit;
	}

	//IOS = Biometry is locked out
	if (error.message?.includes('locked')) {
		return biometricError.locked;
	}

	//No keychain is available
	if (error.message?.includes('No keychain')) {
		return biometricError.noKeychain;
	}

	if (
		error.message?.includes('failure') ||
		error.message?.includes('Only SecretKey is supported')
	) {
		return biometricError.failed;
	}

	//Android 13 - Biometrics disabled after 5 times failed
	if (error.message?.includes('Biometrics not supported')) {
		return biometricError.disabled;
	}

	if (error.message?.includes('Cancel')) {
		return biometricError.cancelled;
	}

	return null;
};

export const deleteKeychainPIN = async () => {
	return SInfo.deleteItem(keyPINName, {
		sharedPreferencesName: localDeviceInfo.deviceBundleId,
		keychainService: keychainService,
	});
};
