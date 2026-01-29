import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

import { fetchLeaveSummary, fetchStaffLeaveReport, getDashboard } from 'stores';
import { LOADING } from 'constant';
import { dateFormat } from 'configs';

import { OVERALL_LEAVE_TYPE } from './constant';
import { chartStyles } from './styles';
import {
	formatSelectedLeaveReportDate,
	formatStaffLeaveReportData,
	formatStaffLeaveReportLegend,
} from './utils';
import DashboardComp from './component';
import { showFailure } from 'utils';

const today = Moment(new Date()).format(dateFormat.DATE_YMD);
export const Dashboard = () => {
	const dispatch = useDispatch();
	const { staffLeaveReportStatus, leaveSummaryStatus } =
		useSelector(getDashboard);
	const barChart = useRef();

	const [customLegend, setCustomLegend] = useState([]);
	const [modalDivisionVisible, setModalDivisionVisible] = useState(false);
	const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(today);
	const [divisionLeaveStatistic, setDivisionLeaveStatistic] = useState({
		divisionName: '',
		staffList: [],
	});
	const [xAxisLine, setXAxisLine] = useState({});
	const [yAxisLine, setYAxisLine] = useState({});
	const [dataLine, setDataLine] = useState({});
	const [xAxisBar, setXAxisBar] = useState({});
	const [yAxisBar, setYAxisBar] = useState({});
	const [dataBar, setDataBar] = useState({});
	const [chartSelected, setChartSelected] = useState(OVERALL_LEAVE_TYPE[0]);

	const handleToggleCalendarModal = () =>
		setModalCalendarVisible(!modalCalendarVisible);

	useEffect(() => {
		(async () => {
			await getStaffLeaveReport(today);
			await getLeaveRange(7);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getLeaveRange = async (noOfDays) => {
		const { payload } = await dispatch(fetchLeaveSummary({ noOfDays }));
		const { data } = payload || {};

		if (payload.problem) {
			return showFailure(payload.problem);
		}

		const { totals, dates } = data || {};
		setXAxisLine(chartStyles.setLeaveRangeAxisX(dates));

		if (totals.length > 0) {
			setYAxisLine(chartStyles.setLeaveRangeAxisY(totals));
		}
		setDataLine(chartStyles.setLeaveRangeDataLine(totals));
	};

	const handleOverallLeaveChartTypePress = async (item) => {
		if (chartSelected.id === item.id) {
			return;
		}
		setChartSelected(item);
		await getLeaveRange(item.numberOfDays);
	};

	const getStaffLeaveReport = async (date) => {
		const { payload } = await dispatch(fetchStaffLeaveReport({ date }));
		const { data } = payload || {};

		if (payload.problem) {
			return showFailure(payload.problem);
		}

		setCustomLegend(formatStaffLeaveReportLegend(data));

		const formattedDatasets = formatStaffLeaveReportData(data);

		setXAxisBar(chartStyles.setStaffLeaveReportXAxisBar(data.length));
		setYAxisBar(chartStyles.setStaffLeaveReportYAxisBar);
		setDataBar(chartStyles.setStaffLeaveReportDataBar(formattedDatasets));
	};

	const onDayPress = async (day) => {
		let date = formatSelectedLeaveReportDate(day);
		await getStaffLeaveReport(date);

		setModalCalendarVisible(false);
		setSelectedDate(date);
	};

	const openModalDivision = () => {
		if (barChart.current) {
			barChart.current.highlights([]);
		}
		setModalDivisionVisible(true);
	};

	const closeModalDivision = () => {
		if (barChart.current) {
			barChart.current.highlights([]);
		}
		setModalDivisionVisible(false);
	};

	const handleOnSelectBar = (event) => {
		if (event.nativeEvent.x === undefined) {
			closeModalDivision();
		}
		event.persist();
		const clickedBar = parseInt(event.nativeEvent.x);
		const divisionName =
			event._targetInst.memoizedProps.data.dataSets[clickedBar].label;
		const staffList =
			event._targetInst.memoizedProps.data.dataSets[clickedBar].staffList;

		setDivisionLeaveStatistic({
			divisionName,
			staffList,
		});
		openModalDivision();
	};

	const onRefresh = async () => {
		if (staffLeaveReportStatus === LOADING || leaveSummaryStatus === LOADING) {
			return;
		}
		await getLeaveRange(chartSelected.numberOfDays);
		await getStaffLeaveReport(selectedDate);
	};

	const staffLeaveChartProps = {
		selectedDate,
		dataBar,
		customLegend,
		xAxisBar,
		yAxisBar,
		staffLeaveReportLoading: staffLeaveReportStatus === LOADING,
	};

	const overallLeaveChartProps = {
		chartSelected,
		dataLine,
		xAxisLine,
		yAxisLine,
		leaveSummaryLoading: leaveSummaryStatus === LOADING,
	};

	const props = {
		onRefresh,
		handleOnSelectBar,
		handleToggleCalendarModal,
		handleOverallLeaveChartTypePress,
		closeModalDivision,
		onDayPress,
		staffLeaveChartProps,
		overallLeaveChartProps,
		divisionLeaveStatistic,
		modalDivisionVisible,
		modalCalendarVisible,
		refreshing:
			leaveSummaryStatus === LOADING || staffLeaveReportStatus === LOADING,
	};

	return <DashboardComp {...props} ref={barChart} />;
};
