import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Text } from 'atoms';

export const EBizTutorialDropItem = ({ icon, title, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Image source={icon} style={styles.icon} />
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};
