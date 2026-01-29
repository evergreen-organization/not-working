import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { fetchMeetingDetails, getMeetings } from 'stores';
import { showFailure } from 'utils';
import Moment from 'moment/moment';
import dateFormat from '../../../configs/dateFormat';
import { MeetingDetailsView } from './component';
import { useDispatch, useSelector } from 'react-redux';

const yesterday = Moment().add(-1, 'days').format(dateFormat.DATE_TIME);

export const MeetingDetails = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const eventId = route.params.eventId;
	const { meetingDetails } = useSelector(getMeetings);
	const [selected, setSelected] = useState('description');

	useEffect(() => {
		(async () => await getMeetingDetails())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getMeetingDetails = async () => {
		const { payload } = await dispatch(
			fetchMeetingDetails({
				startDate: yesterday,
				href: eventId,
			}),
		);
		const { data, problem } = payload || {};
		if (problem) {
			return showFailure(problem);
		}
		if (data) {
			return;
		}
		Alert.alert(
			'Info',
			'No attendee information',
			[{ text: 'OK', onPress: () => navigation.pop() }],
			{ cancelable: false },
		);
	};

	const handleChipPress = (select) => {
		if (selected === select) {
			return;
		}
		setSelected(select);
	};

	const props = {
		meetingDetails,
		selected,
		setSelected,
		handleChipPress,
	};

	return <MeetingDetailsView {...props} />;
};
