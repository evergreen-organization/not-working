import React from 'react';
import Moment from 'moment';

import { dateFormat } from 'configs';

import { MeetingDetailsView } from './component';
import { MEETING_STATUS } from '../../constant/constant';

export const MeetingDetails = ({
	event,
	eventStartDate,
	eventEndDate,
	tooltipVisible,
	onPressPrevious,
	onClose,
}) => {
	const { summary, status, room, location } = event;
	const formatMeetingTime = (time) => Moment(time).format(dateFormat.TIME_12HOURS_AMPM);
	let meetingStartTime = formatMeetingTime(eventStartDate);
	let meetingEndTime = formatMeetingTime(eventEndDate);
	const displayStatus = MEETING_STATUS[status] ?? MEETING_STATUS.DEFAULT;
	let meetingPlace = room || location;

	const props = {
		tooltipVisible,
		onPressPrevious,
		onClose,
		summary,
		meetingStartTime,
		meetingEndTime,
		displayStatus,
		meetingPlace,
		eventEndDate,
	};

	return <MeetingDetailsView {...props} />;
};
