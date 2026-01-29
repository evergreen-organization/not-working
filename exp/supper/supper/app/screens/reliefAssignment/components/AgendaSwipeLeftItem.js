import React, { forwardRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from 'atoms';
import { colors } from 'configs';
import { showSuccess } from 'utils';

import { saveintoCalendar } from '../utils/calendarUtils';
import { REMINDER_OPTIONS } from '../constant/constant';
import { RELIEF_TEST_ID } from '../../../../e2e/relief/testID';

const AgendaSwipeLeftItem = ({ progress, dragX, item }, ref) => {
	const scale = dragX.interpolate({
		inputRange: [0, 80],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	const onReminderPress = async (duration) => {
		if (await saveintoCalendar(item, duration)) {
			showSuccess('Reminder set', 'You can view your reminder in phone calendar');
		}
		ref.current?.close();
	};

	return (
		<Animated.View style={{ ...styles.view, transform: [{ scale }] }}>
			{REMINDER_OPTIONS.map((option, index) => (
				<TouchableOpacity
					testID={`${RELIEF_TEST_ID.REMINDER_BUTTON}-${option.subText}`}
					key={option.duration}
					style={styles.eventButton}
					onPress={() => onReminderPress(option.duration)}
				>
					<Text variant={'P2'} style={styles.eventButtonText}>
						{option.text}
					</Text>
					<Text style={styles.eventButtonSubText}> {option.subText}</Text>
				</TouchableOpacity>
			))}
		</Animated.View>
	);
};

export default forwardRef(AgendaSwipeLeftItem);

const styles = StyleSheet.create({
	eventButton: {
		width: 55,
		height: 55,
		borderRadius: 10,
		marginRight: 5,
		backgroundColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	eventButtonText: {
		color: colors.white,
		fontSize: 14,
	},
	eventButtonSubText: {
		color: colors.white,
		fontSize: 12,
	},
	view: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 5,
	},
});
