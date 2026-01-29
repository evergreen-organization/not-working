import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMeetings, tooltipGuideUpdated } from 'stores';
import { getYear } from 'utils';
import Moment from 'moment';

import { MeetingItemView } from './component';
import { formatDateTime } from '../utils/utils';

export const MeetingItem = ({
	index,
	event,
	meetingList,
	onMeetingDatePress,
	onGetMeetingAttendees,
}) => {
	const selectedRow = useRef();
	const [swipeableItem] = useState([]);
	const { tooltipGuide } = useSelector(getMeetings);
	const dispatch = useDispatch();
	const [tooltip1, setTooltip1] = useState(false);
	const [tooltip2, setTooltip2] = useState(false);
	const eventStartDate = formatDateTime(event.start);
	const eventEndDate = formatDateTime(event.end);
	const prevEventDate = Moment(meetingList[index - 1]?.start.date).valueOf();
	const getMarginTop =
		index !== 0 && getYear(eventStartDate) !== getYear(prevEventDate)
			? 10
			: -12;
	const year = Moment(eventStartDate).year() > Moment(prevEventDate).year();

	useEffect(() => {
		if (tooltipGuide) {
			setTimeout(() => setTooltip1(tooltipGuide), 500);
		}
	}, [tooltipGuide]);

	const handleSkip = () => {
		setTooltip1(false);
		setTooltip2(false);
		dispatch(tooltipGuideUpdated(false));
	};

	const handleCloseDateTooltip = () => {
		setTooltip1(false);
		setTooltip2(true);
	};

	const handlePrevious = () => {
		setTooltip1(true);
		setTooltip2(false);
	};

	const handleClose = () => {
		setTooltip2(false);
		dispatch(tooltipGuideUpdated(false));
	};

	const handleSwipeLeftWillOpen = (_swipeableItem) => {
		if (!selectedRow.current || selectedRow.current === _swipeableItem) {
			return;
		}
		selectedRow.current.close();
	};

	const handleSwipeToOpen = () => (selectedRow.current = swipeableItem[index]);

	const props = {
		handleSwipeToOpen,
		handleSwipeLeftWillOpen,
		handleSkip,
		handleCloseDateTooltip,
		handlePrevious,
		handleClose,
		onMeetingDatePress,
		onGetMeetingAttendees,
		year,
		eventStartDate,
		index,
		getMarginTop,
		tooltip1,
		swipeableItem,
		event,
		eventEndDate,
		tooltip2,
	};

	return <MeetingItemView {...props} />;
};
