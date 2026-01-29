import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getBiometric } from 'stores';

import { biometricUtils } from '../../utils';
import { LoginFormView } from './component';
import { useCustomKeyboard } from 'react-native-custom-keyboard';

export const LoginForm = (params) => {
	const { onPasswordLogin, onBiometricLogin, onBack } = params;
	const biometric = useSelector(getBiometric);
	const [userId, setUserId] = useState(biometric.userid ?? '');
	const [pWord, setPWord] = useState('');
	const [domain, setDomain] = useState(biometric.domain ?? 0);
	const [isSecureText, setIsSecureText] = useState(true);
	const [recaptchaToken, setRecaptchaToken] = useState('');
	const [refreshCaptcha, setRefreshCaptcha] = useState(1);
	const isFaceID = biometricUtils.isFaceIDSupported(biometric);
	const { hideCustomKeyboard } = useCustomKeyboard();

	const handleBiometricLogin = async (e) => {
		onBiometricLogin(e);
	};

	const handlePasswordLogin = async (e) => {
		hideCustomKeyboard();
		setRefreshCaptcha(refreshCaptcha + 1);
		onPasswordLogin({
			id: userId,
			password: pWord,
			domain,
			recaptchaToken,
			nativeEvent: e.nativeEvent,
		});
	};

	const handleChangeId = (text) => setUserId(text);
	const handleChangePassword = (text) => setPWord(text);
	const handleToggleDomain = (_) => setDomain((d) => (d === 0 ? 1 : 0));
	const handleTogglePassword = (_) => setIsSecureText(!isSecureText);
	const handleRecaptchaLoad = (token) => setRecaptchaToken(token);

	const props = {
		handleChangeId,
		handleChangePassword,
		handleToggleDomain,
		handleTogglePassword,
		handleRecaptchaLoad,
		handleBiometricLogin,
		handlePasswordLogin,
		onBack,
		refreshCaptcha,
		userId,
		pWord,
		domain,
		isSecureText,
		isFaceID,
		storedUserId: biometric.userid,
	};

	return <LoginFormView {...props} />;
};
