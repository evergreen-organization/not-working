import Moment, { DurationInputArg1, MomentInput } from 'moment';
import notifee, {
	TimestampTrigger,
	TriggerType,
	AndroidImportance,
	RepeatFrequency,
} from '@notifee/react-native';
import { WATER_TRACKER_NOTIFICATION_CHANNEL } from 'constant';

export const dateTimeFormat = 'YYYY-MM-DD HH:mm';
export const dateFormat = 'YYYY-MM-DD';
export const timeFormat = 'hh:mm A';
export const currentDateTime = Moment();

export const dateIsBefore = (start: MomentInput, end: MomentInput) =>
	Moment(start, dateTimeFormat).isBefore(Moment(end, dateTimeFormat));

export const dateDiff = (start: MomentInput, end: MomentInput) =>
	Moment(start, dateTimeFormat).diff(Moment(end, dateTimeFormat), 'milliseconds');

export const addHour = (date: MomentInput, hours: DurationInputArg1) =>
	Moment(date, dateTimeFormat).add(hours, 'hours');

export const addMiliseconds = (date: MomentInput, ms: DurationInputArg1) =>
	Moment(date, dateTimeFormat).add(ms, 'milliseconds');

export const subtractHour = (date: MomentInput, hours: DurationInputArg1) =>
	Moment(date, dateTimeFormat).subtract(hours, 'hours');

export function getSchedule(waterTimeArray: Array<Moment.Moment>): string[] {
	return waterTimeArray.map((schedule) => {
		let newSchedule = Moment(schedule, dateTimeFormat).set({
			year: currentDateTime.get('year'),
			month: currentDateTime.get('month'),
			date: currentDateTime.get('date'),
		});

		// Adjust time if it's in the past
		if (newSchedule.isBefore(currentDateTime)) {
			newSchedule = newSchedule.add(24, 'hours');
		}

		return newSchedule.format(dateTimeFormat);
	});
}

export async function scheduleNotifications(scheduleTimes: string[]) {
	try {
		// cancel existing any scheduled notifications
		await notifee.cancelAllNotifications();

		// Ensure the notification channel exists
		await notifee.createChannel({
			id: WATER_TRACKER_NOTIFICATION_CHANNEL,
			name: 'Water Tracker',
			importance: AndroidImportance.HIGH,
		});

		await Promise.all(
			scheduleTimes.map(async (dateStr) => {
				// Parse the date with the specified format
				const date = Moment(dateStr, dateTimeFormat);
				const hours = date.hours();
				const minutes = date.minutes();

				// Check if the parsed time is before the current time
				let triggerDate = Moment().set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
				if (triggerDate.isBefore(Moment())) {
					// If the time is before now, schedule for the next day
					triggerDate = triggerDate.add(1, 'day');
				}

				const trigger: TimestampTrigger = {
					type: TriggerType.TIMESTAMP,
					timestamp: triggerDate.valueOf(),
					repeatFrequency: RepeatFrequency.DAILY,
				};

				// Schedule the notification
				await notifee.createTriggerNotification(
					{
						title: 'Drink Up!',
						body: "Don't forget to rehydrate yourself!",
						android: {
							channelId: WATER_TRACKER_NOTIFICATION_CHANNEL,
						},
					},
					trigger,
				);

				console.log('triggered');
			}),
		);
	} catch (error) {
		console.log('error', error);
	}
}
