import React from 'react';
import { MFAAdidInputFormComp } from './component';
import * as Yup from 'yup';
import { routes } from 'navigations';
import { idRegex } from 'utils';

export const MFAAdidForm = ({ navigation }) => {
	const initialValues = { username: '' };

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required()
			.max(10)
			.label('Username')
			.matches(idRegex, 'Username should be alphanumeric and max length is 10'),
	});

	const handleSubmit = async ({ username }) => {
		navigation.navigate(routes.MFA_QR_SCAN, { urName: username });
	};

	const props = {
		handleSubmit,
		initialValues,
		validationSchema,
	};

	return <MFAAdidInputFormComp {...props} />;
};
