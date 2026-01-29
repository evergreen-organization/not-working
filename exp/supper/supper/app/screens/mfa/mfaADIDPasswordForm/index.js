import React, { useState } from 'react';
import * as Yup from 'yup';
import { idRegex } from 'utils';
import { routes } from 'navigations';
import { MFAAADIDPasswordFormComp } from './component';

export const MfaADIDPasswordForm = ({ navigation }) => {
	const initialValues = { username: '', pWord: '' };
	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required()
			.max(10)
			.label('Username')
			.matches(idRegex, 'Username should be alphanumeric and max length is 10'),
		pWord: Yup.string().required().max(100).label('Password'),
	});
	const [secureTextPassword, setSecureTextPassword] = useState(true);

	const handleSecureTextPassword = () => setSecureTextPassword(!secureTextPassword);

	const handleSubmit = () => navigation.navigate(routes.MFA_QR_SCAN);

	const props = {
		handleSubmit,
		handleSecureTextPassword,
		initialValues,
		validationSchema,
		secureTextPassword,
	};
	return <MFAAADIDPasswordFormComp {...props} />;
};
