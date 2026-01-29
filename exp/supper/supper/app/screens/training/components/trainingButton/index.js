import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from 'configs';
import { Text } from 'atoms';

export const TrainingButton = ({ title, onPress, style, icon, ...props }) => {
	return (
		<TouchableOpacity
			testID={props.testID}
			onPress={onPress}
			style={[styles.container, style]}
			{...props}
		>
			<Image source={icon} style={{ width: 30, height: 30 }} />
			<Text variant={'P4'} numberOfLines={1} style={styles.text}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 12,
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 10,
		marginBottom: 10,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },

		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		paddingTop: 8,
		textAlign: 'center',
		color: colors.secondaryFont,
	},
});
