import React from 'react';
import Hyperlink from 'react-native-hyperlink';
import { Text } from '../text';

import { styles } from './styles';

export const HyperLinkText = ({ text, onPress, textStyle }) => {
	return (
		<Hyperlink linkStyle={[styles.link, textStyle]} onPress={(url) => onPress(url)}>
			<Text variant={'P6'} style={[styles.desc, textStyle]}>
				{text}
			</Text>
		</Hyperlink>
	);
};
