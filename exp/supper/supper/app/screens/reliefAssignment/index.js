import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { fetchReliefAssignment, getRelief } from 'stores';
import { showFailure } from 'utils';
import { dateFormat } from 'configs';
import ReliefAssignmentView from './component';
import {
	createAgendaDateObject,
	createLeaveMarkDateObject,
	createReliefMarkDateObject,
	createSelectedDayObject,
	formatSelectedDay,
	getDifferentYears,
} from './utils/utils';
import { useDispatch, useSelector } from 'react-redux';

export const ReliefAssignment = () => {
	const dispatch = useDispatch();
	const refAgenda = useRef();
	const startDate = moment().add(-1, 'Y');
	const endDate = moment().add(1, 'Y');

	const { reliefInfo, leaveInfo, status } = useSelector(getRelief);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [dateObj, setDateObj] = useState({});
	const [markedObj, setMarkedObj] = useState({});
	const [markedObjWithoutSelectedDay, setMarkedObjWithoutSelectedDay] =
		useState();
	const [selectedDay, setSelectedDay] = useState(
		moment().format(dateFormat.DATE_YMD),
	);
	const [loadedYears, setLoadedYears] = useState([]);
	const today = { dateString: moment().format(dateFormat.DATE_YMD) };

	useEffect(() => {
		setLoadedYears([moment().year()]);
		(async () => await getReliefAssignment(moment().year()))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		/* scroll agenda to today date */
		const chooseDay = setTimeout(() => {
			refAgenda?.current?.chooseDay(today);
			setRefreshing(false);
			setLoading(false);
		}, 500);
		return () => {
			clearTimeout(chooseDay);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refAgenda, loading, refreshing]);

	useEffect(() => {
		if (selectedDay) {
			const markedObjWithSelectedDay = createSelectedDayObject({
				markedObjWithoutSelectedDay,
				selectedDay,
			});
			setMarkedObj(markedObjWithSelectedDay);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDay]);

	useEffect(() => {
		initDates();
		renderAgendaDateObject();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reliefInfo, leaveInfo]);

	const getReliefAssignment = async (year) => {
		const { payload } = await dispatch(fetchReliefAssignment({ year }));
		setLoading(false);
		setRefreshing(false);
		if (payload.problem) {
			return showFailure('Opps', 'Failed to fetch data');
		}
	};

	const initDates = () => {
		let leaveMarkedObj = createLeaveMarkDateObject({
			leaveInfo: leaveInfo,
			markedObj,
		});
		let reliefMarkedObj = createReliefMarkDateObject({
			reliefInfo: reliefInfo,
			leaveMarkedObj,
		});

		setMarkedObjWithoutSelectedDay(reliefMarkedObj);

		const markedObjWithSelectedDay = createSelectedDayObject({
			markedObjWithoutSelectedDay: reliefMarkedObj,
			selectedDay,
		});

		setMarkedObj(markedObjWithSelectedDay);
	};

	const renderAgendaDateObject = () => {
		const tempDateObj = createAgendaDateObject({
			dateObj,
			endDate,
			startDate,
			reliefInfo,
		});

		setDateObj(tempDateObj);
	};
	const handleRefresh = () => setRefreshing(true);

	const loadItems = async (months) => {
		let years = getDifferentYears({ months, currentYear: loadedYears });
		if (years === 0) {
			return;
		}
		setLoadedYears([...years, ...loadedYears]);

		for (const year of years) {
			await getReliefAssignment(year);
		}
	};

	const onDayPress = (day) => {
		setSelectedDay(formatSelectedDay(day));
	};

	const props = {
		loadItems,
		handleRefresh,
		onDayPress,
		loading,
		dateObj,
		status,
		startDate,
		endDate,
		markedObj,
		refreshing,
	};

	return <ReliefAssignmentView {...props} ref={refAgenda} />;
};
