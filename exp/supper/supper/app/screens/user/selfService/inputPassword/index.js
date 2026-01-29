import React, { useState } from 'react';
import routes from 'navigations/routes';
import { tranApiType } from 'constant';
import { NewPasswordView } from './component';

export const InputPassword = ({ navigation }) => {
	const [secureTextPassword, setSecureTextPassword] = useState(true);
	const [secureTextConfirm, setSecureTextConfirm] = useState(true);

	const handleSubmit = async ({ pWord }) => {
		navigation.navigate(routes.CHALLENGE_QUESTIONS, {
			tranType: 'RESET_ADID',
			tranApiType: tranApiType.RESET_ADID,
			payload: {
				secure: { password: pWord },
			},
		});
	};

	const handleSecureTextPassword = () => setSecureTextPassword(!secureTextPassword);
	const handleSecureTextConfirm = () => setSecureTextConfirm(!secureTextConfirm);

	const props = {
		handleSubmit,
		handleSecureTextPassword,
		handleSecureTextConfirm,
		secureTextPassword,
		secureTextConfirm,
	};

	return <NewPasswordView {...props} />;
};

export default InputPassword;
