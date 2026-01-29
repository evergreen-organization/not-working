import { colors } from 'configs';

export const calendarStyles = {
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
};
