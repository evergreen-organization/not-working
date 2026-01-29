import React from 'react';
import { View } from 'react-native';
import { TrainingWidgetItem } from '../TrainingWidgetItem';
import { TouchableCard } from '../TouchableCard';
import { styles } from './styles';
import { Text } from 'atoms';

export const TrainingWidgetView = ({
	onPress,
	eLearning,
	classroom,
	digital,
	complied,
	pending,
}) => {
	return (
		<TouchableCard testID={'training-widget'} onPress={onPress} style={styles.card}>
			<Text bold style={styles.label}>
				Training
			</Text>
			<View style={styles.divider} />
			<View style={styles.trainingContainer}>
				<TrainingWidgetItem value={eLearning} label="eLearning" />
				<TrainingWidgetItem value={classroom} label="Classroom" />
				<TrainingWidgetItem value={digital} label="Digital" />
				<TrainingWidgetItem value={complied} label="Complied" />
				<TrainingWidgetItem value={pending} label="Pending" />
			</View>
		</TouchableCard>
	);
};
