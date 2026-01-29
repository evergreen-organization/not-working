import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import { colors } from 'configs';
import Moment from 'moment';
import { DATE_YMD } from 'configs/dateFormat';

const Calendar = ({
	leaveRecord,
	current,
	onVisibleMonthsChange,
	onDayPress,
	minDate,
	maxDate,
	style,
}) => {
	const { width } = useWindowDimensions();

	return (
		<View style={[styles.container, style]}>
			<CalendarList
				calendarWidth={width - 40}
				horizontal={true}
				pagingEnabled={true}
				hideArrows={false}
				firstDay={1}
				disableMonthChange={true}
				markingType={'custom'}
				markedDates={leaveRecord}
				current={Moment(current).format(DATE_YMD)}
				onVisibleMonthsChange={onVisibleMonthsChange}
				onDayPress={onDayPress}
				minDate={minDate}
				maxDate={maxDate}
				hideExtraDays
				theme={{
					todayTextColor: colors.primary,
					textDayFontFamily: 'Montserrat-Regular',
					textDayFontWeight: '400',
					dayTextColor: colors.primaryFont,
					textMonthFontFamily: 'Montserrat-Regular',
					textMonthFontWeight: '400',
					monthTextColor: colors.secondaryFont,
					textSectionTitleColor: colors.secondaryFont,
					textDayHeaderFontFamily: 'Montserrat-Regular',
					textDayFontSize: 12,
					textMonthFontSize: 12,
					textDayHeaderFontSize: 11,
					arrowColor: colors.primary,
					backgroundColor: 'rgba(255,255,255,0)',
					calendarBackground: 'rgba(255,255,255,0)',
					'stylesheet.calendar.header': {
						week: {
							marginVertical: 5,
							flexDirection: 'row',
							justifyContent: 'space-around',
							borderBottomWidth: 0.33,
							borderBottomColor: '#D8D8D8',
							paddingTop: 7,
						},
					},
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 10,
	},
});

export default Calendar;
