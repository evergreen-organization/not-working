import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';

import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import { colors } from 'configs';
import { ECardTextInput } from 'organisms';

const { height } = Dimensions.get('window');

export const Template11 = ({ cardMessage, placeHolder }) => {
	const { mainMsg, greeting, footer } = cardMessage || {};

	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View
				style={{
					...styles.container,
					marginTop: Platform.OS === 'ios' ? height * 0.3 : height * 0.32,
				}}
			>
				<ECardTextInput
					style={{ ...styles.editableText2, color: colors.white }}
					placeholder={placeHolder.greeting}
					value={greeting}
					placeholderTextColor={colors.white}
					fontFamily="Lora-Bold"
				/>
				<ECardTextInput
					style={{
						...styles.editableText,
					}}
					placeholder={placeHolder.mainMsg}
					value={mainMsg}
					placeholderTextColor={colors.white}
					fontFamily="OleoScriptSwashCaps-Regular"
				/>
				<ECardTextInput
					style={styles.editableText2}
					placeholder={placeHolder.footer}
					value={footer}
					placeholderTextColor={'#FAEA59'}
					fontFamily="Lora-Bold"
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		flex: 1,
		backgroundColor: 'transparent',
		zIndex: 1,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	editableText: {
		fontSize: 20,
		height: 150,
		maxHeight: 300,
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
	},
	editableText2: {
		textAlign: 'center',
		alignSelf: 'center',
		height: 50,
		maxHeight: 100,
		color: '#FAEA59',
	},
});
