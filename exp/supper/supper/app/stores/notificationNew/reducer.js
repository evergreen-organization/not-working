import { createSlice } from '@reduxjs/toolkit';
import { IDLE } from 'constant';
import { REHYDRATE } from 'redux-persist';
import {
	disableNotification,
	enableNotification,
	enrollNotification,
	fetchAttachmentStatus,
	fetchNotification,
	fetchNotificationDetails,
} from './thunk';

const initialState = {
	personalNotifications: [],
	announcementNotifications: [],
	fcmToken: undefined,
	isEnrolled: false,
	isEnabled: false,
	contentId: undefined,
	title: undefined,
	body: undefined,
	sentTime: undefined,
	type: undefined,
	isClicked: undefined,
	isShown: false,
	status: IDLE,
	pushNotification: {
		contentId: '',
		title: '',
		body: '',
		type: '',
		isClicked: false,
		isShown: false,
		sentTime: '',
	},
	notificationDetails: {
		attachments: [],
		imageUrl: '',
		categoryId: null,
		count: 0,
		createdBy: null,
		datTime: '',
		description: '',
		readStatus: false,
		staffId: null,
		title: '',
		body: '',
		validDuration: null,
	},
};

const slice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		notificationReceived(state, { payload }) {
			state.pushNotification = payload;
		},
		notificationShown(state, { payload }) {
			state.pushNotification.isShown = payload;
		},
		notificationClicked(state, { payload }) {
			state.pushNotification.isClicked = payload;
		},
		notificationRead(state, { payload }) {
			state.pushNotification.contentId = payload;
		},
		notificationPermitted(state, { payload }) {
			state.isPermit = payload;
		},
		notificationEnrolled(state, { payload }) {
			state.isEnrolled = payload;
		},
		notificationEnabled(state, { payload }) {
			state.isEnabled = payload;
		},
		fcmTokenUpdate(state, { payload }) {
			state.fcmToken = payload;
		},
		notificationMsgReset(state) {
			state.pushNotification = initialState.pushNotification;
		},
		notificationReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(REHYDRATE, (state, { payload }) => {
				if (payload?.notificationNew !== undefined) {
					return payload.notificationNew;
				}
			})
			.addCase(enrollNotification.fulfilled, (state) => {})
			.addCase(enrollNotification.rejected, (state) => {
				state.isEnabled = false;
				state.isEnrolled = false;
			})
			.addCase(enrollNotification.pending, (state) => {
				state.isEnabled = true;
				state.isEnrolled = true;
			})
			.addCase(enableNotification.fulfilled, (state) => {})
			.addCase(enableNotification.rejected, (state) => {
				state.isEnabled = false;
			})
			.addCase(enableNotification.pending, (state) => {
				state.isEnabled = true;
			})
			.addCase(disableNotification.fulfilled, (state) => {})
			.addCase(disableNotification.rejected, (state) => {
				state.isEnabled = true;
			})
			.addCase(disableNotification.pending, (state) => {
				state.isEnabled = false;
			})
			.addCase(fetchNotification.pending, (state) => {
				state.status = 'LOADING';
			})
			.addCase(fetchNotification.rejected, (state) => {
				state.status = 'FAIL';
			})
			.addCase(fetchNotification.fulfilled, (state, { payload, meta }) => {
				state.status = 'SUCCESS';
				const { isIndividual, lastId } = meta.arg;
				const notificationType = isIndividual
					? 'personalNotifications'
					: 'announcementNotifications';

				if (lastId === 0) {
					state[notificationType] = payload.data;
				} else {
					state[notificationType].push(...payload.data);
				}
			})
			.addCase(fetchNotificationDetails.rejected, (state) => {
				state.status = 'FAIL';
			})
			.addCase(fetchNotificationDetails.pending, (state) => {
				state.status = 'PENDING';
			})
			.addCase(fetchNotificationDetails.fulfilled, (state, { payload, meta }) => {
				state.status = 'SUCCESS';
				const { contentId } = meta.arg;
				const { title, body } = state.pushNotification;

				if (!contentId) {
					state.notificationDetails = {
						title,
						body,
					};
				} else {
					state.notificationDetails = payload.data;
				}
			})
			.addCase(fetchAttachmentStatus.pending, (state) => {
				state.status = 'PENDING';
			})
			.addCase(fetchAttachmentStatus.rejected, (state) => {
				state.status = 'FAIL';
			})
			.addCase(fetchAttachmentStatus.fulfilled, (state) => {
				state.status = 'SUCCESS';
				const temp = state.notificationDetails;
				temp.attachments[0].readStatus = true;
				state.notificationDetails = temp;
			});
	},
});

export const {
	notificationReceived,
	notificationClicked,
	notificationRead,
	notificationPermitted,
	notificationEnrolled,
	notificationEnabled,
	fcmTokenUpdate,
	notificationMsgReset,
	notificationReset,
	notificationShown,
} = slice.actions;
export default slice.reducer;
