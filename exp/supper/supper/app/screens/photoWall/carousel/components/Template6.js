import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { colors } from 'configs';
import { ECardTextInput } from 'organisms';
import { EditableImage } from './EditableImage';

const { height, width } = Dimensions.get('window');

export const Template6 = ({ cardMessage, images, placeHolder }) => {
	const { mainMsg, footer } = cardMessage || {};

	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />

			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<EditableImage image={images[0]} />
				</View>
			</View>
			<View style={styles.textContainer}>
				<ECardTextInput
					style={{
						...styles.editableText,
						// top: Platform.OS === 'ios' ? height * 0.2 : height * 0.1,
					}}
					placeholderTextColor={colors.white}
					placeholder={placeHolder.mainMsg}
					value={mainMsg}
					fontFamily={'Amarante-Regular'}
				/>

				<ECardTextInput
					style={{
						...styles.editableTextFooter,
						// top: Platform.OS === 'ios' ? height * 0.2 : height * 0.1,
					}}
					placeholderTextColor={colors.white}
					placeholder={placeHolder.footer}
					value={footer}
					fontFamily={'BerkshireSwash-Regular'}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: height * 0.25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		marginTop: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	editableText: {
		fontSize: 17,
		width: width * 0.75,
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		height: height * 0.2,
	},
	editableTextFooter: {
		fontSize: 17,
		width: width * 0.75,
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		height: height * 0.1,
	},
	imageContainer: {
		height: height * 0.25, //310
		width: height * 0.35, //310
		borderRadius: 10,
		overflow: 'hidden',
	},
});
