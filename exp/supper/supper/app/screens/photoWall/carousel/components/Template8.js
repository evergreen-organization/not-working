import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { colors } from 'configs';
import { ECardTextInput } from 'organisms';
import { EditableImage } from './EditableImage';
import RayaSticker from 'assets/festive/eCards/rayakansebulan.png';

const { height, width } = Dimensions.get('window');

export const Template8 = ({ cardMessage, images, placeHolder }) => {
	const { mainMsg } = cardMessage || {};

	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<ECardTextInput
					style={styles.editableText2}
					placeholderTextColor="#0026AD"
					placeholder={placeHolder.mainMsg}
					value={mainMsg}
					fontFamily="IbarraRealNova-Bold"
				/>
				<View style={styles.border1}>
					<EditableImage image={images[0]} style={styles.image} />
				</View>
				<View style={styles.imageWithSticker}>
					<View style={styles.border2}>
						<EditableImage image={images[1]} style={styles.imageTwo} />
					</View>
					<Image source={RayaSticker} style={styles.rayaSticker} />
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 0,
		alignItems: 'center',
		justifyContent: 'center',
		top: height * 0.25,
		// backgroundColor: colors.babyBlueEyes,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	border: {
		height: height * 0.28, //233.43
		width: width * 0.58, //237.61
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		transform: [{ rotate: '-6.23deg' }],
	},
	image1: {
		overflow: 'hidden',
		height: height * 0.225, //190.2
		width: width * 0.55, //225.94
		marginBottom: 5,
		marginTop: 5,
		alignSelf: 'center',
	},
	editableText2: {
		textAlign: 'center',
		alignSelf: 'center',
		height: height * 0.15,
		width: width * 0.7,
		color: '#004AAD',
		fontSize: 16,
	},
	border1: {
		width: width * 0.5,
		height: undefined,
		aspectRatio: 1,
		marginTop: 50,
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginLeft: 20,
		transform: [{ rotate: '-3.3deg' }],
		backgroundColor: '#EFE1DE',
		borderWidth: 0,
	},
	imageWithSticker: {
		alignItems: 'center',
		alignSelf: 'flex-end',
	},
	border2: {
		width: width * 0.5,
		height: undefined,
		aspectRatio: 1,
		alignItems: 'center',
		alignSelf: 'flex-end',
		marginTop: -150,
		marginRight: 20,
		transform: [{ rotate: '6deg' }],
		backgroundColor: '#EFE1DE',
		// borderStyle: 'dashed',
		borderWidth: 0,
	},
	imageTwo: {
		width: width * 0.4,
		height: undefined,
		aspectRatio: 1,
		padding: 5,
		backgroundColor: colors.white,
		// marginBottom: 30,
		// marginTop: 10,
	},
	image: {
		width: width * 0.4,
		height: undefined,
		aspectRatio: 1,
		padding: 5,
		backgroundColor: colors.white,
		zIndex: 2,
		// marginLeft: 10,
		// marginRight: 10,
		// marginBottom: 30,
		// marginTop: 10,
	},
	rayaSticker: {
		zIndex: 999,
		// backgroundColor: colors.green,
		width: width * 0.3,
		height: undefined,
		aspectRatio: 2.5,
		marginTop: -(width * 0.5) / 2.5,
		transform: [{ rotate: '4deg' }],
		alignSelf: 'flex-start',
		// marginLeft: 60,
		resizeMode: 'stretch',
		// flex: 3,
		// aspectRatio: 2.5,
		// position: 'absolute',
		right: (width * 0.5) / 2,
		// top: height * 0.6,
	},
});
