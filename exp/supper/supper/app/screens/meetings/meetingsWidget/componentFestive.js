import React from 'react';
import { colors } from 'configs';
import TouchableCard from '../../homeNew/components/TouchableCard';
import EventItem from '../../homeNew/components/EventItem';
import { festiveStyles } from './styles';
import { Image } from 'react-native';
import { Festive1 } from 'assets/festive/home';
import { Text } from 'atoms';

export const FestiveMeetingsWidgetView = ({ onPress, event }) => {
	return (
		<TouchableCard style={festiveStyles.card} testID={'meeting-widget'} onPress={onPress}>
			<Text bold style={festiveStyles.label}>
				Meetings
			</Text>
			<Image resizeMode="contain" style={festiveStyles.festiveImage} source={Festive1} />
			{event ? (
				<EventItem date={event.date} description={event.description} lineColor={colors.primary} />
			) : (
				<Text style={festiveStyles.noMeetingText}>No Upcoming Meetings</Text>
			)}
		</TouchableCard>
	);
};
