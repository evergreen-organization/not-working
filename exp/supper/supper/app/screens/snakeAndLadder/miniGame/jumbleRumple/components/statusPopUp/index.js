import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { JUMBLE_ENDGAME } from '../../config';

const { width, height } = Dimensions.get('screen');

export const StatusPopup = ({ isVisible, status, onPress }) => {
	const [show, setShow] = useState(false);
	const imageSource = JUMBLE_ENDGAME[status]?.image;

	useEffect(() => {
		if (isVisible && imageSource) {
			setShow(true);

			const timer = setTimeout(() => {
				setShow(false);
				onPress?.();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [isVisible, imageSource, onPress]);

	if (!show || !imageSource) {
		return null;
	}

	return (
		<View style={styles.overlay}>
			<Animatable.Image
				animation="zoomIn"
				duration={500}
				source={imageSource}
				style={styles.popupImage}
				resizeMode="stretch"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		height,
		width,
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
	popupImage: {
		width: width,
		height: height,
	},
});
