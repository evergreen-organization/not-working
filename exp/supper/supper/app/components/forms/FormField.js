import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors } from 'configs';
import { Icon, Text, TextHelper } from 'atoms';
import { TextInput } from 'organisms';

export const FormField = ({
	prefix,
	label = null,
	name,
	maxLength = 255,
	showCounter = false,
	loading,
	style,
	numeric = false,
	allowClear,
	error = '',
	disabled = false,
	bold = true,
	onFocus = () => {},
	...otherProps
}) => {
	const { setFieldTouched, setFieldValue, setFieldError, values, touched, errors, setStatus } =
		useFormikContext();

	useEffect(() => {
		setFieldError(name, error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	const makePositive = () => {
		const value = parseFloat(values[name]);
		if (value > 0) {
			return;
		}
		const inverted = value * -1;
		setFieldValue(name, inverted.toString());
	};

	const makeNegative = () => {
		const value = parseFloat(values[name]);
		if (value < 0) {
			return;
		}
		const inverted = value * -1;
		setFieldValue(name, inverted.toString());
	};

	const clearValue = () => {
		setFieldValue(name, '');
	};

	return (
		<View style={styles.container}>
			{label && (
				<Text bold style={{ fontSize: 14, marginHorizontal: 5 }}>
					{label}
				</Text>
			)}
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				{prefix && (
					<View style={styles.prefixContainer}>
						<Text style={{ fontSize: 13 }}>{prefix}</Text>
					</View>
				)}
				<TextInput
					name={name}
					bold={bold}
					onFocus={(event) => {
						onFocus(event);
						setFieldTouched(name, true);
						setStatus(name);
					}}
					editable={!disabled}
					onBlur={() => setFieldTouched(name, false)}
					onChangeText={(text) => setFieldValue(name, text)}
					value={values[name]}
					maxLength={maxLength}
					style={[style, prefix ? styles.prefix : '']}
					{...otherProps}
				/>
				{allowClear && values[name] !== '' && (
					<View style={{ marginLeft: -22 }}>
						<TouchableOpacity onPress={clearValue}>
							<View
								style={{
									width: 22,
									height: 22,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Icon
									type={'ionicon'}
									name="md-close"
									style={{ fontSize: 18, color: colors.medium }}
								/>
							</View>
						</TouchableOpacity>
					</View>
				)}
				{numeric && (
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={makePositive}>
							<View style={styles.addButton}>
								<Icon type={'entypo'} name="plus" style={{ fontSize: 14, color: colors.black }} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={makeNegative}>
							<View style={styles.minusButton}>
								<Icon type={'entypo'} name="minus" style={{ fontSize: 14, color: colors.black }} />
							</View>
						</TouchableOpacity>
					</View>
				)}
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

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	prefixContainer: {
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		width: 30,
		backgroundColor: colors.background,
		borderRadius: 5,
	},
	prefix: {
		marginLeft: -30,
		paddingLeft: 40,
	},
	buttonContainer: {
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
		borderRadius: 10,
		flexDirection: 'row',
		marginLeft: 5,
	},
	addButton: {
		backgroundColor: colors.background,
		borderColor: colors.lightGrey,
		borderWidth: 1,
		padding: 8,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},
	minusButton: {
		backgroundColor: colors.background,
		borderColor: colors.lightGrey,
		borderWidth: 1,
		borderLeftWidth: 0,
		padding: 8,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	crossIcon: { fontSize: 18, color: colors.medium },
});

export default FormField;
