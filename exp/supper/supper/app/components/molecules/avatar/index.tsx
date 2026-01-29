import React from 'react';
import {
	ImageSourcePropType,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import { IconObject } from 'atoms';
import { BOTTOM_RIGHT, Position } from './utils';
import { AvatarText } from './components/avatarText';
import { AvatarIcon } from './components/avatarIcon';
import { AvatarImage } from './components/avatarImage';
import { AvatarAccessory } from './components/avatarAccessory';

const DefaultAvatar = require('assets/avatar/default.png');
export interface AvatarNewProps {
	preset?: 'text' | 'icon' | 'image';
	testID?: string;
	size?: number;
	containerStyle?: ViewStyle;
	style?: StyleProp<any>;
	title?: string;
	icon?: IconObject;
	source?: ImageSourcePropType;
	rounded?: boolean;
	accessory?: boolean;
	accessorySize?: number;
	accessoryPosition?: Position;
	accessoryStyle?: StyleProp<any>;
	accessoryIcon?: IconObject;
	onPressAccessory?(): void;
	onPress?(): void;
}
export const Avatar = (props: AvatarNewProps) => {
	const {
		preset,
		testID,
		size = 120,
		containerStyle,
		style,
		title,
		icon,
		source,
		rounded = false,
		accessory = false,
		accessorySize,
		accessoryPosition = BOTTOM_RIGHT,
		accessoryStyle,
		accessoryIcon,
		onPressAccessory,
		onPress,
	} = props;
	const borderRadius = size / 2;
	const accessoryDimension = accessorySize || size / 3;

	const renderAvatar = () => {
		if (preset === 'text') {
			return <AvatarText size={size} rounded={rounded} style={style} title={title} />;
		}
		if (preset === 'icon') {
			return <AvatarIcon size={size} rounded={rounded} style={style} icon={icon} />;
		}
		if (preset === 'image') {
			return <AvatarImage size={size} rounded={rounded} style={style} source={source} />;
		}
		return <AvatarImage size={size} rounded={rounded} style={style} source={DefaultAvatar} />;
	};

	return (
		<TouchableOpacity
			testID={testID}
			style={{ ...(rounded && { borderRadius: borderRadius }) }}
			disabled={!onPress}
			onPress={onPress}
		>
			<>
				<View
					style={StyleSheet.flatten([
						$container,
						{
							width: size,
							height: size,
							overflow: 'hidden',
							...(rounded && { borderRadius: borderRadius }),
						},
						containerStyle,
					])}
				>
					{renderAvatar()}
				</View>
				{accessory && (
					<AvatarAccessory
						size={accessoryDimension}
						position={accessoryPosition}
						style={accessoryStyle}
						onPress={onPressAccessory}
						icon={accessoryIcon}
					/>
				)}
			</>
		</TouchableOpacity>
	);
};

const $container: ViewStyle = {
	justifyContent: 'center',
	alignItems: 'center',
};
