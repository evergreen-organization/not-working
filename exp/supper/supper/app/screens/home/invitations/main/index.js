import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchAttendeeList,
	fetchCheckInStatus,
	fetchEventList,
	fetchEventStatistics,
	fetchSeatingArrangement,
	fetchUncheckInReport,
	getAttendees,
	getBiometric,
	getInvitations,
	submitCheckInAttendees,
	submitCheckInQR,
} from 'stores';
import { fetchPDF } from 'apis';
import { Config } from '../../../../../env';
import { showFailure, showSuccess } from 'utils';
import { LOADING } from 'constant';

import InvitationsView from './component';
import { formatAttendeeList, generateQrValue, getCheckInTime, isLateCheckIn } from '../utils';
import { CHECK_IN_MODE, INVITATIONS_MODAL } from '../constant';
import { DATE_YMD } from 'configs/dateFormat';

export const Invitations = ({ navigation }) => {
	const dispatch = useDispatch();
	const { status, statistics, pendingAttendees } = useSelector(getInvitations) || {};
	const { userid } = useSelector(getBiometric) || {};
	const attendeeList = useSelector(getAttendees);

	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedPDF, setSelectedPDF] = useState({ uri: '' });
	const [eventList, setEventList] = useState([]);
	const [selectedAttendee, setSelectedAttendee] = useState({});
	const [selectedAttendeeCheckInStatus, setSelectedAttendeeCheckInStatus] = useState(false);
	const [selectedAttendeeSeatingArrangement, setSelectedAttendeeSeatingArrangement] = useState({});
	const [qrValue, setQRValue] = useState('n/a');
	const [qrStringData, setQRStringData] = useState('');
	const [checkInMode, setCheckInMode] = useState('');
	const [modalType, setModalType] = useState(null);

	const carouselRef = useRef(null);
	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setActiveIndex(viewableItems[0].index);
	}).current;

	useEffect(() => {
		(async () => {
			await loadEventList();
		})();
	}, []);

	useEffect(() => {
		(async () => {
			await loadEvent();
		})();
	}, [activeIndex]);

	const loadEvent = async () => {
		if (eventList?.length === 0 || status === LOADING) {
			return;
		}
		await reloadAttendees();
	};

	const loadEventList = async () => {
		const { payload } = await dispatch(
			fetchEventList({
				searchDate: Moment().format(DATE_YMD),
				searchDaysRange: 300,
			}),
		);
		const { data, problem } = payload || {};
		if (problem) {
			return showFailure(problem);
		}
		if (data?.length > 0) {
			setEventList(data);
			await loadAttendeeList(data[activeIndex]);
			await loadPendingAttendeeList(data[activeIndex]);
			await loadEventStatistics(data[activeIndex]);
		}
	};

	const reloadAttendees = async () => {
		await loadAttendeeList(eventList[activeIndex]);
		await loadPendingAttendeeList(eventList[activeIndex]);
		await loadEventStatistics(eventList[activeIndex]);
	};

	const loadAttendeeList = async (event) => {
		const { isAdmin, eventId } = event || {};
		if (!isAdmin) {
			return;
		}
		await dispatch(fetchAttendeeList({ eventId, uncheckIn: false }));
	};

	const loadPendingAttendeeList = async (event) => {
		const { isAdmin, eventId } = event || {};
		if (!isAdmin) {
			return;
		}
		await dispatch(fetchUncheckInReport({ eventId }));
	};

	const loadEventStatistics = async (event) => {
		const { isAdmin, eventId } = event || {};
		if (!isAdmin) {
			return;
		}
		await dispatch(fetchEventStatistics({ eventId }));
	};

	const reloadSeatingArrangement = async () => {
		const { payload } = await dispatch(
			fetchSeatingArrangement({
				eventId: eventList[activeIndex]?.eventId,
				id: eventList[activeIndex]?.id,
			}),
		);
		if (payload?.problem) {
			return showFailure(payload.problem);
		}
		if (!payload?.data.checkInStatus) {
			return;
		}
		const list = eventList.map((item) => {
			return {
				...item,
				checkInStatus: item.eventId === eventList[activeIndex]?.eventId ? true : item.checkInStatus,
			};
		});
		setEventList(list);
	};

	const handleAttendeeModal = () => {
		setModalType(INVITATIONS_MODAL.ATTENDEES);
		setQRValue(generateQrValue({ staffId: userid.substr(3, 5) }));
	};

	const handleShowPDF = async () => {
		const url = `https://${Config.API}/documents/event/${eventList[activeIndex]?.eventId}.pdf`;
		const response = await fetchPDF(url);
		if (!response?.ok) {
			return showFailure('Failed to fetch PDF. Please try again later.');
		}
		setModalType(INVITATIONS_MODAL.PDF);
		setSelectedPDF({
			uri: 'data:application/pdf;base64,' + response.data,
			cache: true,
		});
	};

	const handleAdminModal = () => setModalType(INVITATIONS_MODAL.ADMIN);

	const readQR = (e) => {
		closeModal();
		if (e.data.lastIndexOf('|') !== 20) {
			return showFailure('Error', 'Invalid QR');
		}
		setCheckInMode(CHECK_IN_MODE.QR);
		setQRStringData(e.data);
		if (!isLateCheckIn(eventList[activeIndex].endCheckInTime)) {
			return handleSubmitQRCheckIn();
		}
		setModalType(INVITATIONS_MODAL.REASON);
	};

	const handleSubmitQRCheckIn = async (reason) => {
		const { payload } = await dispatch(
			submitCheckInQR({
				qrString: qrStringData,
				eventId: eventList[activeIndex]?.eventId,
				checkInDateTime: getCheckInTime(),
				lateCheckInReason: reason ?? '',
			}),
		);
		const { data, problem } = payload || {};
		closeModal();
		if (problem) {
			return showFailure('Error', problem);
		}
		showSuccess('Success', data?.status);
	};

	const handleSelectAttendee = async (attendee) => {
		setSelectedAttendee(attendee);
		const { payload } = await dispatch(
			fetchCheckInStatus({
				eventId: eventList[activeIndex]?.eventId,
				id: attendee.Id,
			}),
		);
		const { data, problem } = payload || {};
		if (problem) {
			return;
		}
		setSelectedAttendeeCheckInStatus(data.checkInStatus);
		await loadSeatingArrangement(attendee);
	};

	const loadSeatingArrangement = async (attendee) => {
		const { payload } = await dispatch(
			fetchSeatingArrangement({
				eventId: eventList[activeIndex]?.eventId,
				id: attendee.Id,
			}),
		);
		const { data, problem } = payload || {};
		if (problem) {
			return showFailure(problem);
		}
		setSelectedAttendeeSeatingArrangement(data);
	};

	const handleManualCheckIn = () => {
		if (!isLateCheckIn(eventList[activeIndex]?.endCheckInTime)) {
			return handleSubmitManualCheckIn();
		}
		setCheckInMode(CHECK_IN_MODE.MANUAL);
		setModalType(INVITATIONS_MODAL.REASON);
	};

	const handleSubmitManualCheckIn = async (reason) => {
		const attendee = {
			id: selectedAttendee.Id,
			eventId: eventList[activeIndex]?.eventId,
			qrDateTime: getCheckInTime(),
			checkInDateTime: getCheckInTime(),
			lateCheckInReason: reason ?? '',
		};
		const { payload } = await dispatch(submitCheckInAttendees({ attendees: [attendee] }));
		const { data, problem } = payload || {};

		if (modalType === INVITATIONS_MODAL.REASON) {
			closeModal();
		}

		if (problem) {
			return showFailure('Error', problem);
		}
		if (data?.checkInAttendees[0]?.checkInStatus !== 'Success') {
			return Alert.alert('Failed', 'Please try again');
		}
		Alert.alert('Success', 'Checked in for: ' + data?.checkInAttendees[0]?.staffName);
		await loadSeatingArrangement(selectedAttendee);
		setSelectedAttendeeCheckInStatus(true);
	};

	const handleSubmitReason = (reason) =>
		checkInMode === CHECK_IN_MODE.QR
			? handleSubmitQRCheckIn(reason)
			: handleSubmitManualCheckIn(reason);

	const onFeedbackPress = () => setModalType(INVITATIONS_MODAL.WEBVIEW);

	const onPendingPress = () => setModalType(INVITATIONS_MODAL.PENDING_ATTENDEES);

	const closeModal = () => setModalType(null);

	const refs = {
		viewableItemsChanged,
		carouselRef,
	};

	const props = {
		handleAdminModal,
		handleAttendeeModal,
		reloadAttendees,
		reloadSeatingArrangement,
		handleShowPDF,
		readQR,
		handleSelectAttendee,
		handleManualCheckIn,
		handleSubmitReason,
		onPendingPress,
		onFeedbackPress,
		closeModal,
		modalType,
		loading: status === LOADING,
		eventList,
		statistics,
		pendingAttendees,
		attendeeList: formatAttendeeList(attendeeList),
		selectedAttendee,
		selectedAttendeeCheckInStatus,
		selectedAttendeeSeatingArrangement,
		selectedPDF,
		qrValue,
		navigation,
		currentItem: eventList[activeIndex],
	};

	return <InvitationsView {...props} ref={refs} />;
};
