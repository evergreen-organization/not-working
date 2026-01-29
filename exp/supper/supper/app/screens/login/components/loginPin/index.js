import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getPin } from 'stores/pin';
import { getBiometric } from 'stores';
import { LoginPinComp } from './component';
import { biometricUtils } from '../../utils';

export const LoginPin = ({
	onBiometricLogin,
	onPinLogin,
	isAlertVisible,
	onCloseForgotPin,
	onForgotPin,
	onConfirmForgotPin,
	onBack,
}) => {
	const store_pin = useSelector(getPin);
	const biometric = useSelector(getBiometric);
	const [pin, setPin] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState('');
	const [refreshCaptcha, setRefreshCaptcha] = useState(1);
	const pinErrorMessage = store_pin?.pinRemainingAttempts
		? `Incorrect PIN. ${store_pin?.pinRemainingAttempts} attempt(s) left`
		: '';
	const isFaceID = biometricUtils.isFaceIDSupported(biometric);

	const handleDelete = () => {
		if (pin.length > 0) {
			setPin(pin.slice(0, -1));
		}
	};

	const handlePinChange = async (val, e) => {
		const enteredPin = pin + val;

		if (pin.length < 6) {
			setPin(enteredPin);
		}

		if (enteredPin.length === 6) {
			setRefreshCaptcha(refreshCaptcha + 1);
			onPinLogin(enteredPin, recaptchaToken);
			setPin('');
		}
	};

	const handleBiometricLogin = async (e) => {
		setRefreshCaptcha(refreshCaptcha + 1);
		onBiometricLogin(e, recaptchaToken);
	};

	const props = {
		handlePinChange,
		handleBiometricLogin,
		handleDelete,
		onBack,
		setRecaptchaToken,
		refreshCaptcha,
		pin,
		pinErrorMessage,
		isFaceID,
		isAlertVisible,
		onCloseForgotPin,
		onForgotPin,
		onConfirmForgotPin,
	};

	return <LoginPinComp {...props} />;
};
