import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchNotification,
	getNotification,
	getUser,
	notificationRead,
} from 'stores';
import { checkIsDemoFromStaffId, showFailure } from 'utils';
import { LOADING } from 'constant';
import { routes } from 'navigations';

import { NotificationTabAnnouncementView } from './component';

export const NotificationTabAnnouncement = ({ navigation }) => {
	const dispatch = useDispatch();
	const { status, announcementNotifications } = useSelector(getNotification);
	const { staffId } = useSelector(getUser);
	const isDemo = checkIsDemoFromStaffId(staffId);

	useEffect(() => {
		(async () => await handleLoadAnnouncements(0))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLoadMoreAnnouncements = async () => {
		if (isDemo || announcementNotifications.length === 0) {
			return;
		}
		const index = announcementNotifications.length - 1;
		await handleLoadAnnouncements(announcementNotifications[index].contentId);
	};

	const handleRefreshAnnouncements = async () => {
		await handleLoadAnnouncements(0);
	};

	const handleLoadAnnouncements = async (lastId) => {
		const { payload } = await dispatch(
			fetchNotification({
				isIndividual: false,
				lastId: lastId,
				count: 10,
			}),
		);

		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};

	const handleAnnouncementItemPress = (contentId) => {
		dispatch(notificationRead(contentId));
		navigation.navigate(routes.NOTIFICATION_DETAILS);
	};

	const props = {
		handleRefreshAnnouncements,
		handleLoadMoreAnnouncements,
		handleAnnouncementItemPress,
		announcementNotifications,
		loading: status === LOADING,
	};

	return <NotificationTabAnnouncementView {...props} />;
};
