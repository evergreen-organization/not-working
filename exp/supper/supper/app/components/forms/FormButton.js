import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFormikContext } from 'formik';
import { colors } from 'configs';
import { PrimaryButton, Text } from 'atoms';

export const FormButton = ({
	title,
	loading = false,
	style,
	buttonStyle,
	condition,
	testID,
	color,
}) => {
	const { handleSubmit, values } = useFormikContext();

	useEffect(() => {
		condition(values);
	}, [values]);

	return (
		<View style={style}>
			<PrimaryButton
				fill={false}
				testID={testID}
				onPress={handleSubmit}
				disabled={loading}
				buttonStyle={[
					{ ...(loading && { backgroundColor: colors.shadow }) },
					{ backgroundColor: color },
					buttonStyle,
				]}
				shadowColor={color}
				style={[styles.buttonView]}
			>
				<Text bold style={[styles.buttonLabel, buttonStyle]}>
					{title}
				</Text>
				{loading && <ActivityIndicator size={10} color={colors.white} style={{ marginLeft: 10 }} />}
			</PrimaryButton>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonView: {
		alignSelf: 'center',
		borderRadius: 10,
		marginTop: 8,
		flexDirection: 'row',
	},
	buttonLabel: {
		fontSize: 13,
		color: colors.white,
		textAlign: 'center',
	},
});
