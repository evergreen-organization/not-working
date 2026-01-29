import Moment from 'moment/moment';

const BOTTOM_PADDING = 20;

export const formatDateTime = (dateTime) => {
	if (!dateTime) {
		return null;
	}
	if (dateTime.time) {
		return Moment.utc(`${dateTime.date} ${dateTime.time}`).local();
	}
	return Moment(dateTime.date);
};

export const isCloseToBottom = ({
	layoutMeasurement,
	contentOffset,
	contentSize,
}) =>
	layoutMeasurement.height + contentOffset.y >=
	contentSize.height - BOTTOM_PADDING;

export const checkDuplicateFirstItem = ({ meetings, currentList }) =>
	currentList.find(
		(meeting) =>
			meeting.id === meetings[0].id &&
			meeting.start.date === meetings[0].start.date,
	);

export const checkLoadingMoreMeetings = ({ meetings, currentList }) => {
	let tempList = [...meetings];
	const isDuplicateFound = checkDuplicateFirstItem({ meetings, currentList });
	if (isDuplicateFound) {
		tempList.splice(0, 1);
	}
	return tempList.length !== 0;
};

export const getLatestMeetingEvent = (data) => {
	const now = Moment();
	return data?.find((item) => formatDateTime(item.start).isAfter(now));
};
