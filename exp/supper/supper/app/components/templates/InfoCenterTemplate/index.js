import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { PrimaryButton, Text } from 'atoms';
import { colors } from 'configs';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from 'styles';

export const InfoCenterTemplate = ({
	lottie,
	onLeftPress,
	onRightPress,
	icon,
	description,
	title,
	leftButtonTitle,
	rightButtonTitle,
}) => {
	return (
		<SafeAreaView style={[commonStyles.fill]}>
			<View style={styles.contentContainer}>
				{!!icon && <Image source={icon} style={styles.icon} />}
				{!!lottie && <LottieView source={lottie} autoPlay loop style={styles.lottie} />}
				<Text variant={'H3'} style={styles.title}>
					{title}
				</Text>
				<Text variant={'P3'} style={styles.description}>
					{description}
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				{!!leftButtonTitle && (
					<PrimaryButton
						style={styles.button}
						buttonStyle={[styles.leftButton]}
						title={leftButtonTitle}
						onPress={onLeftPress}
						shadowColor={colors.secondary}
					/>
				)}
				{!!rightButtonTitle && (
					<PrimaryButton
						style={styles.button}
						buttonStyle={[styles.rightButton]}
						title={rightButtonTitle}
						onPress={onRightPress}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	icon: {
		width: 100,
		height: 100,
	},
	button: {
		marginHorizontal: 12,
	},
	leftButton: {
		backgroundColor: colors.secondary,
	},
	buttonLabel: {
		textAlign: 'center',
		color: colors.white,
	},
	rightButton: {
		backgroundColor: colors.primary,
	},
	lottie: {
		width: 150,
		height: 150,
	},
	title: {
		margin: 12,
		textAlign: 'center',
	},
	description: {
		textAlign: 'center',
		marginTop: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
});
