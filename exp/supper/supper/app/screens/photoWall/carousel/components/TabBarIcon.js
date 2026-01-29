import React from 'react';
import { Image } from 'react-native';
import CircleIcon from 'assets/icon/circle.png';

export const TabBarIcon = (props) => {
	const { color } = props;
	return <Image source={CircleIcon} style={{ width: 15, height: 15, tintColor: color }} />;
};
