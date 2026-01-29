import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'moment';
import { fetchEventList } from 'stores';
import { EventsWidgetComp } from './component';
import { showFestive } from 'constant';
import { EventsWidgetFestiveComp } from './componentFestive';
import { DATE_YMD } from 'configs/dateFormat';

export const EventsWidget = ({ onPress }) => {
	const dispatch = useDispatch();
	const [date, setDate] = useState();
	const [description, setDescription] = useState(null);

	useEffect(() => {
		(async () => await getLatestEvent())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getLatestEvent = async () => {
		const { payload } = await dispatch(
			fetchEventList({
				searchDate: Moment().format(DATE_YMD),
				searchDaysRange: 300,
			}),
		);
		const { data, problem } = payload || {};
		if (problem) {
			return;
		}
		if (data?.length > 0) {
			const { eventDateTime, eventDescription } = data[0] || {};
			setDate(eventDateTime);
			setDescription(eventDescription);
		}
	};

	const props = {
		onPress,
		description,
		date,
	};

	if (showFestive) {
		return <EventsWidgetFestiveComp {...props} />;
	}
	return <EventsWidgetComp {...props} />;
};
