import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

export interface AvatarTextProps {
	size: number;
	rounded?: boolean;
	title: string;
	style?: StyleProp<any>;
	textStyle?: TextStyle;
}
export const AvatarText = (props: AvatarTextProps) => {
	const { size, rounded, title, style, textStyle } = props;

	const borderRadius = size / 2;

	return (
		<View
			style={StyleSheet.flatten([
				$title,
				{
					width: size,
					height: size,
					...(rounded && { borderRadius: borderRadius }),
				},
				style,
			])}
		>
			<Text
				maxFontSizeMultiplier={1}
				minimumFontScale={1}
				style={{
					color: '#FFF',
					fontSize: size / 2,
					...textStyle,
				}}
				numberOfLines={1}
			>
				{title}
			</Text>
		</View>
	);
};

const $title: TextStyle = {
	backgroundColor: 'lightgray',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 5,
};
