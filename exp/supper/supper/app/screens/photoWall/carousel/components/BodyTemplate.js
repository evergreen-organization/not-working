import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';

import { colors } from 'configs';
import { ECardTextInput } from 'organisms';

const { width, height } = Dimensions.get('window');

export const BodyTemplate = ({
	cardMessage,
	placeHolder,
	backgroundImage,
	bodyTextColor = colors.white,
	textStyle,
	bodyFontFamily = 'ChelaOne-Regular',
}) => {
	const { mainMsg } = cardMessage || {};

	return (
		<>
			<Image source={backgroundImage} style={styles.background} />
			<View style={styles.container}>
				<ECardTextInput
					style={{
						...styles.editableText,
						color: bodyTextColor,
						marginTop: Platform.OS === 'ios' ? height * 0.3 : height * 0.15,
						...textStyle,
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
		minHeight: height * 0.45,
		maxHeight: height * 0.45,
		width: width * 0.6,
		textAlign: 'center',
		textAlignVertical: 'center',
		alignSelf: 'center',
		color: colors.white,
	},
});
