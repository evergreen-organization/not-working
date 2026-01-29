import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';

import { colors } from 'configs';
import { ECardTextInput } from 'organisms';

const { width, height } = Dimensions.get('window');

export const BodyFooterTemplate = ({
	cardMessage,
	placeHolder,
	backgroundImage,
	bodyTextColor = colors.white,
	footerTextColor = colors.white,
	footerTextStyle,
	bodyTextStyle,
	bodyFontFamily = 'OleoScript-Bold',
	footerFontFamily = 'Wandertucker',
}) => {
	const { mainMsg, footer } = cardMessage || {};

	return (
		<>
			<Image source={backgroundImage} style={styles.background} />
			<View
				style={{
					...styles.container,
					marginTop: Platform.OS === 'ios' ? height * 0.57 : height * 0.52,
				}}
			>
				<ECardTextInput
					style={{
						color: bodyTextColor,
						...styles.editableText,
						...bodyTextStyle,
					}}
					placeholder={placeHolder.mainMsg}
					value={mainMsg}
					placeholderTextColor={bodyTextColor}
					fontFamily={bodyFontFamily}
				/>
				<ECardTextInput
					style={{
						color: footerTextColor,
						...styles.editableText2,
						...footerTextStyle,
					}}
					placeholder={placeHolder.footer}
					value={footer}
					placeholderTextColor={footerTextColor}
					fontFamily={footerFontFamily}
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
		marginTop: height * 0.55,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	editableText: {
		fontSize: 18,
		minHeight: height * 0.27,
		maxHeight: height * 0.55,
		width: width * 0.7, //300
		textAlign: 'center',
		alignSelf: 'center',
	},
	editableText2: {
		fontSize: 18,
		minHeight: height * 0.1,
		maxHeight: height * 0.25,
		width: width * 0.7, //300
		textAlign: 'center',
		alignSelf: 'center',
		bottom: height * 0.01,
	},
});
