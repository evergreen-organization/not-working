import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'atoms';
import RightIcon from 'assets/icon/right.png';
import React from 'react';
import { styles } from './styles';

export const EBizTutorialDetailDropItem = ({ isSelected, title, bullet, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.vwLabel}>
				<Text style={styles.lblBullet}>{bullet}</Text>
				<Text style={styles.lblTitle}>{title}</Text>
			</View>
			<Image
				source={RightIcon}
				style={{
					...styles.image,
					transform: [{ rotate: isSelected ? '90deg' : '0deg' }],
				}}
			/>
		</TouchableOpacity>
	);
};
