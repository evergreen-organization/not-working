import { Text } from 'atoms';
import React from 'react';
import { View } from 'react-native';

export const NumberText = ({ data }) => {
	return (
		<View style={{ marginHorizontal: 12 }}>
			{data.map((item, index) => (
				<View key={index} style={{ flexDirection: 'row', marginVertical: 5 }}>
					<Text style={{ fontSize: 12, flex: 1 }}>{index + 1}.</Text>
					<Text style={{ fontSize: 12, flex: 20, textAlign: 'justify' }}>{item}</Text>
				</View>
			))}
		</View>
	);
};
