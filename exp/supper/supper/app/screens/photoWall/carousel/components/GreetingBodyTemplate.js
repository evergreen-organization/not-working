import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import { ECardTextInput } from 'organisms';

import { colors } from 'configs';

const { width, height } = Dimensions.get('window');

export const GreetingBodyTemplate = ({
	cardMessage,
	placeHolder,
	backgroundImage,
	greetingFontFamily = 'OleoScriptSwashCaps-Regular',
	bodyFontFamily = 'Piazzolla-ExtraBold.ttf',
	greetingTextColor = colors.white,
	bodyTextColor = colors.white,
	greetingTextStyle,
	bodyTextStyle,
}) => {
	const { mainMsg, greeting } = cardMessage || {};

	return (
		<>
			<Image source={backgroundImage} style={styles.background} />
			<View
				style={{
					...styles.container,
					marginTop: Platform.OS === 'ios' ? height * 0.6 : height * 0.55,
					...greetingTextStyle,
				}}
			>
				<ECardTextInput
					style={{ color: greetingTextColor, ...styles.editableText2 }}
					placeholder={placeHolder.greeting}
					value={greeting}
					placeholderTextColor={greetingTextColor}
					fontFamily={greetingFontFamily}
				/>
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
		fontSize: 18,
		minHeight: height * 0.3,
		maxHeight: height * 0.4,
		textAlign: 'center',
		alignSelf: 'center',
		width: width * 0.75,
		paddingTop: 0,
		paddingBottom: 0,
	},
	editableText2: {
		fontSize: 16,
		width: width * 0.65,
		height: height * 0.1,
		textAlign: 'center',
		alignSelf: 'center',
		padding: 0,
		margin: 0,
		borderWidth: 0,
	},
});
