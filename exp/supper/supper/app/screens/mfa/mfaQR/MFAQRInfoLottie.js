import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { PrimaryButton, Text } from 'atoms';

export const MFAQRInfoLottie = ({ lottie, description, onPress = () => {}, buttonTitle }) => {
	return (
		<View style={styles.container}>
			<LottieView style={styles.lottie} source={lottie} autoPlay loop />
			<Text variant={'P1'} style={styles.description}>
				{description}
			</Text>
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
		padding: 50,
		marginBottom: 80,
	},
	lottie: {
		height: 200,
		aspectRatio: 1,
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
