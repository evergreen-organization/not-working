import React from 'react';
import { routes } from 'navigations';
import { NativeModules } from 'react-native';
import { setKeychainPIN, showFailure } from 'utils';
import { useDispatch } from 'react-redux';
import { biometricDisabled, biometricEnabled } from 'stores';
import { BIO_CONSTANT } from '../constants';
import { MfaBiometricEnroll } from 'templates';
const { SoftTokenModule } = NativeModules;

export const MFAEnrollBiometric = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const data = route?.params;
	const handleSkip = () => {
		dispatch(biometricDisabled());
		navigation.navigate(routes.MFA_SUCCESS);
	};

	const handleEnableBiometric = async () => {
		try {
			await setKeychainPIN(BIO_CONSTANT);
			const { status } = await SoftTokenModule.activateBiometric(data?.newPin);
			if (status !== 'S') {
				failActivateBiometric();
				return;
			}
			dispatch(biometricEnabled());
			navigation.navigate(routes.MFA_SUCCESS);
		} catch (error) {
			return failActivateBiometric();
		}
	};

	const failActivateBiometric = () => {
		dispatch(biometricDisabled());
		showFailure('Biometric activation unsuccessful. Please try again later.');
		navigation.navigate(routes.MFA_SUCCESS);
	};

	const props = {
		handleSkip,
		handleEnableBiometric,
		subTitle: 'Do you want to enable',
	};

	return <MfaBiometricEnroll {...props} />;
};
