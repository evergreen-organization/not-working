import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RNShake from 'react-native-shake';
import Moment from 'moment';
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';

import {
	dateRecordedUpdated,
	enableReminderUpdated,
	getWaterTrackerData,
	waterIntakeVolumeUpdated,
	totalIntakeValueUpdated,
} from 'stores';
import { dateFormat, dateIsBefore, scheduleNotifications } from '../utils';
import { WaterTrackerView } from './component';
import { routes } from 'navigations';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PERMISSIONS, request } from 'react-native-permissions';
import { isAlarmPermitted } from 'utils';

export const WaterTracker = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const dispatch = useDispatch();
	const store_waterTracker = useSelector(getWaterTrackerData);
	const {
		totalIntakeValue,
		waterIntakeVolume,
		enableReminder,
		timeSchedule,
		dailyGoal,
		dateRecorded,
	} = store_waterTracker;
	const today = Moment().format(dateFormat);

	useEffect(() => {
		retrieveData();
		const subscription = RNShake.addListener(handleDrink);

		return () => {
			subscription.remove();
		};
	}, []);

	const handleDrink = () => {
		dispatch(totalIntakeValueUpdated());
	};

	const promptAlert = (title: string, desc: string) =>
		Alert.alert(title, desc, [{ text: 'OK' }], { cancelable: false });

	const retrieveData = () => {
		if (!dateIsBefore(dateRecorded, today)) {
			return;
		}

		promptAlert(
			totalIntakeValue >= dailyGoal ? 'Well done' : 'Oh No',
			totalIntakeValue >= dailyGoal
				? `You drank ${totalIntakeValue} ml yesterday.`
				: 'You should have drink more water yesterday.',
		);
		dispatch(dateRecordedUpdated({ today }));
	};

	const handleDrinkWaterReminder = async (value: any) => {
		if (!value) {
			await notifee.cancelAllNotifications();
			dispatch(enableReminderUpdated(value));
		} else {
			const isSafeToNotify = await isAlarmPermitted();
			if (isSafeToNotify) {
				await scheduleNotifications(timeSchedule);
				dispatch(enableReminderUpdated(value));
			} else {
				await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
				await notifee.openAlarmPermissionSettings();
			}
		}
	};

	const handleAddWaterIntake = () => {
		return navigation.navigate(routes.WATER_TRACKER_FORM);
	};

	const handleSwitchCup = (size: number) => dispatch(waterIntakeVolumeUpdated(size));

	const props = {
		handleAddWaterIntake,
		handleDrink,
		handleSwitchCup,
		handleDrinkWaterReminder,
		dailyGoal,
		waterIntakeVolume,
		enableReminder,
		timeSchedule,
	};

	return <WaterTrackerView {...props} />;
};
