import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { styles } from './styles';

import { Text } from 'atoms';
import { RegulationPath } from '../regulationPath';

export const SelectionAnswerPath = ({ previousSelection, previousAnswer, isVisible, onPress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text variant={'P6'} numberOfLines={1}>
					{' '}
					{`Previous selection : ${previousAnswer} `}
				</Text>
				<Icon type="Feather" name={isVisible ? 'chevron-up' : 'chevron-down'} style={styles.icon} />
			</TouchableOpacity>
			<Collapsible collapsed={!isVisible}>
				<View style={styles.pathView}>
					<RegulationPath answers={previousSelection} />
				</View>
			</Collapsible>
		</View>
	);
};
