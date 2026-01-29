import React from 'react';
import { Image, View } from 'react-native';
import TrainingWidgetItem from '../TrainingWidgetItem';
import TouchableCard from '../TouchableCard';
import { festiveStyles, styles } from './styles';
import { Festive2 } from 'assets/festive/home';
import { Text } from 'atoms';
import { commonStyles } from 'styles';

export const FestiveTrainingWidgetView = ({
	onPress,
	eLearning,
	classroom,
	digital,
	complied,
	pending,
}) => {
	return (
		<TouchableCard testID={'training-widget'} onPress={onPress} style={festiveStyles.card}>
			<View
				style={[commonStyles.row, commonStyles.justifyContentBetween, commonStyles.alignItemsEnd]}>
				<Text bold style={styles.label}>
					Training
				</Text>
				<Image style={festiveStyles.festiveImage} source={Festive2} resizeMode="contain" />
			</View>
			<View style={festiveStyles.divider} />
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
