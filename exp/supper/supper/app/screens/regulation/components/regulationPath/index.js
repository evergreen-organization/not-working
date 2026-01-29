import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'atoms';

export const RegulationPath = ({ answers, onPress, onLongPress }) => {
	return (
		<TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.container}>
			<ScrollView style={styles.flex}>
				{answers?.map(({ answerId, answerText }, index) => (
					<View key={answerId}>
						<View style={styles.view}>
							<View style={styles.textContainer}>
								<Text variant={'P6'} style={styles.text}>
									{answerText}
								</Text>
							</View>
						</View>
						{index < answers.length - 1 && <Ionicons name="caret-down" style={styles.icon} />}
					</View>
				))}
			</ScrollView>
		</TouchableOpacity>
	);
};
