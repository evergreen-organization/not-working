import { colors, styles as font } from 'configs';
import { isIos } from 'constant';
import React, { forwardRef } from 'react';
import { TextInput as NativeTextInput, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomTextInput } from 'react-native-custom-keyboard';

interface ITextInputProps extends React.ComponentProps<typeof NativeTextInput> {
	custom?: boolean;
	bold?: boolean;
	style?: StyleProp<ViewStyle>;
}

const TextInput = forwardRef((props: ITextInputProps, ref: any) => {
	const { custom } = props;
	const isCustom = custom && !isIos;
	const Input = isCustom ? CustomTextInput : NativeTextInput;

	return (
		<Input
			ref={ref}
			placeholderTextColor={colors.lightGrey}
			{...props}
			maxFontSizeMultiplier={1.05}
			autoCorrect={false}
			selectionColor={colors.black}
			style={[
				styles.input,
				props.style,
				{ fontFamily: props.bold ? font.fontFamilyBold : font.fontFamily },
			]}
		/>
	);
});

const styles = StyleSheet.create({
	input: {
		flex: 1,
		height: 45,
		borderBottomWidth: 1,
		borderBottomColor: colors.shadow,
		fontSize: 14,
	},
	container: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: colors.shadow,
	},
});

export default TextInput;
