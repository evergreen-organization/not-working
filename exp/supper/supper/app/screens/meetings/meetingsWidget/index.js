import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { fetchMeetingList } from 'stores';
import { showFailure } from 'utils';
import { showFestive } from 'constant';
import { dateFormat } from 'components';
import { formatDateTime, getLatestMeetingEvent } from '../utils/utils';

import { FestiveMeetingsWidgetView } from './componentFestive';
import { MeetingsWidgetView } from './component';

const today = Moment();
const todayUTC = today.add(-8, 'h').format(dateFormat.DATE_TIME);

export const MeetingsWidget = ({ onPress }) => {
	const dispatch = useDispatch();
	const [event, setEvent] = useState(null);

	useEffect(() => {
		(async () => await getLatestSchedule())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getLatestSchedule = async () => {
		const { payload } = await dispatch(fetchMeetingList({ startDate: todayUTC }));
		const { data, problem } = payload || {};
		if (problem) {
			return showFailure(problem);
		}
		const latestMeetingEvent = getLatestMeetingEvent(data.events);
		if (!latestMeetingEvent || _.isEmpty(latestMeetingEvent)) {
			return;
		}
		setEvent({
			date: formatDateTime(latestMeetingEvent.start),
			description: latestMeetingEvent.summary,
		});
	};

	const props = {
		onPress,
		event,
	};

	if (showFestive) {
		return <FestiveMeetingsWidgetView {...props} />;
	}
	return <MeetingsWidgetView {...props} />;
};
