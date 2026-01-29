import React, { useEffect } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useFormikContext } from 'formik';

import { Text, TextHelper } from 'atoms';

import { styles } from './styles';
import { FormTitle } from '../components';

export const FormTextInput = ({
	prefix,
	label = null,
	subtitle = null,
	name,
	maxLength = 255,
	numberOfLines = 1,
	multiline = false,
	showCounter = false,
	loading,
	style,
	numeric = false,
	allowClear,
	error = '',
	editable = true,
	textInputStyle,
	mandatory = false,
	capitalise = false,
	...otherProps
}) => {
	const { setFieldTouched, setFieldValue, setFieldError, values, touched, errors, setStatus } =
		useFormikContext();

	useEffect(() => {
		setFieldError(name, error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	const onChangeText = (text) => {
		if (capitalise) {
			return setFieldValue(name, text.toUpperCase());
		}
		setFieldValue(name, text);
	};

	return (
		<View style={styles.container}>
			<FormTitle label={label} subtitle={subtitle} mandatory={mandatory} />

			<View style={[styles.inputContainer, prefix && styles.prefixView, style]}>
				{prefix && (
					<View style={styles.prefixContainer}>
						<Text style={{ fontSize: 13 }}>{prefix}</Text>
					</View>
				)}
				<TextInput
					testID={otherProps.testID}
					style={[prefix ? styles.prefix : styles.input, textInputStyle]}
					onFocus={() => {
						setFieldTouched(name, true);
						setStatus(name);
					}}
					onBlur={() => setFieldTouched(name, false)}
					onChangeText={(text) => onChangeText(text)}
					value={values[name]}
					maxLength={maxLength}
					numberOfLines={numberOfLines}
					multiline={multiline}
					editable={editable}
					keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
					{...otherProps}
				/>
			</View>
			{touched[name] && (
				<TextHelper
					isValid={!errors[name]}
					errorMsg={errors[name]}
					length={values[name]?.length}
					maxLength={maxLength}
					showCount={touched[name] && showCounter}
				/>
			)}
		</View>
	);
};
