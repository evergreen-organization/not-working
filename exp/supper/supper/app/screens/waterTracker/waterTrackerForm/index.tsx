import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterTrackerData, waterDetailsUpdated } from 'stores';
import { routes } from 'navigations';
import {
	addHour,
	addMiliseconds,
	dateDiff,
	dateFormat,
	dateIsBefore,
	dateTimeFormat,
	subtractHour,
	currentDateTime,
	getSchedule,
	scheduleNotifications,
} from '../utils';
import { WaterTrackerFormView } from './component';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isAlarmPermitted } from 'utils';

export const WaterTrackerForm = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const dispatch = useDispatch();
	const waterTrackerData = useSelector(getWaterTrackerData);
	const formInitialValues = {
		age: '',
		height: '',
		weight: '',
		wakeUpTime: null,
		sleepTime: null,
	};
	const formValidationSchema = Yup.object().shape({
		age: Yup.number().max(130).required().label('Age'),
		height: Yup.number().max(250).required().label('Height'),
		weight: Yup.number().max(200).required().label('Weight'),
		wakeUpTime: Yup.string().required('Wake up time is required').nullable(),
		sleepTime: Yup.string().required('Sleep time is required').nullable(),
	});
	const handleAgeMultiplier = (age: number) => {
		if (age < 30) {
			return 40;
		}
		if (age > 55) {
			return 30;
		}
		return 35;
	};

	const handleFormSubmit = async ({ age, height, weight, wakeUpTime, sleepTime }: any) => {
		const ageMultiplier = handleAgeMultiplier(age);
		let ageConversionMetric = (weight * ageMultiplier) / 28.3;
		let dailyGoal = parseFloat(((ageConversionMetric / 33.8) * 1000).toString()).toFixed(0);

		//BUG: The wakeupTime and sleepTime is saved on the day it enter. Do we need to refresh to today if save again?
		const newSleepTime = dateIsBefore(sleepTime, wakeUpTime)
			? addHour(sleepTime, 24).format(dateTimeFormat)
			: sleepTime;
		const halfDayTime = dateDiff(newSleepTime, wakeUpTime) * 0.5;

		const scheduleMorningWaterTime = addHour(wakeUpTime, 2);
		const scheduleDayWaterTime = addMiliseconds(wakeUpTime, halfDayTime);
		const scheduleNightWaterTime = dateIsBefore(wakeUpTime, newSleepTime)
			? subtractHour(newSleepTime, 4)
			: addHour(newSleepTime, 20);

		const timeSchedule = getSchedule([
			scheduleMorningWaterTime,
			scheduleDayWaterTime,
			scheduleNightWaterTime,
		]);

		const dataToStore = {
			age,
			height,
			weight,
			wakeUpTime,
			sleepTime,
			dailyGoal,
			timeSchedule,
			dateRecorded: currentDateTime.format(dateFormat),
			waterIntakeVolume: waterTrackerData.waterIntakeVolume ?? 200,
			totalIntakeValue: 0,
			enableReminder: true,
		};

		const isSafeToNotify = await isAlarmPermitted();

		if (isSafeToNotify) {
			dispatch(waterDetailsUpdated(dataToStore));
			await scheduleNotifications(timeSchedule);
		} else {
			dispatch(
				waterDetailsUpdated({
					...dataToStore,
					enableReminder: false,
				}),
			);
		}

		navigation.navigate(routes.WATER_TRACKER);
	};

	const props = {
		handleFormSubmit,
		formInitialValues,
		formValidationSchema,
	};

	return <WaterTrackerFormView {...props} />;
};
