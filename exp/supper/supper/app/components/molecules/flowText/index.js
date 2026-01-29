import React from 'react';
import { View } from 'react-native';
import { colors } from 'configs';
import { Text } from 'atoms';

export const FLowText = ({ data, text }) => {
	return (
		<>
			{text && <Text style={{ fontSize: 13 }}>{text}</Text>}
			<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
				{data.map((item, index) => (
					<Text
						key={`${item}-${index}`}
						style={{ fontSize: 12, color: colors.primary, fontStyle: 'italic' }}
					>
						"{item}"{index !== data.length - 1 && <Text style={{ fontSize: 12 }}> {'>'} </Text>}
					</Text>
				))}
			</View>
		</>
	);
};
