import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import ErrorIcon from 'assets/icon/warning-red.png';
import { PrimaryButton, Text } from 'atoms';

export const MFAQRError = ({ onPress = () => {}, buttonTitle, errorMessage }) => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image source={ErrorIcon} style={styles.image} />
				<Text variant={'P1'} style={styles.error}>
					{errorMessage}
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<PrimaryButton onPress={onPress} title={buttonTitle} style={styles.button} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 80,
	},
	content: {
		padding: 50,
	},
	image: {
		width: 150,
		height: 150,
		alignSelf: 'center',
	},
	error: {
		textAlign: 'center',
		marginTop: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		flex: 1,
		marginVertical: 20,
		marginHorizontal: 40,
		paddingVertical: 12,
	},
});
