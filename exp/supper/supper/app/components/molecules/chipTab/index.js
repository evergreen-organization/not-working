import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'atoms';

import { styles } from './styles';

export const ChipTab = ({ tabs, onPress: onTabPress }) => {
	const [selected, setSelected] = useState(0);

	const onPress = (index) => {
		if (selected === index) {
			return;
		}
		setSelected(index);
		onTabPress(index);
	};

	return (
		<View style={styles.container}>
			{tabs.length !== 0 &&
				tabs.map((item, index) => (
					<Chip
						testID={item.testID}
						key={item.title}
						title={item.title}
						isSelected={selected === index}
						onPress={() => onPress(index)}
					/>
				))}
		</View>
	);
};
