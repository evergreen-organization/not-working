import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from 'configs';
import { BaseModal } from 'molecules';

const windowHeight = Dimensions.get('window').height * 0.2;

export const PopUp = ({
	isVisible,
	setVisible = () => {},
	children,
	disableBackdropPress = true,
	style,
	containerStyle = {},
}) => {
	const onDismiss = () => {
		if (!disableBackdropPress) {
			setVisible(false);
		}
	};

	return (
		<BaseModal visible={isVisible} onBackdropPress={onDismiss} style={style}>
			<View style={[styles.popupContent, containerStyle]}>{children}</View>
		</BaseModal>
	);
};

const styles = StyleSheet.create({
	popupContent: {
		minHeight: windowHeight,
		backgroundColor: colors.white,
		borderRadius: 12,
		paddingHorizontal: 24,
		paddingBottom: 24,
		marginHorizontal: 24,
		gap: 30,
	},
});
