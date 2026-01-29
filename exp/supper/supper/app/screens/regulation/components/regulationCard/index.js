import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Text } from 'atoms';

const numberWithCommas = (number) => {
	if (number == null || number === undefined) {
		return '';
	}
	return new Intl.NumberFormat('en-US').format(number);
};

export const RegulationCard = ({ regulation, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => onPress(regulation)}>
			<View>
				<Image source={{ uri: `${regulation.circularImage}` }} style={styles.image} />
				<View style={styles.countContainer}>
					<Text variant={'P10'} style={styles.count}>
						{`${numberWithCommas(regulation.overallViewCount)} Views`}
					</Text>
				</View>
			</View>
			<Text variant={'P9'} style={styles.title}>
				{regulation.circularName}
			</Text>
			<Text variant={'P10'} style={styles.desc} numberOfLines={1}>
				{regulation.circularDesc}
			</Text>
		</TouchableOpacity>
	);
};
