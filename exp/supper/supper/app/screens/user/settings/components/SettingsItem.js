import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { colors } from 'configs';
import { Tag, Text, Toggle } from 'atoms';

export const SettingsItem = ({ text, icon, value, onValueChange, showSwitch = true }) => {
	return (
		<View style={styles.container}>
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
				{showSwitch ? (
					<Toggle variant={'switch'} value={value} onValueChange={onValueChange} />
				) : (
					<Tag
						title={value ? 'Active' : 'Inactive'}
						colorScheme={value ? 'success' : 'error'}
						fontStyle={{ fontSize: 14 }}
						style={{ marginRight: 0 }}
					/>
				)}
			</View>
		</View>
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
});
