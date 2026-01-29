import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchNotification,
	getNotification,
	getUser,
	notificationRead,
} from 'stores';
import { checkIsDemoFromStaffId, showFailure } from 'utils';
import { routes } from 'navigations';
import { LOADING } from 'constant';

import { NotificationTabPersonalView } from './component';

export const NotificationTabPersonal = ({ navigation }) => {
	const dispatch = useDispatch();
	const { status, personalNotifications } = useSelector(getNotification);
	const { staffId } = useSelector(getUser);
	const isDemo = checkIsDemoFromStaffId(staffId);

	useEffect(() => {
		(async () => await handleLoadPersonalNotifications(0))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRefreshPersonalNotifications = async () => {
		await handleLoadPersonalNotifications(0);
	};
	const handleLoadMorePersonalNotifications = async () => {
		if (isDemo || personalNotifications.length === 0) {
			return;
		}

		const index = personalNotifications.length - 1;
		await handleLoadPersonalNotifications(
			personalNotifications[index].contentId,
		);
	};

	const handleLoadPersonalNotifications = async (lastId) => {
		const { payload } = await dispatch(
			fetchNotification({
				isIndividual: true,
				lastId: lastId,
				count: 10,
			}),
		);
		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};

	const handleNotificationItemPress = (contentId) => {
		dispatch(notificationRead(contentId));
		navigation.navigate(routes.NOTIFICATION_DETAILS);
	};

	const props = {
		loading: status === LOADING,
		handleRefreshPersonalNotifications,
		handleLoadMorePersonalNotifications,
		handleNotificationItemPress,
		personalNotifications,
	};

	return <NotificationTabPersonalView {...props} />;
};
