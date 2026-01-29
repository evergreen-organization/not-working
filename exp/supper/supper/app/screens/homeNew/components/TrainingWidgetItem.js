import { Text } from 'atoms';
import React from 'react';

import { StyleSheet, View } from 'react-native';

export const TrainingWidgetItem = ({ label, value }) => {
	return (
		<View style={styles.box}>
			<Text numberOfLines={1} style={styles.label}>
				{label}
			</Text>
			<Text bold fontSize={16} style={styles.value}>
				{value}
			</Text>
			<Text style={styles.desc}>{value > 1 ? 'days' : 'day'}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 8,
	},
	label: {
		textAlign: 'center',
		letterSpacing: -0.6,
		fontSize: 11,
		marginBottom: 5,
	},
	desc: {
		fontSize: 11,
	},
	value: { paddingBottom: 2 },
});

export default TrainingWidgetItem;
