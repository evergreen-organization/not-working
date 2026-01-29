import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEMO_ACCOUNT_NOT_AVAILABLE, LOADING } from 'constant';
import {
	fetchCompletedCourse,
	fetchPendingCourse,
	fetchTrainingReminder,
	getTraining,
	getUser,
} from 'stores';
import { checkIsDemoFromStaffId, showFailure } from 'utils';
import { routes } from 'navigations';

import { TrainingView } from './component';

export const Training = ({ navigation }) => {
	const dispatch = useDispatch();
	const { pendingCourse, course, trainingReminder, status } =
		useSelector(getTraining);
	const { staffId } = useSelector(getUser);
	const isDemo = checkIsDemoFromStaffId(staffId);
	const [refreshing] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selected, setSelected] = useState(0);

	const isPendingCourse = selected === 0;

	useEffect(() => {
		(async () => await start())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const start = async () => {
		await getReminder();
		await getPendingCourse();
		await getCompletedCourses();
	};

	const getPendingCourse = async () => {
		const { payload } = await dispatch(fetchPendingCourse());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const getCompletedCourses = async () => {
		const { payload } = await dispatch(fetchCompletedCourse());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const getReminder = async () => {
		const { payload } = await dispatch(fetchTrainingReminder());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const handleReminderPressed = () => setIsModalVisible(true);

	const handleCloseModal = () => setIsModalVisible(false);

	const handleStartHerePressed = () => {
		if (isDemo) {
			return showFailure(DEMO_ACCOUNT_NOT_AVAILABLE);
		}
		navigation.navigate(routes.PB_START_HERE);
	};

	const handleCourseTabPressed = (selectedIndex) => setSelected(selectedIndex);

	const handleBack = () => navigation.goBack();

	const props = {
		handleStartHerePressed,
		handleReminderPressed,
		handleCourseTabPressed,
		handleCloseModal,
		start,
		handleBack,
		isPendingCourse,
		refreshing,
		trainingReminder,
		isModalVisible,
		loading: status === LOADING,
		courseList: isPendingCourse ? pendingCourse : course,
	};

	return <TrainingView {...props} />;
};
