import Moment from 'moment';
import { DATE_YMD } from '../configs/dateFormat';

export const dateTimeUTCToLocalTime = (date, time) =>
	Moment.utc(date + ' ' + time).local();

export const getYear = (date) => Moment(date).format(DATE_YMD);

export const displayFullDateTime = (date) =>
	Moment(date).format('D MMM YYYY h:mma');

export const getDurationFromCurrentTime = (time, format) => {
	let diff = Moment().diff(Moment(time, format));
	let duration = Moment.duration(diff);
	let durationAsMinutes = duration.asMinutes();
	let durationFromCurrentTime = '';

	if (durationAsMinutes >= 10080) {
		durationFromCurrentTime = Math.floor(duration.asWeeks()) + 'w';
	} else if (durationAsMinutes >= 1440) {
		durationFromCurrentTime = Math.floor(duration.asDays()) + 'd';
	} else if (durationAsMinutes >= 60) {
		durationFromCurrentTime = Math.floor(duration.asHours()) + 'h';
	} else {
		durationFromCurrentTime = Math.floor(durationAsMinutes) + 'm';
	}

	return durationFromCurrentTime;
};
