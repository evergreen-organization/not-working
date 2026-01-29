import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { colors } from 'configs';
import { EditableImage } from './EditableImage';
const { height, width } = Dimensions.get('window');

export const Template17 = ({ images }) => {
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<View
					style={{
						...styles.image1,
						// marginTop: Platform.OS === 'ios' ? height * 0.4 : height * 0.42,
					}}
				>
					<EditableImage image={images[0]} />
				</View>
				<View style={styles.image2}>
					<EditableImage image={images[1]} />
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
		paddingHorizontal: 30,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	image1: {
		height: height * 0.28, //250
		width: width * 0.5, //220
		justifyContent: 'center',
		// transform: [{ rotate: '-5deg' }],
		borderWidth: 10,
		borderColor: colors.white,
		marginTop: height * 0.2,
	},
	image2: {
		height: height * 0.28, //250
		width: width * 0.5, //220
		justifyContent: 'center',
		// transform: [{ rotate: '10deg' }],
		borderWidth: 10,
		borderColor: colors.white, //'#D6544E',
		// marginTop: -100,
		// alignSelf: 'flex-end',
	},
});
