import { colors } from 'configs';

export const REMINDER_TIME = [15, 30, 60];
export const MEETING_STATUS = {
	I: { color: colors.tertiary, label: 'Pending' },
	A: { color: colors.success, label: 'Accepted' },
	R: { color: '#FDCDCD', label: 'Declined' },
	P: { color: colors.success, label: 'Tentatively Accepted' },
	U: { color: colors.medium, label: 'FYI' },
	DEFAULT: { color: '#EDD2FE', label: 'Chair' },
};

export const MEETING_DETAILS_TAB = {
	description: {
		chipTitle: 'Summary',
		name: 'Meeting Summary',
		type: 'description',
		key: 'description',
	},
	requireAttendees: {
		chipTitle: 'Required',
		name: 'Required Attendees',
		type: 'staff',
		key: 'requireAttendees',
	},
	optionalAttendees: {
		chipTitle: 'Optional',
		name: 'Optional Attendees',
		type: 'staff',
		key: 'optionalAttendees',
	},
	fyiAttendees: {
		chipTitle: 'FYI',
		name: 'FYI Attendees',
		type: 'staff',
		key: 'fyiAttendees',
	},
};

export const MEETING_DETAILS_TAB_LIST = [
	MEETING_DETAILS_TAB.description,
	MEETING_DETAILS_TAB.requireAttendees,
	MEETING_DETAILS_TAB.optionalAttendees,
	MEETING_DETAILS_TAB.fyiAttendees,
];

export const SUCCESS_REMINDER_SET = {
	message: 'Reminder set',
	description: 'You can view your reminder in phone calendar',
	type: 'success',
	backgroundColor: '#87CEFA',
	icon: 'success',
};

export const MEETING_PASSED_REMINDER_SET = {
	message: 'Reminder is not set',
	description: 'Meeting has passed',
	type: 'info',
	backgroundColor: '#BABABA',
	icon: 'info',
};

export const FAIL_REMINDER_SET = (timeDifference) => ({
	message: 'Reminder is not set',
	description: 'Meeting will start in ' + timeDifference + ' minutes',
	type: 'info',
	backgroundColor: '#BABABA',
	icon: 'info',
});
