import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import WrongIcon from 'assets/icon/close.png';
import { colors } from 'configs';

const Cross = ({ absolute = false, style }) => {
	return (
		<View style={[styles.container, { ...(absolute && { ...styles.absolute }) }, style]}>
			<Image source={WrongIcon} style={styles.icon} />
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
		backgroundColor: colors.secondaryFont,
		width: 16,
		height: 16,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		position: 'absolute',
		width: 7.5,
		height: 7.5,
		tintColor: colors.white,
		zIndex: 1,
	},
});

export default Cross;
