import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';

import { colors } from 'configs';
import { Text } from 'atoms';
import { TextInput } from 'organisms';

export const FormField = ({
	name,
	inputTextStyle,
	children,
	simple,
	trim = false,
	customKeyboard = false,
	...otherProps
}) => {
	const { setFieldTouched, setFieldValue, handleBlur, values, errors, touched } =
		useFormikContext();

	const onEndEditing = () => {
		if (trim) {
			setFieldValue(name, values[name]?.trim(), true);
		}
	};

	return (
		<>
			<View style={[styles.inputContainerSimple, inputTextStyle]}>
				<View style={styles.flex}>
					<TextInput
						name={name}
						testID={otherProps.testID}
						custom={customKeyboard}
						onFocus={() => setFieldTouched(values[name], true)}
						onChangeText={(text) => setFieldValue(name, text, true)}
						value={values[name]?.toString() ?? ''}
						style={styles.input}
						maxFontSizeMultiplier={1.15}
						autoCapitalize="none"
						autoCompleteType="off"
						onBlur={handleBlur(name)}
						onEndEditing={onEndEditing}
						{...otherProps}
					/>
				</View>
				{children}
			</View>

			{errors[name] && touched[name] && (
				<View style={{ marginLeft: 5 }}>
					<Text variant={'P10'} style={styles.error}>
						{errors[name]}
					</Text>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	inputContainerSimple: {
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
		marginBottom: 10,
		height: 40,
		borderColor: '#D8D8D8',
		borderBottomWidth: 1,
	},
	input: {
		fontSize: 13,
		height: '100%',
		borderBottomWidth: 0,
	},
	flex: {
		flex: 1,
	},
	error: {
		color: colors.primary,
	},
});
