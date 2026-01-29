import React from 'react';
import { Platform, Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { colors } from 'configs';
import { ECardTextInput } from 'organisms';

import { EditableImage } from './EditableImage';
const { width, height } = Dimensions.get('window');

export const Template7 = ({ cardMessage, images, placeHolder }) => {
	const { mainMsg, greeting } = cardMessage || {};
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={styles.container}>
				<View style={styles.imageBg}>
					<View style={styles.image1}>
						<EditableImage image={images[0]} />
					</View>
				</View>
				<View style={styles.viewForText}>
					<ECardTextInput
						style={{
							//height: Platform.OS === 'ios' ? height * 0.1 : height * 0.05,
							...styles.editableTextGreeting,
						}}
						placeholderTextColor={colors.white}
						placeholder={placeHolder.greeting}
						value={greeting}
						fontFamily="BerkshireSwash-Regular"
					/>
					<ECardTextInput
						style={styles.editableText}
						placeholderTextColor={colors.white}
						placeholder={placeHolder.mainMsg}
						value={mainMsg}
						fontFamily="Lora-Bold"
					/>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		flex: 1,
		zIndex: 0,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	viewForText: {
		width: width,
		position: 'absolute',
		top: Platform.OS === 'ios' ? height * 0.4 : height * 0.35,
	},
	editableText: {
		fontSize: 16,
		minHeight: height * 0.2, //150
		maxHeight: height * 0.3, //300
		width: width * 0.7, //300
		textAlign: 'center',
		textAlignVertical: 'center',
		alignSelf: 'center',
		color: colors.white,
		marginTop: 0,
		marginBottom: 0,
	},
	editableTextGreeting: {
		fontSize: 16,
		minHeight: height * 0.01,
		maxHeight: height * 0.35,
		width: width * 0.7, //300
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		marginTop: height * 0.15,
	},
	border: {
		width: width * 0.6, //220
		height: undefined,
		aspectRatio: 0.8,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: height * 0.1,
	},
	image1: {
		overflow: 'hidden',
		width: width * 0.5, //220
		height: undefined,
		aspectRatio: 1,
		alignSelf: 'center',
		marginTop: 4.9,
		// marginTop: height * 0.1,
		borderTopLeftRadius: 150,
		borderTopRightRadius: 150,
	},
	imageBg: {
		overflow: 'hidden',
		width: width * 0.53,
		height: undefined,
		aspectRatio: 1,
		alignSelf: 'center',
		backgroundColor: '#DBA746',
		marginTop: height * 0.25,
		borderTopLeftRadius: 150,
		borderTopRightRadius: 150,
	},
});
