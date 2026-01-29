import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';
import { colors } from 'configs';
import { FormButtonBottomType } from './forms.type';
import { Text } from 'atoms';
import { ButtonBottom } from 'molecules';

export const FormButtonBottom = ({
	title,
	loading = false,
	style,
	buttonStyle,
	testID,
}: FormButtonBottomType) => {
	const { handleSubmit } = useFormikContext();

	return (
		<View style={style}>
			<ButtonBottom testID={testID} onPress={handleSubmit} disabled={loading} style={buttonStyle}>
				<Text bold style={styles.buttonLabel}>
					{title}
				</Text>
			</ButtonBottom>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonLabel: { fontSize: 15, color: colors.white, textAlign: 'center' },
});

export default FormButtonBottom;
