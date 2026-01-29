import React, { forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors } from 'configs';

export const ECardTextInput = forwardRef((props, ref) => {
	return (
		<TextInput
			ref={ref}
			{...props}
			autoCorrect={false}
			editable={false}
			maxFontSizeMultiplier={1.15}
			selectionColor={colors.black}
			placeholderTextColor={props.placeholderTextColor ?? colors.white}
			multiline={true}
			style={[styles.input, props.style, { fontFamily: props.fontFamily }]}
		/>
	);
});

const styles = StyleSheet.create({
	input: {
		zIndex: 1,
		height: 85,
		width: '80%',
		padding: 0,
		margin: 0,
		borderWidth: 0,
	},
});
