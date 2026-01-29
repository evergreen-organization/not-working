import TouchableCard from '../TouchableCard';
import { styles } from './styles';
import EventItem from '../EventItem';
import { colors } from 'configs';
import React from 'react';
import { Text } from 'atoms';

export const EventsWidgetComp = (props) => {
	const { onPress, description, date } = props;
	return (
		<TouchableCard onPress={onPress} style={{}}>
			<Text bold style={styles.label}>
				Events
			</Text>
			{description ? (
				<EventItem date={date} description={description} lineColor={colors.secondary} />
			) : (
				<Text style={styles.lblEmpty}>No Upcoming Events</Text>
			)}
		</TouchableCard>
	);
};
