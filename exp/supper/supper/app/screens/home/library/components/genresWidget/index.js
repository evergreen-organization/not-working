import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Text } from 'atoms';

import { genresItem } from '../../utils';
import { styles } from './styles';

export const GenresWidget = ({ onPress }) => {
	return (
		<>
			<Text variant={'P2'} style={styles.heading}>
				Genres
			</Text>
			<View style={styles.genresSection}>
				{genresItem.map((item, index) => (
					<LibraryGenresItem
						key={item.type}
						type={item.type}
						icon={item.icon}
						onPress={() => onPress(item.type)}
					/>
				))}
			</View>
		</>
	);
};

const LibraryGenresItem = ({ type, icon, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<Image source={icon} style={styles.icon} />
			</View>
			<Text variant={'P5'} style={styles.text}>
				{type}
			</Text>
		</TouchableOpacity>
	);
};
