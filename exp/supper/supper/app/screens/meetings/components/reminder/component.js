import React from 'react';
import { Animated, View } from 'react-native';

import { Button, Text } from 'atoms';
import { REMINDER_TIME } from '../../constant/constant';
import { styles } from './styles';

export const RemindersView = ({ testID, dragX, handleSetReminder }) => {
	const scale = dragX.interpolate({
		inputRange: [0, 70],
		outputRange: [0, 65],
		extrapolate: 'clamp',
	});

	return (
		<Animated.View style={[styles.container]}>
			{REMINDER_TIME.map((reminder) => (
				<Button
					key={reminder}
					testID={`${testID}-${reminder}`}
					style={{ ...styles.eventButton, transform: [{ scale }] }}
					onPress={() => handleSetReminder(reminder)}
					showOpacity
				>
					<View style={styles.buttonView}>
						<Text variant={'P2'} style={styles.eventButtonText}>
							{reminder}
						</Text>
						<Text variant={'P3'} style={styles.eventButtonSubText}>
							mins
						</Text>
					</View>
				</Button>
			))}
		</Animated.View>
	);
};
