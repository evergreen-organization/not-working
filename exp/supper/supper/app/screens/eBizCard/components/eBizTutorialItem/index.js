import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Text } from 'atoms';
import RightIcon from '../../../../assets/icon/right.png';
import React from 'react';

export const EBizTutorialItem = ({ icon, title, description, isSelected, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Image source={icon} style={styles.icon} />
				<View style={styles.vwLabels}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
				<Image
					source={RightIcon}
					style={{
						...styles.image,
						transform: [{ rotate: isSelected ? '90deg' : '0deg' }],
					}}
				/>
			</View>
		</TouchableOpacity>
	);
};
