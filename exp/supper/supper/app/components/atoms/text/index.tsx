import { colors } from 'configs';
import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { Typography } from 'styles';
import { FONT_FAMILY_BOLD } from 'styles/fonts';

export enum EText {
	H1 = 'H1',
	H2 = 'H2',
	H3 = 'H3',
	H4 = 'H4',
	H5 = 'H5',
	H6 = 'H6',
	P1 = 'P1',
	P2 = 'P2',
	P3 = 'P3',
	P4 = 'P4',
	P5 = 'P5',
	P6 = 'P6',
	P7 = 'P7',
	P8 = 'P8',
	P9 = 'P9',
	P10 = 'P10',
	P11 = 'P11',
	P12 = 'P12',
	P13 = 'P13',
	P14 = 'P14',
	P15 = 'P15',
}

export type TTextVariant = keyof typeof EText;

type TTextProps = React.ComponentProps<typeof RNText> & {
	style?: StyleProp<TextStyle>;
	children: React.ReactNode;
	variant?: TTextVariant;
	bold?: boolean;
	fontSize?: number;
	color?: keyof typeof colors;
};

export const Text = ({
	bold = false,
	style,
	children,
	variant = 'P1',
	fontSize = 12,
	color,
	...props
}: TTextProps) => {
	return (
		<RNText
			maxFontSizeMultiplier={1.15}
			style={[
				{
					fontSize,
				},
				Typography.base,
				Typography[variant],
				bold && { fontFamily: FONT_FAMILY_BOLD },
				color && { color: colors[color] },
				style,
			]}
			{...props}
		>
			{children}
		</RNText>
	);
};

Text.type = EText as Record<string, keyof typeof EText>;
