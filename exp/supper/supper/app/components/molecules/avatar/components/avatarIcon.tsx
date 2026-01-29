import React from 'react';
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native';
import { IconObject } from 'atoms';

export interface AvatarIconProps {
	size: number;
	icon: IconObject;
	style?: StyleProp<any>;
	rounded?: boolean;
}

export const AvatarIcon = (props: AvatarIconProps) => {
	const { size, icon, rounded, style } = props;
	const borderRadius = size / 2;

	return (
		<View
			style={StyleSheet.flatten([
				$icon,
				{
					width: size,
					height: size,
					...(rounded && { borderRadius: borderRadius }),
				},
				style,
			])}
		>
			{icon}
		</View>
	);
};

const $icon: ViewStyle = {
	backgroundColor: 'lightgray',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 5,
};
