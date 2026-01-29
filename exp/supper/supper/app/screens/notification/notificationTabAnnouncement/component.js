import React from 'react';
import { NotificationList } from '../components';

export const NotificationTabAnnouncementView = ({
	handleRefreshAnnouncements,
	handleLoadMoreAnnouncements,
	handleAnnouncementItemPress,
	loading,
	announcementNotifications,
}) => {
	return (
		<NotificationList
			data={announcementNotifications}
			refreshing={loading}
			onRefresh={handleRefreshAnnouncements}
			onItemPress={handleAnnouncementItemPress}
			onEndReached={handleLoadMoreAnnouncements}
			label={'Announcements'}
		/>
	);
};
