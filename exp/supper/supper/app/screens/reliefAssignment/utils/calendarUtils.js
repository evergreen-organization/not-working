import RNCalendarEvents from 'react-native-calendar-events';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { openSettings } from 'react-native-permissions';
import moment from 'moment';

import { HalfDayTypeDef } from '../constant/constant';

const requestAndroidCalendarPermission = async () => {
	const grantResult = await PermissionsAndroid.requestMultiple([
		PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
		PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
	]);

	return (
		grantResult['android.permission.READ_CALENDAR'] &&
		grantResult['android.permission.WRITE_CALENDAR'] === 'granted'
	);
};

const requestIOSCalendarPermission = async (calendarStatus) => {
	if (calendarStatus === 'undetermined') {
		const iosPermission = await RNCalendarEvents.requestPermissions();
		if (iosPermission === 'authorized') {
			return true;
		}
	}
	// iOS only prompt once for first time, so need to manually route user to settings to enable
	Alert.alert('Info', 'Calendar permission is required', [
		{
			text: 'Cancel',
			onPress: () => {},
		},
		{
			text: 'Go to settings',
			onPress: () => {
				openSettings();
			},
		},
	]);

	return false;
};

const requestCalendarPermission = async () => {
	// Check Calendar Permission
	const calendarPermission = await RNCalendarEvents.checkPermissions();
	if (calendarPermission === 'authorized') {
		return true;
	}
	if (Platform.OS === 'android' && (await requestAndroidCalendarPermission())) {
		return true;
	}
	return !!(
		Platform.OS === 'ios' &&
		(await requestIOSCalendarPermission(calendarPermission))
	);
};

export const saveintoCalendar = async (item, reminderTime) => {
	// to identify the Primary Calendars first
	if (await requestCalendarPermission()) {
		const calendars = await RNCalendarEvents.findCalendars();
		const primaryCalendar = calendars.find(
			(c) => c.isPrimary && c.allowsModifications,
		);
		// at android, if Google ID not login, calendar will not found. (should be rare case)
		if (primaryCalendar === undefined) {
			Alert.alert(
				'Error',
				'Phone calendar not found. Mostly caused by Google ID not signed in.',
				[
					{
						text: 'OK',
					},
				],
				{ cancelable: false },
			);
			return false;
		}
		const calendarId = primaryCalendar.id;
		let actualStart = moment(`${item.date}`, 'YYYY-MM-DD');
		let actualEnd = moment(`${item.date}`, 'YYYY-MM-DD').add(1, 'hours');
		let alarmTime = reminderTime;
		let location = `${item.reliefBrh} - ${item.homeStateName}`;
		let title = `Staff Relief Assignment (${HalfDayTypeDef[item.halfDayType]})`;

		if (Platform.OS === 'ios') {
			alarmTime = -alarmTime;
		}

		const allEvents = await RNCalendarEvents.fetchAllEvents(
			actualStart.toISOString(),
			actualEnd.toISOString(),
			[calendarId],
		);
		const isExistedEvent = allEvents.length > 0 && allEvents[0].title === title;

		const saveDetails = {
			id: isExistedEvent ? allEvents[0].id : undefined,
			calendarId: calendarId,
			startDate: actualStart.toISOString(),
			endDate: actualEnd.toISOString(),
			location: location,
			alarms: [{ date: alarmTime }],
		};

		try {
			await RNCalendarEvents.saveEvent(title, saveDetails);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	return false;
};
