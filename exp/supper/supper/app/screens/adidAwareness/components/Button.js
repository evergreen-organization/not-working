import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'configs';
import { Text } from 'atoms';

export const Button = ({
	title,
	leftIcon,
	rightIcon,
	onPress,
	style,
	iconStyle,
	titleStyle,
	testID,
}) => {
	return (
		<TouchableOpacity testID={testID} onPress={onPress} style={[styles.container, style]}>
			{leftIcon && <Image source={leftIcon} style={[styles.icon, iconStyle]} />}
			<Text variant={'P7'} style={[styles.title, titleStyle]}>
				{title}
			</Text>
			{rightIcon && <Image source={rightIcon} style={[styles.icon, iconStyle]} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		flexDirection: 'row',
		alignSelf: 'center',
		marginBottom: 20,
	},
	icon: {
		width: 20,
		height: 20,
		tintColor: colors.white,
		flex: 1,
	},
	title: {
		fontSize: 14,
		color: colors.white,
		textAlign: 'left',
		flex: 20,
		marginLeft: 8,
	},
});
