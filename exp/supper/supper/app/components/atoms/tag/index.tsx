import React from 'react';
import { tagColors } from 'configs';
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, View } from 'react-native';
import { Text } from '../text';
import { styles } from './styles';

const colorSchemes = {
	default: tagColors.grey,
	error: tagColors.red,
	success: tagColors.green,
	warning: tagColors.yellow,
};

type ColorSchemeType = keyof typeof colorSchemes;

export interface TagProps {
	preset?: 'light' | 'dark';
	colorScheme?: ColorSchemeType;
	title: string;
	style?: StyleProp<ViewStyle>;
	fontStyle?: StyleProp<TextStyle>;
	touchableStyle?: StyleProp<ViewStyle>;
	onPress?(): void;
	bold?: boolean;
}
export const Tag = (props: TagProps) => {
	const {
		preset = 'light',
		colorScheme = 'default',
		title,
		style,
		fontStyle,
		touchableStyle,
		onPress,
		bold = true,
	} = props;

	if (preset === 'dark') {
		return (
			<TouchableOpacity style={touchableStyle} disabled={!onPress} onPress={onPress}>
				<View
					style={[
						styles.$tags,
						{
							borderColor: colorSchemes[colorScheme].primary,
							backgroundColor: colorSchemes[colorScheme].primary,
						},
						style,
					]}
				>
					<Text
						variant={'P6'}
						style={[
							{
								color: colorSchemes[colorScheme].secondary,
								fontWeight: bold ? 'bold' : 'normal',
							},
							fontStyle,
						]}
					>
						{title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity style={touchableStyle} disabled={!onPress} onPress={onPress}>
			<View
				style={[
					styles.$tags,
					{
						borderColor: colorSchemes[colorScheme].primary,
						backgroundColor: colorSchemes[colorScheme].secondary,
					},
					style,
				]}
			>
				<Text
					variant={'P6'}
					style={[
						{
							color: colorSchemes[colorScheme].primary,
							fontWeight: bold ? 'bold' : 'normal',
						},
						fontStyle,
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
