import { Text } from 'atoms';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SectionHeader = ({ title, subtitle, style }) => {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.subheading}>{subtitle}</Text>
			<Text bold style={styles.heading}>
				{title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
	},
	heading: {
		marginTop: 3,
		fontSize: 20,
	},
	subheading: {
		fontSize: 16,
	},
});

export default SectionHeader;
