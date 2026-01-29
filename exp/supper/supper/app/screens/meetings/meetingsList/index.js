import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { showFailure } from 'utils';
import { LOADING } from 'constant';
import { routes } from 'navigations';
import {
	fetchMeetingList,
	getMeetings,
	updateCurrentMeetingList,
	updateMeetingDates,
} from 'stores';
import { dateFormat } from 'components';

import { MeetingListView } from './component';
import {
	checkDuplicateFirstItem,
	checkLoadingMoreMeetings,
	isCloseToBottom,
	formatDateTime,
} from '../utils/utils';

/* >>> get today's date and start hour from midnight AM*/
const today = Moment().startOf('day');
const todayUTC = today.add(-8, 'h').format(dateFormat.DATE_TIME);

export const MeetingList = ({ navigation }) => {
	const dispatch = useDispatch();
	const { status, meetings, requestDate, replyDate, lastEventStartDate } =
		useSelector(getMeetings);
	const [reachEnd, setReachEnd] = useState(false);
	const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');

	useEffect(() => {
		(async () => await getMeeting(todayUTC))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!selectedDate) {
			return;
		}
		checkAvailableMeeting();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replyDate, requestDate]);

	const toggleModalCalendar = () =>
		setModalCalendarVisible(!modalCalendarVisible);
	const handleRefresh = () => getMeeting(todayUTC).then();
	const handleScroll = ({ nativeEvent }) =>
		isCloseToBottom(nativeEvent) &&
		!reachEnd &&
		status !== LOADING &&
		getMeeting(lastEventStartDate, true).then();
	const handleAttendees = async (event) =>
		navigation.navigate(routes.MEETING_DETAILS, { eventId: event.href });

	const getMeeting = async (startDate, reload = false) => {
		if (!reload) {
			setReachEnd(false);
		}

		const { payload } = await dispatch(fetchMeetingList({ startDate }));

		if (payload.problem) {
			return showFailure(payload.problem);
		}

		const { events } = payload.data;

		/* check if there are same value that just get from backend is exist in the current list*/
		let eventList = reload ? meetings : [];
		/*if found then delete it from the latest list*/
		const found = checkDuplicateFirstItem({
			meetings: events,
			currentList: eventList,
		});

		if (found) {
			setReachEnd(true);
		}

		/* check if events still have value after splicing */
		/* this checker is for loading more meeting item  */
		if (
			!checkLoadingMoreMeetings({ meetings: events, currentList: eventList })
		) {
			return;
		}

		const requestDate = Moment(startDate).format(dateFormat.DATE_YMD);
		const replyDate = Moment(formatDateTime(events[0].start)).format(
			dateFormat.DATE_YMD,
		);

		const lastEventStartDate = Moment(
			`${events[events?.length - 1]?.start?.date} ${
				events[events?.length - 1].start?.time
			}`,
			dateFormat.DATE_TIME,
		)
			.add(found ? 1 : 0, 'second')
			.format(dateFormat.DATE_TIME);
		dispatch(updateCurrentMeetingList(eventList.concat(events)));
		dispatch(
			updateMeetingDates({ replyDate, requestDate, lastEventStartDate }),
		);
	};

	/* CalendarList */
	const handleDateSelected = async (selectedDay) => {
		const selectedDate_YMD = Moment(selectedDay.dateString).format(
			dateFormat.DATE_YMD,
		);
		setSelectedDate(selectedDate_YMD);
		const todayYMD = Moment().format(dateFormat.DATE_YMD);
		const dateTime = Moment(selectedDay.dateString).format(
			dateFormat.DATE_TIME,
		);

		if (status === LOADING) {
			return toggleModalCalendar();
		}
		await getMeeting(
			selectedDate_YMD === todayYMD ? todayYMD : dateTime,
			false,
		);
	};

	const checkAvailableMeeting = () => {
		/*check if there is meeting on the selected date*/
		if (selectedDate === replyDate && selectedDate === requestDate) {
			return toggleModalCalendar();
		}
		if (replyDate !== requestDate) {
			alert(
				'No meeting on ' +
					Moment(requestDate).format(dateFormat.DATE_TIME_DISPLAY) +
					'. Upcoming meetings from ' +
					Moment(replyDate).format(dateFormat.DATE_TIME_DISPLAY) +
					' onwards are shown.',
			);
		}
		toggleModalCalendar();
	};

	const props = {
		toggleModalCalendar,
		handleAttendees,
		handleScroll,
		handleRefresh,
		handleDateSelected,
		meetings,
		reachEnd,
		modalCalendarVisible,
		loading: status === LOADING,
	};

	return <MeetingListView {...props} />;
};
