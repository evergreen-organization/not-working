import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { colors } from 'configs';
import { getIconType } from './helper';

export type IconType =
	| 'zocial'
	| 'octicon'
	| 'material'
	| 'material-community'
	| 'ionicon'
	| 'foundation'
	| 'evilicon'
	| 'entypo'
	| 'font-awesome'
	| 'font-awesome-5'
	| 'simple-line-icon'
	| 'feather'
	| 'antdesign'
	| 'ant-design'
	| 'fontisto';

export interface IconObject {
	type?: IconType;
	name?: string;
	style?: StyleProp<TextStyle>;
	size?: number;
	color?: string;
}

export const IconNew = (props: IconObject) => {
	const { type, name, style, size = 24, color = colors.primary } = props;
	const IconComponent = getIconType(type);

	return <IconComponent name={name} size={size} color={color} style={style} />;
};
