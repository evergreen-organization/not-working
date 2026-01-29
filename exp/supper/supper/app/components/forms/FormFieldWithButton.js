import React from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, TextHelper } from 'atoms';
import { colors } from 'configs';

export const FormFieldWithButton = ({
	prefix,
	label = null,
	name,
	maxLength = 255,
	showCounter = false,
	loading,
	style,
	numeric = false,
	allowClear,
	error,
	disabled = false,
	mandatory = false,
	handleSelect,
	buttonTitle,
	formikContext,
	...otherProps
}) => {
	const { setFieldTouched, setFieldValue, values, touched, errors, setStatus } =
		useFormikContext() ?? formikContext;

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				{label && (
					<Text bold style={{ fontSize: 14 }}>
						{label}
					</Text>
				)}
				{mandatory && (
					<Text bold style={styles.mandatoryText}>
						*
					</Text>
				)}
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={styles.inputContainer}>
					<TextInput
						testID={`${otherProps.testID}-text-input`}
						style={styles.input}
						onFocus={() => {
							setFieldTouched(name, true);
							setStatus(name);
						}}
						onBlur={() => setFieldTouched(name, false)}
						onChangeText={(text) => setFieldValue(name, text)}
						defaultValue={values[name]}
						maxLength={maxLength}
					/>
				</View>
				<TouchableOpacity
					testID={`${otherProps.testID}-button`}
					disabled={!!errors[name]}
					onPress={(event) => handleSelect(values[name], event)}
					style={[{ backgroundColor: loading ? colors.shadow : colors.primary }, styles.button]}
				>
					<Text bold style={{ color: colors.white }}>
						{buttonTitle}
					</Text>
					{loading && (
						<ActivityIndicator size={10} color={colors.white} style={{ marginLeft: 10 }} />
					)}
				</TouchableOpacity>
			</View>
			{touched[name] && (
				<TextHelper
					isValid={!errors[name]}
					errorMsg={errors[name]}
					length={values[name]?.length}
					maxLength={maxLength}
					showCount={!!touched[name] && showCounter}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		justifyContent: 'center',
	},
	inputContainer: {
		backgroundColor: colors.background,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
		flex: 3,
	},
	prefixContainer: {
		zIndex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		height: 30,
		width: 30,
		marginLeft: 10,
	},
	prefix: {
		marginLeft: -40,
		paddingLeft: 40,
		paddingHorizontal: 10,
		paddingVertical: 12,
		width: '100%',
	},
	input: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingVertical: 12,
		color: colors.primaryFont,
	},
	button: {
		padding: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 5,
	},
	mandatoryText: {
		color: colors.red,
		marginLeft: 5,
	},
	row: { flexDirection: 'row' },
});
