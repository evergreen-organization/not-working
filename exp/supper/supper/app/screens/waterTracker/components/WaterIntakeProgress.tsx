import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Wave from 'react-native-waveview';
import { colors } from 'configs';
import { getWaterTrackerData } from 'stores';
import { AnimatedNumberCount, Text } from 'atoms';

const windowWidth = Dimensions.get('window').width;

const WaterIntakeProgress = () => {
	const waveRef = useRef(null);
	const { totalIntakeValue, dailyGoal } = useSelector(getWaterTrackerData) || {};
	const height = parseFloat((totalIntakeValue / dailyGoal).toString()) * windowWidth * 0.3;

	useEffect(() => {
		waveRef.current.setWaterHeight(!height ? -10 : height);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalIntakeValue]);

	return (
		<View style={styles.container}>
			<Wave
				ref={waveRef}
				style={styles.waveBall}
				H={isNaN(height) ? -10 : height - 10}
				waveParams={[
					{ A: 10, T: 180, fill: '#62c2ff' },
					{ A: 15, T: 180, fill: '#0087dc' },
					{ A: 20, T: 180, fill: '#1aa7ff' },
				]}
				animated={true}
			/>
			<View style={styles.waterGoalContainer}>
				<Text style={styles.waterGoalComparisonText}>
					<Text
						bold
						style={
							totalIntakeValue >= dailyGoal
								? styles.greaterThanDailyGoalText
								: styles.lessThanDailyGoalText
						}
					>
						<AnimatedNumberCount value={totalIntakeValue} />
					</Text>
					{' / ' + dailyGoal + ' ml'}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	waveBall: {
		width: windowWidth * 0.3,
		aspectRatio: 1,
		borderRadius: 80,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#DDD',
	},
	waterGoalContainer: {
		marginTop: 10,
	},
	waterGoalComparisonText: {
		fontSize: 14,
	},
	greaterThanDailyGoalText: {
		fontSize: 22,
		color: '#1aa7ff',
	},
	lessThanDailyGoalText: {
		fontSize: 22,
		color: colors.primaryFont,
	},
});

export default WaterIntakeProgress;
