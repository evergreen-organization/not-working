import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BiometricType } from '../constant/constant';
import {
	getKeychain,
	getKeychainPIN,
	hasSensor,
	setKeychain,
	setKeychainPIN,
} from '../utils/keychain';
import { biometricDisabled, biometricEnabled, biometricTypeStored, getBiometric } from 'stores';

const useBiometric = () => {
	const dispatch = useDispatch();
	const biometric = useSelector(getBiometric);

	const isFaceIDSupported = () => biometric.biometricType === BiometricType.FACE_ID;

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

	const storeQuickLoginToken = async (token) => {
		try {
			await setKeychain(token);
		} catch (e) {
			console.error('storeQuickLoginToken', e);
		}
	};

	const getBiometricType = async () => {
		const sensor = await hasSensor();
		if (!sensor) {
			return;
		}
		const biometricType = Platform.OS === 'android' ? BiometricType.TOUCH_ID : sensor;
		dispatch(biometricTypeStored(biometricType));
		return biometricType;
	};

	const storeBiometricPIN = async (pin, isStored = false) => {
		try {
			await setKeychainPIN(pin);
			if (isStored) {
				return;
			} //If previously stored, no need to update anything
			return await enableBiometric();
		} catch (error) {
			dispatch(biometricDisabled());
		}
	};

	const enableBiometric = async () => {
		const sensor = await hasSensor();
		if (!sensor) {
			return dispatch(biometricDisabled());
		}
		if (sensor === 'Touch ID' || sensor === true) {
			dispatch(biometricEnabled());
			return;
		}
		if (sensor === 'Face ID') {
			try {
				await getKeychainPIN('Face ID authorization for first time');
				dispatch(biometricEnabled());
			} catch (e) {
				dispatch(biometricDisabled());
			}
		}
	};

	return {
		isFaceIDSupported,
		getBiometricType,
		getQuickLoginToken,
		storeQuickLoginToken,
		storeBiometricPIN,
	};
};

export default useBiometric;
