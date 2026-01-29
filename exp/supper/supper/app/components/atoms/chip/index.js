import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { tagColors } from 'configs';

import { styles } from './styles';
import { Text } from 'atoms';

const variants = {
	light: 'light',
	dark: 'dark',
};

const colorSchemes = {
	default: tagColors.default,
	success: tagColors.green,
	error: tagColors.red,
	info: tagColors.grey,
	warning: tagColors.yellow,
};

export const Chip = ({
	title,
	subtitle,
	style,
	fontStyle = { fontSize: 12 },
	subtitleFontStyle,
	touchableStyle,
	variant,
	colorScheme = colorSchemes.default,
	onPress,
	typography,
	isSelected,
	testID,
}) => {
	if (variant === variants.dark) {
		return (
			<TouchableOpacity
				testID={testID}
				style={touchableStyle}
				disabled={!onPress}
				onPress={onPress}
			>
				<View
					style={[
						styles.container,
						{
							// borderColor: colorScheme.primary,
							backgroundColor: isSelected ? colorScheme.secondary : colorScheme.primary,
						},
						style,
					]}
				>
					<Text
						variant={'P1'}
						style={[
							{
								color: isSelected ? colorScheme.primary : colorScheme.secondary,
							},
							fontStyle,
						]}
					>
						{title}
					</Text>
					{subtitle && (
						<Text
							variant={'P1'}
							style={[
								{
									color: isSelected ? colorScheme.primary : colorScheme.secondary,
									marginLeft: 5,
								},
								subtitleFontStyle,
							]}
						>
							{subtitle}
						</Text>
					)}
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity testID={testID} style={touchableStyle} disabled={!onPress} onPress={onPress}>
			<View
				style={[
					styles.container,
					{
						borderColor: isSelected ? colorScheme.primary : colorScheme.secondary,
						backgroundColor: isSelected ? colorScheme.primary : colorScheme.secondary,
					},
					style,
				]}
			>
				<Text
					variant={'P1'}
					style={[{ color: isSelected ? colorScheme.secondary : colorScheme.primary }, fontStyle]}
				>
					{title}
				</Text>
				{subtitle && (
					<Text
						variant={'P1'}
						style={[
							{
								color: isSelected ? colorScheme.secondary : colorScheme.primary,
								marginLeft: 5,
							},
							subtitleFontStyle,
						]}
					>
						{subtitle}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

Chip.variants = variants;
Chip.colorScheme = colorSchemes;
