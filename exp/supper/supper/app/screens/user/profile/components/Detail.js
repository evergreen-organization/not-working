import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Text } from 'atoms';
import { colors } from 'configs';
import { showFestive } from 'constant';

export const Detail = ({ value, icon, testID }) => {
	return (
		<View testID={testID} style={styles.container}>
			<View style={styles.iconContainer}>
				<Image source={icon} style={styles.icon} />
			</View>
			<Text variant={'P3'} style={styles.profileDescSubTopic}>
				{value}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		marginHorizontal: 20,
		paddingVertical: 12,
	},
	profileDescSubTopic: {
		flex: 1,
		color: colors.primaryFont,
	},
	iconContainer: {
		marginRight: 12,
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: colors.primary,
	},
});
