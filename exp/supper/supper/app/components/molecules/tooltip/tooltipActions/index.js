import React from 'react';
import { StyleSheet, View } from 'react-native';

export const TooltipActions = ({ children }) => {
	return <View style={styles.tooltipContainer}>{children}</View>;
};

const styles = StyleSheet.create({
	tooltipContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
});
