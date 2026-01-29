import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Title from 'assets/festive/eCardChallenge/task-2-title.png';
import { Survey } from '../survey';

const { width } = Dimensions.get('window');

export const Task2 = ({ url, onCompleteSurvey }) => {
	return (
		<>
			<Image source={Title} style={styles.titleImg} />
			<Survey
				url={url}
				isPreviousTaskCompleted={true}
				onComplete={onCompleteSurvey}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	titleImg: {
		width: width * 0.8,
		height: 20,
		marginVertical: 10,
		alignSelf: 'center',
	},
});
