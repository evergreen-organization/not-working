import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { EditableImage } from './EditableImage';

const { height, width } = Dimensions.get('window');

export const Template16 = ({ images }) => {
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<View style={styles.border1}>
					<EditableImage image={images[0]} style={styles.image1} />
				</View>

				<View style={styles.border2}>
					<EditableImage image={images[1]} style={styles.image} />
				</View>
				{/* <Image source={CloudSticker} style={styles.cloudSticker} />
                <Image source={LanternSticker} style={styles.lanternSticker} /> */}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 0,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	image1: {
		height: height * 0.2,
		width: width * 0.6,
		padding: 5,
		backgroundColor: '#FFE9B5',
		// overflow: 'hidden',
		// height: height * 0.43,
		// width: width * 0.75,
		// transform: [{ rotate: '-3deg' }],
	},
	border1: {
		height: height * 0.2,
		width: width * 0.6,
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginLeft: 30, //20,
		marginTop: height * 0.13,
		zIndex: 80,
		transform: [{ rotate: '-3.38deg' }],
		backgroundColor: '#FFE9B5',
	},
	border2: {
		height: height * 0.2,
		width: width * 0.6,
		bottom: 30,
		alignItems: 'center',
		alignSelf: 'flex-end',
		right: 20,
		backgroundColor: '#FFE9B5',
		transform: [{ rotate: '4.13deg' }],
	},
	image: {
		height: height * 0.2,
		width: width * 0.6,
		padding: 5,
		backgroundColor: '#FFE9B5',
		// height: height * 0.25,
		// width: width * 0.55,
		// marginBottom: 20,
		// marginTop: 10,
	},
	// cloudSticker: {
	// 	height: undefined,
	// 	width: 150,
	// 	aspectRatio: 2.5,
	// 	position: 'absolute',
	// 	zIndex: 99,
	// 	right: 5,
	// 	top: height * 0.6,
	// },
	// lanternSticker: {
	// 	height: 150,
	// 	width: undefined,
	// 	aspectRatio: 0.4,
	// 	position: 'absolute',
	// 	top: height * 0.62,
	// 	zIndex: 80,
	// 	right: 10,
	// },
});
