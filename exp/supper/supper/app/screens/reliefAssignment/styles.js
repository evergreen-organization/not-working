import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	emptyData: {
		height: 50,
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#FFF',
		marginTop: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	screen: {
		width: '100%',
		height: '100%',
	},
	knob: {
		fontSize: 25,
		color: colors.primary,
		marginRight: -5,
	},
	emptyDate: {
		width: '100%',
		height: 10,
		backgroundColor: 'transparent',
	},
	flex: { flex: 1 },
});

export const calendarStyles = {
	dotColor: 'red',
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
	'stylesheet.agenda.main': {},
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
