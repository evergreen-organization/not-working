import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { useFormikContext } from 'formik';

import { colors } from 'configs';
import { Text, TextHelper } from 'atoms';
import { FormTextInputType } from '../waterTracker.type';

export const FormTextInput = ({
	title,
	image,
	name,
	maxLength = 3,
	showCounter,
}: FormTextInputType) => {
	const { setFieldValue, values, touched, errors, setStatus, setFieldTouched } = useFormikContext();

	const onChangeText = (text: string) => setFieldValue(name, text);
	return (
		<View style={styles.container}>
			<Image source={image} style={styles.icon} />
			<View style={styles.field}>
				<Text style={styles.inputLabel}>{title}</Text>
				<View style={styles.inputContainer}>
					<TextInput
						keyboardType={'number-pad'}
						maxLength={maxLength}
						onFocus={() => {
							setFieldTouched(name, true);
							setStatus(name);
						}}
						onChangeText={(text) => onChangeText(text)}
						value={values[name]}
						style={styles.input}
						maxFontSizeMultiplier={1.15}
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	icon: {
		height: 28,
		width: 28,
		tintColor: colors.primary,
	},
	field: {
		flex: 1,
		marginLeft: 12,
	},
	inputLabel: {
		fontSize: 13,
	},
	inputContainer: {
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
		height: 40,
	},
	input: {
		fontSize: 13,
		height: '100%',
		paddingHorizontal: 10,
	},
});
