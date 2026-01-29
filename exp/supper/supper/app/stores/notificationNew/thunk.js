import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { DemoData } from 'constant';
import { checkIsDemoFromState } from 'utils';

export const enrollNotification = createAsyncThunk(
	'Notification/EnrollNotification',
	async ({ platform }, { rejectWithValue, getState }) => {
		const { notificationNew } = getState();
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.Enroll;
		}
		const result = await client.post('/Notification/EnrollNotification', {
			platform,
			token: notificationNew.fcmToken,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const enableNotification = createAsyncThunk(
	'Notification/Enable',
	async (status, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.Enable;
		}
		const result = await client.get('/Notification/Enable');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const disableNotification = createAsyncThunk(
	'Notification/Disable',
	async (status, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.Disable;
		}
		const result = await client.get('/Notification/Disable');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchNotification = createAsyncThunk(
	'fetchNotification',
	async ({ isIndividual, lastId, count }, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.IndividualNotification;
		}
		const result = await client.post('/Notification/GetNotificationList', {
			isIndividual,
			lastId,
			count,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchNotificationDetails = createAsyncThunk(
	'fetchNotificationDetails',
	async ({ contentId }, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.NotificationDetails;
		}
		/* CAS push notification do not have content id	*/
		if (!contentId) {
			return null;
		}
		const result = await client.post(
			'/Notification/GetNotificationByContentId',
			{ contentId },
		);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const createNotification = createAsyncThunk(
	'createNotification',
	async (
		{ categoryId, title, body, description, validDuration },
		{ rejectWithValue, getState },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.CreatePushNotification;
		}
		const result = await client.post('/Notification/CreateNotification', {
			categoryId,
			title,
			body,
			description,
			validDuration,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const pushNotification = createAsyncThunk(
	'pushNotification',
	async ({ contentId, group }, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.PushNotification;
		}
		const result = await client.post('/Notification/MobileSentNotification', {
			contentId,
			group,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchAttachmentStatus = createAsyncThunk(
	'fetchAttachmentStatus',
	async ({ mappingId }, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Notification.PushNotification;
		}
		const result = await client.post('/Notification/AttachmentReadStatus', {
			mappingId,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
