import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { EditableImage } from './EditableImage';
import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { getCircleSize, getLeftShift, getTopShift } from '../../utils';

export const CircleTemplate = ({ images }) => {
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<View style={styles.circle1}>
					<EditableImage image={images[0]} />
				</View>
				<View style={styles.circle2}>
					<EditableImage image={images[1]} />
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 100,
		flex: 0.5,
		zIndex: 1,
		alignItems: 'center',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	circle1: {
		position: 'absolute',
		overflow: 'hidden',
		alignSelf: 'flex-end',
		borderColor: '#E7B872',
		borderRadius: 160,
		borderWidth: 3,
		zIndex: 2,
		width: getCircleSize(230),
		height: getCircleSize(230),
		left: getLeftShift(180),
		top: getTopShift(80),
	},
	circle2: {
		position: 'absolute',
		overflow: 'hidden',
		alignSelf: 'flex-end',
		borderColor: '#E7B872',
		borderRadius: 160,
		borderWidth: 3,
		zIndex: 2,
		width: getCircleSize(230),
		height: getCircleSize(230),
		left: getLeftShift(-30),
		top: getTopShift(190),
	},
});
