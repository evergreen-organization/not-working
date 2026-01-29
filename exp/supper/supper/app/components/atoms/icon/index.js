import React from 'react';
import { getIconType } from './helper';

export const Icon = ({ type, name, style }) => {
	const IconComponent = getIconType(type);

	return <IconComponent name={name} style={style} />;
};
