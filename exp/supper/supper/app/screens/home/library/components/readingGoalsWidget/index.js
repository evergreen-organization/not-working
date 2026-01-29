import React from 'react';
import { View } from 'react-native';
import { colors } from 'configs';
import { ProgressBar, Text } from 'atoms';
import { styles } from './styles';
import { getReadingGoalsProgress } from '../../utils';

export const ReadingGoalsWidget = ({ goals, loading }) => {
	const { goal, done } = goals;
	return (
		<View style={styles.container}>
			<Text variant={'P3'} style={styles.title}>
				Books to read this year
			</Text>
			<View style={styles.rowContainer}>
				<Text variant={'P5'} style={styles.text}>
					Done
				</Text>
				<Text variant={'P5'} style={styles.text}>
					Goal
				</Text>
			</View>
			<ProgressBar
				progress={!goal || goal === '0' ? 0 : getReadingGoalsProgress(done, goal) * 100}
				color={colors.primary}
				unfilledColor={colors.secondary}
			/>
			<View style={styles.rowContainer}>
				<Text variant={'P3'} style={styles.subtext}>
					{loading || done === undefined ? '0' : done}
				</Text>
				<Text variant={'P3'} style={styles.subtext}>
					{loading || goal === undefined ? '0' : goal}
				</Text>
			</View>
		</View>
	);
};
