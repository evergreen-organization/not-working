import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from 'configs';
import CheckIcon from 'assets/icon/check.png';

const Tick = ({ absolute = false, style }) => {
	return (
		<View style={[styles.container, { ...(absolute && { ...styles.absolute }) }, style]}>
			<Image source={CheckIcon} style={styles.icon} />
		</View>
	);
};

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
		right: -4,
		top: -4,
	},
	container: {
		backgroundColor: colors.green,
		width: 16,
		height: 16,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		position: 'absolute',
		width: 11,
		height: 11,
		tintColor: colors.white,
		zIndex: 1,
	},
});

export default Tick;
