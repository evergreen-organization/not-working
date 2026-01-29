import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BottomModal } from 'molecules';
import { _styles } from './styles';
import { Text } from 'atoms';

export const SecfaOptionModalView = ({ visible, closeModal, onPress, list }) => {
	return (
		<BottomModal showLine={false} isVisible={visible} closeModal={closeModal}>
			<>
				<View style={_styles.container}>
					<Text style={_styles.title}>Authentication Type</Text>
				</View>
				<ScrollView>
					{list.map((item, index) => (
						<TouchableOpacity key={item.key} onPress={() => onPress(item.key)} style={_styles.btn}>
							<Text>{item.title}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</>
		</BottomModal>
	);
};
