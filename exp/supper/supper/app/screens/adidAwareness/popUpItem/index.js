import React from 'react';
import { Image, View } from 'react-native';

import { Text } from 'atoms';

import { styles } from './styles';

export const PopUpItem = ({ item }) => {
	const { titleIcon, title, details } = item;

	return (
		<View style={styles.view}>
			<Text variant={'H6'} style={styles.title}>
				{titleIcon && <Image source={titleIcon} style={styles.icon} />}
				{title}
			</Text>
			<View style={styles.details}>{details}</View>
		</View>
	);
};
