import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { getCircleSize } from '../../utils';
import { EditableImage } from './EditableImage';

const { height, width } = Dimensions.get('window');

export const Template15 = ({ images }) => {
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<View style={styles.border1}>
					<EditableImage image={images[0]} />
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		zIndex: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	border1: {
		overflow: 'hidden',
		position: 'absolute',
		borderRadius: 180,
		width: getCircleSize(180),
		height: getCircleSize(180),
		marginTop: height * 0.35,
		//top: getTopShift(330),
	},
});
