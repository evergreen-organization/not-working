import React from 'react';
import { colors } from 'configs';
import TouchableCard from '../../homeNew/components/TouchableCard';
import EventItem from '../../homeNew/components/EventItem';
import { styles } from './styles';
import { Text } from 'atoms';

export const MeetingsWidgetView = ({ onPress, event }) => {
	return (
		<TouchableCard testID={'meeting-widget'} onPress={onPress}>
			<Text bold style={styles.label}>
				Meetings
			</Text>
			{event ? (
				<EventItem date={event.date} description={event.description} lineColor={colors.primary} />
			) : (
				<Text style={styles.noMeetingText}>No Upcoming Meetings</Text>
			)}
		</TouchableCard>
	);
};
