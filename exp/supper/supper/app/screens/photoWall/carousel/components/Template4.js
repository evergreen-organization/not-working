import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import Border from 'assets/festive/eCards/ecard-border-8-1.png';
import { colors } from 'configs';
import { ECardTextInput } from 'organisms';

import { EditableImage } from './EditableImage';

const { height } = Dimensions.get('window');

export const Template4 = ({ images, cardMessage, placeHolder }) => {
	const { mainMsg, footer } = cardMessage || {};

	return (
		<ImageBackground source={PhotoWallBg} style={styles.background}>
			<ImageBackground source={Border} style={styles.border}>
				<View style={styles.image1}>
					<EditableImage image={images[0]} />
				</View>
			</ImageBackground>

			<ECardTextInput
				style={styles.editableText2}
				placeholder={placeHolder.mainMsg}
				placeholderTextColor={colors.white}
				value={mainMsg}
				fontFamily="Dhurjati"
			/>
			<ECardTextInput
				style={styles.editableText3}
				placeholder={placeHolder.footer}
				placeholderTextColor={'#FFE500'}
				value={footer}
				fontFamily="OleoScript-Regular"
			/>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		resizeMode: 'stretch',
	},
	editableText2: {
		fontSize: 18,
		height: height * 0.25,
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		marginTop: height * 0.25,
	},
	editableText3: {
		fontSize: 15,
		height: 80,
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
	},
	border: {
		height: 300,
		width: 200,
		resizeMode: 'contain',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		top: height * 0.25,
	},
	image1: {
		overflow: 'hidden',
		height: 250,
		width: 180,
		alignSelf: 'center',
		borderWidth: 5,
		borderColor: '#9DD051',
	},
});
