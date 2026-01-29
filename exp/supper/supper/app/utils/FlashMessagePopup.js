import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import configStyles from '../configs/styles';
import { colors } from 'configs';

export const FlashMessagePopup = () => {
	return (
		<FlashMessage
			style={styles.container}
			titleStyle={styles.titleStyles}
			textStyle={styles.textStyle}
			duration={6000}
			position="top"
			floating
			statusBarHeight={StatusBar?.currentHeight}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	titleStyles: {
		fontFamily: configStyles.fontFamilyBold,
		fontSize: 12,
		color: colors.primaryFont,
		marginBottom: 3,
	},
	textStyle: {
		fontFamily: configStyles.fontFamily,
		fontSize: 12,
		color: colors.primaryFont,
	},
});
