import React from 'react';
import { StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { Text, TTextVariant } from 'atoms';
import { spacing } from 'configs';

interface CardTitleProps extends ViewProps {
	title: string;
	titleStyle?: StyleProp<TextStyle>;
	titleNumberOfLines?: number;
	titleTypography?: TTextVariant;
	subtitle?: string;
	subtitleStyle?: StyleProp<TextStyle>;
	subtitleNumberOfLines?: number;
	subtitleTypography?: TTextVariant;
	left?: any;
	right?: any;
}

export const CardTitle = (props: CardTitleProps) => {
	const {
		title,
		titleStyle,
		titleTypography,
		titleNumberOfLines,
		subtitle,
		subtitleStyle,
		subtitleTypography,
		subtitleNumberOfLines,
		left,
		right,
		style,
		children,
	} = props;

	const $centerStyle = [
		$titles,
		left && { marginStart: spacing.md },
		right && { marginEnd: spacing.md },
	];
	return (
		<View style={[$view, style]}>
			{left}
			<View style={$centerStyle}>
				<Text variant={titleTypography} style={titleStyle} numberOfLines={titleNumberOfLines}>
					{title}
				</Text>
				{subtitle ? (
					<Text
						variant={subtitleTypography}
						style={subtitleStyle}
						numberOfLines={subtitleNumberOfLines}
					>
						{subtitle}
					</Text>
				) : null}
				{children}
			</View>
			{right}
		</View>
	);
};

CardTitle.displayName = 'Card.Title';

const $view: ViewStyle = {
	flexDirection: 'row',
};

const $titles: ViewStyle = {
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'center',
};
