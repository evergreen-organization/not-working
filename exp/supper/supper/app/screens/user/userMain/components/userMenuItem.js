import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from 'configs';
import { Text, Icon } from 'atoms';

export const UserMenuItem = ({ heading, subheading, onPress, testID, headingStyle }) => {
	return (
		<TouchableOpacity testID={testID} style={styles.container} onPress={onPress}>
			<View style={styles.itemContainer}>
				<View style={styles.textContainer}>
					<Text variant={'P7'} style={[styles.heading, headingStyle]}>
						{heading}
					</Text>
					<Text variant={'P3'} style={styles.paragraph}>
						{subheading}
					</Text>
				</View>
			</View>
			<View style={styles.arrowContainer}>
				<Icon type="material" name="keyboard-arrow-right" style={styles.icon} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	itemContainer: {
		flexDirection: 'row',
	},
	textContainer: { justifyContent: 'center' },
	heading: {
		color: colors.primaryFont,
		marginBottom: 5,
	},
	paragraph: {
		color: colors.secondaryFont,
	},
	arrowContainer: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginRight: -6,
	},
	icon: {
		fontSize: 28,
		color: colors.primary,
	},
});
