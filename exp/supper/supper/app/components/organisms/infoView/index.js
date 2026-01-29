import { Image, StyleSheet, View } from 'react-native';
import { PrimaryButton, Text } from 'atoms';
import React from 'react';
import { colors } from 'configs';

export const InfoView = ({
	onLeftPress,
	onRightPress,
	icon,
	description,
	title,
	leftButtonTitle,
	rightButtonTitle,
}) => {
	return (
		<>
			<View style={styles.container}>
				<Image source={icon} style={styles.icon} />
				<Text variant={'H3'} style={{ margin: 20 }}>
					{title}
				</Text>
				<Text variant={'P3'} style={{ textAlign: 'center' }}>
					{description}
				</Text>
			</View>
			<View style={styles.buttonWrapper}>
				{!!leftButtonTitle && (
					<PrimaryButton
						style={[styles.button]}
						buttonStyle={styles.leftButton}
						onPress={onLeftPress}
						title={leftButtonTitle}
						shadowColor={colors.secondary}
					/>
				)}
				{!!rightButtonTitle && (
					<PrimaryButton
						style={[styles.button]}
						buttonStyle={styles.rightButton}
						onPress={onRightPress}
						title={rightButtonTitle}
					/>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
	},
	icon: {
		width: 100,
		height: 100,
	},
	button: {
		marginTop: 40,
	},
	leftButton: {
		backgroundColor: colors.secondary,
	},
	buttonLabel: {
		flex: 1,
		textAlign: 'center',
		color: colors.white,
	},
	leftButtonLabel: {
		flex: 1,
		textAlign: 'center',
		color: colors.white,
	},
	rightButton: {
		backgroundColor: colors.primary,
	},
	buttonWrapper: {
		flexDirection: 'row',
		gap: 20,
		marginHorizontal: 15,
	},
});
