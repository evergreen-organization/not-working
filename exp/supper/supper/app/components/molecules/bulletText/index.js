import React from 'react';
import { View, Image } from 'react-native';
import Dot from 'assets/icon/dot.png';
import { colors } from 'configs';
import { HighlightedText } from 'atoms';

export const BulletText = ({ data }) => {
	return (
		<View style={{ marginHorizontal: 12, marginVertical: 8 }}>
			{data.map((item, index) => (
				<View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
					<Image source={Dot} style={{ width: 5, height: 5 }} />
					<HighlightedText
						text={item}
						specialKey={'"'}
						color={colors.primary}
						style={{ fontSize: 12, marginLeft: 10, flex: 50, textAlign: 'justify' }}
					/>
				</View>
			))}
		</View>
	);
};
