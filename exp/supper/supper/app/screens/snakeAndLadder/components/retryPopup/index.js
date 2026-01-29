import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import retryPopupBg from '../../assets/retry/bg-retry.png';
import btnYes from '../../assets/retry/btn-yes.png';
import btnNo from '../../assets/retry/btn-no.png';

export const RetryPopup = ({ onYes, onNo }) => {
	return (
		<View style={styles.overlay}>
			<View style={styles.popupContainer}>
				<ImageBackground source={retryPopupBg} style={styles.popupBackground} resizeMode="contain">
					<View style={styles.buttonRow}>
						<TouchableOpacity onPress={onNo}>
							<Image source={btnNo} style={styles.buttonImage} resizeMode="contain" />
						</TouchableOpacity>
						<TouchableOpacity onPress={onYes}>
							<Image source={btnYes} style={styles.buttonImage} resizeMode="contain" />
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</View>
	);
};

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
