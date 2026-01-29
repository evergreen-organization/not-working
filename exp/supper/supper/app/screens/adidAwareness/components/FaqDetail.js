import { HighlightedText } from 'atoms';
import React from 'react';
import { View } from 'react-native';

export const FaqDetail = ({ text, specialKey, color }) => {
	return (
		<View style={{ paddingVertical: 20 }}>
			<HighlightedText
				text={text}
				specialKey={specialKey}
				color={color}
				style={{ fontSize: 14, lineHeight: 20, textAlign: 'justify' }}
			/>
		</View>
	);
};
