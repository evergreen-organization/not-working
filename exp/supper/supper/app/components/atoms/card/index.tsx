import React, { ComponentType } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { CardVariants, styles } from './styles';
import { CardTitle } from './cardTitle';
import { CardImage } from './cardImage';
import { CardContent } from './cardContent';

export interface CardProps extends TouchableOpacityProps {
	variant?: CardVariants;
	testID?: string;
}
export const Card = (props: CardProps) => {
	const {
		variant = 'default',
		testID,
		style: $containerStyleOverride,
		children,
		...WrapperProps
	} = props;

	const isPressable = !!WrapperProps.onPress;

	const Wrapper: ComponentType<TouchableOpacityProps> = isPressable ? TouchableOpacity : View;

	const $containerStyle = [styles.$containerPresets[variant], $containerStyleOverride];

	return (
		<Wrapper
			testID={testID}
			style={$containerStyle}
			activeOpacity={0.8}
			accessibilityRole={isPressable ? 'button' : undefined}
			{...WrapperProps}
		>
			{children}
		</Wrapper>
	);
};

// @component
Card.Title = CardTitle;
Card.Image = CardImage;
Card.Content = CardContent;
