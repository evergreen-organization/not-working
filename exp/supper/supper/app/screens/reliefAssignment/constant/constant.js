import { colors } from 'configs';
import { LEAVE_COLOR_CODES } from 'constant';

export const HalfDayTypeDef = ['Full Day', 'First Half', 'Second Half'];

export const REMINDER_OPTIONS = [
	{ text: 1, subText: 'Day', duration: 24 * 60 },
	{ text: 2, subText: 'Days', duration: 24 * 2 * 60 },
	{ text: 1, subText: 'Week', duration: 24 * 7 * 60 },
];

export const reliefMark = { customStyles: { text: { color: colors.primary } } };
export const PPH1Mark = {
	container: {
		borderBottomWidth: 1.5,
		borderLeftWidth: 0.5,
		borderRightWidth: 0.5,
		borderColor: '#505050',
	},
};

export const FirsHalfLeaveMark = {
	container: {
		backgroundColor: 'transparent',
		borderLeftWidth: 16,
		transform: [{ rotate: '90deg' }],
	},
	text: {
		position: 'absolute',
		transform: [{ rotate: '-90deg' }],
		paddingBottom: 3.5,
	}, //paddingBottom: manually adjust text position
};
export const SecondHalfLeaveMark = {
	container: {
		backgroundColor: 'transparent',
		borderRightWidth: 16,
		transform: [{ rotate: '90deg' }],
	},
	text: {
		position: 'absolute',
		transform: [{ rotate: '-90deg' }],
		paddingBottom: 3.5,
	}, //paddingBottom: manually adjust text position
};

export const SelectedDayMark = {
	customStyles: {
		container: {
			backgroundColor: '#51b9ed',
			borderRadius: 10,
		},
	},
};

export const PublicHolidayLeaveMark = {
	customStyles: {
		container: {
			borderBottomWidth: 1.5,
			borderLeftWidth: 0.5,
			borderRightWidth: 0.5,
			borderColor: '#505050',
		},
	},
};

export const LeaveRecordMark = (leaveCode) => ({
	/*full day*/
	0: {
		customStyles: {
			container: {
				backgroundColor: LEAVE_COLOR_CODES[leaveCode] ?? colors.lightGrey,
				borderRadius: 10,
			},
		},
	},
	/*first half*/
	1: {
		customStyles: {
			container: {
				backgroundColor: 'transparent',
				borderLeftWidth: 16,
				transform: [{ rotate: '90deg' }],
				borderLeftColor: LEAVE_COLOR_CODES[leaveCode] ?? colors.lightGrey,
				borderRadius: 10,
			},
			text: {
				position: 'absolute',
				transform: [{ rotate: '-90deg' }],
				paddingBottom: 3.5,
			},
		},
	},
	/*second half*/
	2: {
		customStyles: {
			container: {
				backgroundColor: 'transparent',
				borderRightWidth: 16,
				transform: [{ rotate: '90deg' }],
				borderRightColor: LEAVE_COLOR_CODES[leaveCode] ?? colors.lightGrey,
				borderRadius: 10,
			},
			text: {
				position: 'absolute',
				transform: [{ rotate: '-90deg' }],
				paddingBottom: 3.5,
			},
		},
	},
});
