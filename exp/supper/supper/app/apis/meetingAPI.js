import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { openSettings } from 'react-native-permissions';
import Moment from 'moment';

export const getCalendar = async () => {
	const permission = await checkCalendarPermissions();
	if (!permission) {
		return {};
	}

	const calendar = await getPrimaryCalendar();
	if (!calendar) {
		return {};
	}

	return calendar;
};

const checkCalendarPermissions = async () => {
	const permission = await RNCalendarEvents.checkPermissions();

	if (permission == 'authorized') {
		return true;
	}

	if (Platform.OS === 'android') {
		const granted = await PermissionsAndroid.requestMultiple([
			PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
			PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
		]);
		const isGrantedRead =
			granted['android.permission.READ_CALENDAR'] === 'granted';
		const isGrantedWrite =
			granted['android.permission.WRITE_CALENDAR'] === 'granted';

		if (isGrantedRead && isGrantedWrite) {
			return true;
		}
	}

	if (permission === 'undetermined') {
		const requestPermission = RNCalendarEvents.requestPermissions();
		if (requestPermission == 'authorized') {
			return true;
		}
	}

	Alert.alert('Info', 'Calendar permission is required', [
		{ text: 'Cancel', onPress: () => {} },
		{
			text: 'Go to settings',
			onPress: () => openSettings(),
		},
	]);

	return false;
};

const getPrimaryCalendar = async () => {
	const calendars = await RNCalendarEvents.findCalendars();
	const primaryCalendar = calendars.find(
		(calendar) => calendar.isPrimary && calendar.allowsModifications,
	);
	// at android, if Google ID not login, calendar will not found. (should be rare case)
	if (primaryCalendar !== undefined) {
		return primaryCalendar;
	}
	Alert.alert(
		'Error',
		'Phone calendar not found. Mostly caused by Google ID not signed in.',
		[
			{
				text: 'OK',
				onPress: () => {},
			},
		],
		{ cancelable: false },
	);

	return null;
};

export const saveEvent = async ({
	calendarId,
	summary,
	startDate,
	endDate,
	location,
	reminderTime,
}) => {
	// Check if meeting has is more than reminder time
	if (validateReminderTime(reminderTime, startDate)) {
		return { success: false, error: 'Invalid reminder time' };
	}

	// get all current calendars event
	const calendarEvents = await RNCalendarEvents.fetchAllEvents(
		startDate.toISOString(),
		endDate.toISOString(),
		[calendarId],
	);

	//Check if event already exists
	const eventId = await getCalendarEvent(calendarEvents, summary);

	// Save event
	const { success, error } = await saveCalendarEvent(summary, {
		...(eventId && { id: eventId }),
		calendarId,
		location,
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
		alarms: [{ date: -reminderTime }],
	});
	return { success, error };
};

const validateReminderTime = (reminderTime, meetingTime) => {
	let timeDifference = meetingTime.diff(Moment(), 'minutes');
	return reminderTime > timeDifference;
};

const getCalendarEvent = async (events, title) => {
	if (!Array.isArray(events) || events.length === 0) {
		return null;
	}
	if (events[0].title !== title) {
		return null;
	}

	return events[0].id;
};

const saveCalendarEvent = async (title, details) => {
	return new Promise((resolve) => {
		RNCalendarEvents.saveEvent(title, details)
			.then((saved) => {
				resolve({ success: true });
			})
			.catch((error) => {
				resolve({ success: false, error });
			});
	});
};
