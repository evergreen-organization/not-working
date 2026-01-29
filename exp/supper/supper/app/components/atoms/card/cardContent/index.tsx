import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { spacing } from 'configs';

interface CardContentProps extends ViewProps {}
export function CardContent(props: CardContentProps) {
	const { children, style } = props;

	return <View style={[$container, style]}>{children}</View>;
}

CardContent.displayName = 'CardContent';

const $container: ViewStyle = {
	paddingHorizontal: spacing.md,
	alignItems: 'center',
	justifyContent: 'center',
};
