import React from 'react';
import Moment from 'moment/moment';
import { showMessage } from 'react-native-flash-message';

import { getCalendar, saveEvent } from 'apis';

import { RemindersView } from './component';
import {
	FAIL_REMINDER_SET,
	MEETING_PASSED_REMINDER_SET,
	SUCCESS_REMINDER_SET,
} from '../../constant/constant';

export const Reminders = ({
	testID,
	event,
	eventStartDate: startDate,
	eventEndDate: endDate,
	onReminderSet,
	dragX,
}) => {
	const showReminderSet = () => {
		showMessage(SUCCESS_REMINDER_SET);
	};

	const showReminderNotSet = (time) => {
		let timeDifference = time.diff(Moment(), 'minutes');
		timeDifference < 0
			? showMessage(MEETING_PASSED_REMINDER_SET)
			: showMessage(FAIL_REMINDER_SET(timeDifference));
	};

	const handleSetReminder = async (reminderTime) => {
		// Check if calendar exists
		const { id: calendarId } = await getCalendar();
		if (!calendarId) {
			return;
		}

		// Save event
		const { summary, room, location } = event;
		const { success } = await saveEvent({
			calendarId,
			summary,
			reminderTime,
			startDate,
			endDate,
			location: room ?? location ?? '',
		});

		// Prompt success or error message
		success ? showReminderSet() : showReminderNotSet(startDate);
		onReminderSet();
	};

	const props = {
		testID,
		dragX,
		handleSetReminder,
	};

	return <RemindersView {...props} />;
};
