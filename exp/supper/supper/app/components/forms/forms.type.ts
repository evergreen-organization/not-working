import { FormikHelpers, FormikValues } from 'formik';
import React from 'react';
import { ViewStyle } from 'react-native';

export interface FormType {
	initialValues: FormikValues;
	onSubmit: (
		values: FormikValues,
		formikHelpers: FormikHelpers<FormikValues>,
	) => void | Promise<any>;
	validationSchema: any;
	children: React.JSX.Element | React.JSX.Element[];
	enableReinitialize?: boolean;
	alwaysBounceVertical?: boolean;
	enableScrollView?: boolean;
	header?: React.JSX.Element;
	button: React.JSX.Element;
}

export interface FormButtonBottomType {
	title: string;
	loading?: boolean;
	style?: ViewStyle;
	buttonStyle?: ViewStyle;
	testID?: string;
}
