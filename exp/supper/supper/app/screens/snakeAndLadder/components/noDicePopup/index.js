import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import noDiceBg from '../../assets/retry/bg-no-dice.png';
import btnClose from '../../assets/retry/btn-close.png';

export const NoDicePopup = ({ onCancel }) => (
	<View style={styles.overlay}>
		<View style={styles.popupContainer2}>
			<ImageBackground source={noDiceBg} style={styles.popupBackground} resizeMode="contain">
				<TouchableOpacity onPress={onCancel} style={styles.closeButton}>
					<Image source={btnClose} style={styles.closeIcon} />
				</TouchableOpacity>
			</ImageBackground>
		</View>
	</View>
);

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	popupContainer: {
		width: 400,
		height: 600,
	},
	popupContainer2: {
		width: 350,
		height: 600,
	},
	popupBackground: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 50,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 30,
	},
	buttonImage: {
		width: 100,
		height: 100,
	},

	closeButton: {
		position: 'absolute',
		top: 170,
		right: 10,
	},
	closeIcon: {
		width: 50,
		height: 50,
	},
});
