import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors } from 'configs';
import { Icon, Text } from 'atoms';

export const SettingsItemPressable = ({ text, icon, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.itemContainer}>
				<View style={styles.iconContainer}>
					<Image source={icon} style={styles.icon} />
				</View>
				<View style={styles.textContainer}>
					<Text variant={'P4'} style={styles.heading}>
						{text}
					</Text>
				</View>
			</View>
			<View style={styles.switchContainer}>
				<Icon type="material" name="keyboard-arrow-right" style={styles.chevronRight} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		minHeight: 60,
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	iconContainer: {
		width: 30,
		borderRadius: 10,
		justifyContent: 'center',
		marginRight: 12,
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: colors.primary,
	},
	textContainer: {
		justifyContent: 'center',
	},
	heading: {
		fontSize: 13,
		color: colors.primaryFont,
	},
	switchContainer: {
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	chevronRight: {
		fontSize: 28,
		color: colors.primary,
	},
});
