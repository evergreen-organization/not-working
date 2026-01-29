import React from 'react';
import { NotificationList } from '../components';

export const NotificationTabPersonalView = ({
	handleRefreshPersonalNotifications,
	handleLoadMorePersonalNotifications,
	handleNotificationItemPress,
	personalNotifications,
	loading,
}) => {
	return (
		<NotificationList
			data={personalNotifications}
			refreshing={loading}
			onRefresh={handleRefreshPersonalNotifications}
			onItemPress={handleNotificationItemPress}
			onEndReached={handleLoadMorePersonalNotifications}
			label={'Personal Notifications'}
		/>
	);
};
