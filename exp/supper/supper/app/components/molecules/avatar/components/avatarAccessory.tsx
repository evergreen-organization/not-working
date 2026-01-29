import React from 'react';
import { Platform, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { IconNew, IconObject } from 'atoms';
import { ACCESSORY_POSITION, Position } from '../utils';

export interface AvatarAccessoryProps {
	size: number;
	position: Position;
	style?: StyleProp<any>;
	icon?: IconObject;
	onPress?(): void;
}

export const AvatarAccessory = (props: AvatarAccessoryProps) => {
	const { size, position, style, icon, onPress } = props;

	const borderRadius = size / 2;
	const iconSize = size * 0.8;

	return (
		<TouchableHighlight
			testID={'avatar-accessory-button'}
			style={{
				borderRadius: borderRadius,
				width: size,
				height: size,
				...ACCESSORY_POSITION[position],
				...$accessory,
				...style,
			}}
			onPress={onPress}
		>
			{icon || <IconNew type="material" name="mode-edit" color={'#FFF'} size={iconSize} />}
		</TouchableHighlight>
	);
};

const $accessory: ViewStyle = {
	position: 'absolute',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#aaa',
	...Platform.select({
		android: {
			elevation: 1,
		},
		default: {
			shadowColor: '#000',
			shadowOffset: { width: 1, height: 1 },
			shadowRadius: 2,
			shadowOpacity: 0.5,
		},
	}),
};
