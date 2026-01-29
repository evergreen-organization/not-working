import React from 'react';
import { colors } from 'configs';
import { styles } from './styles';
import { Text } from 'atoms';
import { commonStyles } from 'styles';
import { TouchableOpacity } from 'react-native';

export const DialogCard = ({ title, isSelected, onPress }) => {
	return (
		<TouchableOpacity
			style={[
				commonStyles.justifyContentCenter,
				styles.button,
				{
					backgroundColor: isSelected ? colors.primary : colors.white,
					paddingHorizontal: isSelected ? 10 : 0,
				},
			]}
			onPress={onPress}
		>
			<Text
				bold={false}
				style={[
					commonStyles.textCenter,
					styles.answerCardText,
					{ color: isSelected ? colors.white : colors.primaryFont },
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};
