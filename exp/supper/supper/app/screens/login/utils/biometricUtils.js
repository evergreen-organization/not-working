import { awaitAlert, getKeychain, hasSensor, setKeychain } from 'utils';
import { Platform } from 'react-native';
import { BiometricType } from 'constant';
import { LOGIN_MESSAGE } from '../constant';

const getQuickLoginToken = async () => {
	try {
		const key = await getKeychain('Quick Login');
		if (key === 'limit' || key === 'locked' || key === 'noKeychain' || !key) {
			return;
		}
		return key;
	} catch (e) {
		console.error('getQuickLoginToken', e);
	}
};

const getBiometricType = async () => {
	const sensor = await hasSensor();
	if (!sensor) {
		return;
	}
	return Platform.OS === 'android' ? BiometricType.TOUCH_ID : sensor;
};

const storeQuickLoginToken = async (token) => {
	try {
		await setKeychain(token);
		return { ok: true };
	} catch (e) {
		console.error('storeQuickLoginToken', e);
		return { ok: false, error: LOGIN_MESSAGE.ERROR_ENABLE_QUICK_LOGIN_FAIL };
	}
};

const isRequireBiometricEnrollment = async ({ validateDevice, biometric }) => {
	const { isValidDevice } = validateDevice;
	const { quickLogin, biometricType } = biometric;
	/* Previously enabled quickLogin but get revoked due to login in another device*/
	/*Auto enroll biometric again after user login back to this device*/
	if (quickLogin && !isValidDevice) {
		return true;
	}
	/* first time login */
	if (biometricType && quickLogin === null) {
		return await awaitAlert({
			title: 'Hello',
			message: 'Do you want to enable Quick Login?',
			buttons: [
				{
					text: 'Yes',
					onPress: () => {
						return true;
					},
				},
				{
					text: 'No',
					onPress: () => {
						return false;
					},
				},
			],
			options: { cancelable: false },
		});
	}
	return false;
};

const isFaceIDSupported = (biometric) =>
	biometric.biometricType === BiometricType.FACE_ID;

export const biometricUtils = {
	getToken: getQuickLoginToken,
	getBiometricType: getBiometricType,
	storeToken: storeQuickLoginToken,
	isFaceIDSupported: isFaceIDSupported,
	isRequireBiometricEnrollment: isRequireBiometricEnrollment,
};
