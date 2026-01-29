import { colors } from 'configs';
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export const Divider = ({
	vertical = false,
	style,
}: {
	vertical?: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	if (vertical) {
		return <View style={[styles.divider_vertical, style]} />;
	}

	return <View style={[styles.divider, style]} />;
};
export default Divider;

const styles = StyleSheet.create({
	divider_vertical: {
		borderLeftWidth: 1,
		borderLeftColor: colors.border,
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
});
