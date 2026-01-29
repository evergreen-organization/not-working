import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNotification, notificationClicked } from 'stores';
import { checkPushNotificationPermission } from 'utils';
import { routes } from 'navigations';
import { NotificationTabView } from './component';

export const NotificationTab = ({ navigation }) => {
	const dispatch = useDispatch();
	const { pushNotification } = useSelector(getNotification);
	const { isClicked } = pushNotification;
	const user = useSelector((state) => state.user);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		(async () => await promptNotification())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pushNotification]);

	const promptNotification = async () => {
		const permission = await checkPushNotificationPermission();
		if (!permission) {
			return;
		}
		if (isClicked) {
			setTimeout(() => {
				navigation.navigate(routes.NOTIFICATION_NAVIGATOR, {
					screen: routes.NOTIFICATION_DETAILS,
				});
				dispatch(notificationClicked(false));
			}, 100);
		}
	};

	const handleAddNewNotification = () => {
		setShowModal(false);
		navigation.navigate(routes.NEW_NOTIFICATION);
	};

	const handleCloseNotificationModal = () => setShowModal(false);
	const handleOpenNotificationModal = () => setShowModal(true);

	const props = {
		handleAddNewNotification,
		handleOpenNotificationModal,
		handleCloseNotificationModal,
		showModal,
		user,
	};

	return <NotificationTabView {...props} />;
};
