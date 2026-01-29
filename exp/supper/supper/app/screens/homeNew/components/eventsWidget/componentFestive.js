import TouchableCard from '../TouchableCard';
import React from 'react';
import { colors } from 'configs';
import EventItem from '../EventItem';
import { festiveStyles } from './styles';
import { Image } from 'react-native';
import { Festive3 } from 'assets/festive/home';
import { Text } from 'atoms';

export const EventsWidgetFestiveComp = (props) => {
	const { onPress, description, date } = props;
	return (
		<TouchableCard onPress={onPress} style={festiveStyles.card}>
			<Text bold style={festiveStyles.label}>
				Events
			</Text>
			{description ? (
				<EventItem date={date} description={description} lineColor={colors.primary} />
			) : (
				<Text style={festiveStyles.lblEmpty}>No Upcoming Events</Text>
			)}
			<Image style={festiveStyles.festiveImage} source={Festive3} resizeMode="contain" />
		</TouchableCard>
	);
};
