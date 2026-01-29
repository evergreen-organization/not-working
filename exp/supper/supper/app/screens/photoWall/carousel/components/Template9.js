import React from 'react';
import { Platform, Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { EditableImage } from './EditableImage';
import TapeSticker from 'assets/festive/eCards/raya2024Sticker-tape.png';
import KetupatSticker from 'assets/festive/eCards/raya2024Sticker-ketupat.png';
import { colors } from 'configs';
import { ECardTextInput } from 'organisms';

const { height, width } = Dimensions.get('window');

export const Template9 = ({ cardMessage, images, placeHolder }) => {
	const { mainMsg } = cardMessage || {};
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<ECardTextInput
					style={{
						...styles.editableText,
						color: '#5B1D19',
						marginTop: Platform.OS === 'ios' ? height * 0.27 : height * 0.25,
						//...textStyle,
					}}
					placeholder={placeHolder.mainMsg}
					value={mainMsg}
					placeholderTextColor="#5B1D19"
					fontFamily="Farro"
				/>

				<View style={styles.border1}>
					<EditableImage image={images[0]} style={styles.image} />
				</View>

				<View style={styles.border2}>
					<EditableImage image={images[1]} style={styles.image} />
				</View>
				<Image source={TapeSticker} style={styles.tapeSticker} />
				<Image source={KetupatSticker} style={styles.ketupatSticker} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// zIndex: 0,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: colors.red,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	image1: {
		overflow: 'hidden',
		height: height * 0.43,
		width: width * 0.75,
		transform: [{ rotate: '-3deg' }],
	},
	border1: {
		width: width * 0.45,
		height: undefined,
		aspectRatio: 1,
		alignItems: 'center',
		alignSelf: 'center',
		// marginLeft: 0, //20,
		marginTop: 10,
		zIndex: 0,
		transform: [{ rotate: '-4deg' }],
		backgroundColor: colors.white,
	},
	border2: {
		width: width * 0.45,
		height: undefined,
		aspectRatio: 1,
		marginTop: -10,
		alignItems: 'center',
		alignSelf: 'center',
		right: 20,
		zIndex: 1,
		transform: [{ rotate: '5deg' }],
		backgroundColor: colors.white,
	},
	image: {
		width: width * 0.4,
		height: undefined,
		aspectRatio: 1,
		margin: 10,
	},
	tapeSticker: {
		// backgroundColor: colors.blue,
		height: 25,
		width: 75,
		// aspectRatio: 1,
		position: 'absolute',
		top: height * 0.45,
		alignSelf: 'center',
		zIndex: 99,
		// right: 5,
		// marginTop: 0,//height * 0.6,
	},
	ketupatSticker: {
		// backgroundColor: colors.blue,
		height: 200,
		width: 40,
		// aspectRatio: 0.2,
		position: 'absolute',
		top: height * 0.42 + width * 0.45 + 20,
		left: width * 0.63,
		alignSelf: 'center',
		transform: [{ rotate: '5deg' }],
		zIndex: 99,
	},
	editableText: {
		// backgroundColor: colors.babyBlueEyes,
		fontSize: 16,
		minHeight: height * 0.18,
		maxHeight: height * 0.45,
		width: width * 0.7,
		textAlign: 'center',
		textAlignVertical: 'center',
		alignSelf: 'center',
		color: '#5B1D19',
	},
});
