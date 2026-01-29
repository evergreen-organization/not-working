import { createSelector } from '@reduxjs/toolkit';

export const getContentId = createSelector(
	(state) => state.contentId,
	(contentId) => contentId,
);

export const getNotification = createSelector(
	(state) => state.notificationNew,
	(notification) => notification,
);
