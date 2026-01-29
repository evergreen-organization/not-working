import React from 'react';
import { View } from 'react-native';
import { useFormikContext } from 'formik';

import { TextHelper } from 'atoms';
import { FormFieldView, FormTitle } from '../components';

export const FormDropDown = ({
	label,
	mandatory = true,
	disabled = false,
	onFormPickerPress,
	renderModal,
	value,
	name,
	testID,
	placeholder,
	textInputStyle,
	formikContext,
}) => {
	const { touched, errors, values } = useFormikContext() ?? formikContext;
	return (
		<View style={{ flex: 1 }}>
			<FormTitle label={label} mandatory={mandatory} />
			<FormFieldView
				testID={testID}
				disabled={disabled}
				onPress={onFormPickerPress}
				showValue={values[name]}
				displayValue={value}
				placeHolder={placeholder}
				textInputStyle={textInputStyle}
			/>
			{touched[name] && <TextHelper isValid={!errors[name]} errorMsg={errors[name]} />}
			{renderModal}
		</View>
	);
};
