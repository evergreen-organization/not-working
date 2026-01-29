import React from 'react';
import { NativeModules } from 'react-native';
import { setKeychainPIN, showFailure } from 'utils';
import { useDispatch } from 'react-redux';
import { biometricDisabled, biometricEnabled, userStored } from 'stores';
import { BIO_CONSTANT } from '../constants';
import { MfaBiometricEnroll } from 'templates';
const { SoftTokenModule } = NativeModules;

const MFAEnrollBiometric = ({ route }) => {
	const dispatch = useDispatch();
	const { pin, userData } = route?.params ?? {};

	const handleSkip = () => {
		dispatch(biometricDisabled());
		storeUserData();
	};

	const handleEnableBiometric = async () => {
		try {
			await setKeychainPIN(BIO_CONSTANT);
			const { status } = await SoftTokenModule.activateBiometric(pin);
			if (status !== 'S') {
				failActivateBiometric();
				return;
			}
			dispatch(biometricEnabled());
		} catch (error) {
			return failActivateBiometric();
		} finally {
			storeUserData();
		}
	};

	const failActivateBiometric = () => {
		dispatch(biometricDisabled());
		showFailure('Biometric activation unsuccessful. Please try again later.');
	};

	const storeUserData = () => {
		dispatch(userStored(userData));
	};

	const props = {
		handleSkip,
		handleEnableBiometric,
		subTitle: 'Do you want to re-enable',
	};

	return <MfaBiometricEnroll {...props} />;
};

export default MFAEnrollBiometric;
