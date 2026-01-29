import React from 'react';
import { useWindowDimensions } from 'react-native';
import { CalendarList as RNCalendarList } from 'react-native-calendars';
import { calendarStyles } from './styles';

export const CalendarList = (props) => {
	const { width } = useWindowDimensions();

	return (
		<RNCalendarList
			firstDay={1}
			calendarWidth={width}
			pastScrollRange={0}
			futureScrollRange={12}
			theme={calendarStyles}
			{...props}
		/>
	);
};
