import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { EditableImage } from './EditableImage';

import { colors } from 'configs';
const { height, width } = Dimensions.get('window');

export const Template14 = ({ images }) => {
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<View
					style={{
						...styles.image2,
						// marginTop: Platform.OS === 'ios' ? height * 0.4 : height * 0.42,
					}}
				>
					<EditableImage image={images[1]} />
				</View>

				<View style={styles.image1}>
					<EditableImage image={images[0]} />
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: 'transparent',
		zIndex: 0,
		paddingHorizontal: 65,
		flexDirection: 'row',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	image1: {
		width: width / 3,
		aspectRatio: 0.8,
		// height: height * 0.28, //250
		// width: width * 0.5, //220
		// justifyContent: 'center',
		// transform: [{ rotate: '-5deg' }],
		borderWidth: 5,
		marginTop: height * 0.34,
		borderColor: '#E2DCC4',
	},
	image2: {
		//height: height * 0.28, //250
		width: width / 3,
		aspectRatio: 0.8,
		// width: width * 0.5, //220
		// justifyContent: 'center',
		// transform: [{ rotate: '10deg' }],
		borderWidth: 5,
		borderColor: '#E2DCC4',
		marginTop: height * 0.44,
		// alignSelf: 'flex-end',
		backgroundColor: colors.white,
	},
});
