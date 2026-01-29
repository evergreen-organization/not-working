import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from 'configs';

export const BottomView = ({ children, style, isGap = true }) => {
	const insets = useSafeAreaInsets();
	const gap = insets.bottom;

	return (
		<View style={[styles.container, style]}>
			{children}
			{isGap && <View style={{ height: gap }} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderTopWidth: 0.33,
		borderTopColor: '#D8D8D8',
		zIndex: 1,
	},
});

export default BottomView;
