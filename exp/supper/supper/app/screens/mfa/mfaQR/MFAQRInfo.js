import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { PrimaryButton, Text } from 'atoms';

export const MFAQRInfo = ({ image, description, buttonTitle, onPress = () => {} }) => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image source={image} style={styles.image} />
				<Text variant={'P1'} style={styles.description}>
					{description}
				</Text>
			</View>
			{!!buttonTitle && (
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={onPress} title={buttonTitle} style={styles.button} />
				</View>
			)}
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
		width: 300,
		height: 300,
		alignSelf: 'center',
	},
	description: {
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
