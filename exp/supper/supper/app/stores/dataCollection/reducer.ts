import Moment from 'moment';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { dateFormat } from 'configs';
import {
	fetchBindDevice,
	fetchGetToken,
	fetchLogin,
	fetchPinLogin,
} from '../login';
import { DATA_COLLECTION } from './constant';
import { submitApplyLeave, submitApproveLeave } from '../leave';
import { fetchMeetingDetails } from '../meeting';
import { fetchClinicList } from '../clinic';
import { addReadingList, getReadingList, updateReadingList } from '../library';
import { submitDataCollectionLogs } from './thunk';
import { addProspect } from '../leadgen360';

export type DataCollectionType = {
	id: string;
	detail: string;
	timeStamp: string;
	activityType: string;
	category: string;
};
export const dataCollectionAdapter = createEntityAdapter<DataCollectionType>({
	selectId: (activities) => activities.id,
});

const initialState = {
	activities: dataCollectionAdapter.getInitialState(),
	latitude: null,
	longitude: null,
};

const slice = createSlice({
	name: 'dataCollection',
	initialState,
	reducers: {
		dataCollectionReset: (state) => {
			state.activities = dataCollectionAdapter.getInitialState();
		},
		updateCurrentLocation: (state, { payload }) => {
			state.latitude = payload?.coords.latitude;
			state.longitude = payload?.coords.longitude;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }: any) => {
			if (payload?.dataCollection !== undefined) {
				return payload.dataCollection;
			}
		});
		builder.addCase(fetchLogin.fulfilled, (state, { meta }: any) => {
			const { deviceId, deviceModel } = meta.arg;
			updateActivitiesData({
				state,
				data: { deviceId, deviceModel },
				activityType: DATA_COLLECTION.LOGIN_ACTIVITY.PASSWORD,
				category: DATA_COLLECTION.CATEGORIES.LOGIN,
			});
		});
		builder.addCase(fetchPinLogin.fulfilled, (state, { meta }: any) => {
			const { username, deviceModel } = meta.arg;
			updateActivitiesData({
				state,
				data: { username, deviceModel },
				activityType: DATA_COLLECTION.LOGIN_ACTIVITY.PIN,
				category: DATA_COLLECTION.CATEGORIES.LOGIN,
			});
		});
		builder.addCase(fetchGetToken.fulfilled, (state, { meta }: any) => {
			const { username, deviceModel } = meta.arg;
			updateActivitiesData({
				state,
				data: { username, deviceModel },
				activityType: DATA_COLLECTION.LOGIN_ACTIVITY.BIOMETRIC,
				category: DATA_COLLECTION.CATEGORIES.LOGIN,
			});
		});
		builder.addCase(fetchBindDevice.fulfilled, (state, { meta }: any) => {
			const { deviceModel: deviceId, deviceName: deviceModel } = meta.arg;

			updateActivitiesData({
				state,
				data: { deviceId, deviceModel },
				activityType: DATA_COLLECTION.LOGIN_ACTIVITY.BIND_DEVICE,
				category: DATA_COLLECTION.CATEGORIES.LOGIN,
			});
		});

		builder.addCase(submitApplyLeave.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.LEAVE_ACTIVITY.APPLY_LEAVE,
				category: DATA_COLLECTION.CATEGORIES.LEAVE,
			});
		});
		builder.addCase(submitApproveLeave.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.LEAVE_ACTIVITY.APPROVE_LEAVE,
				category: DATA_COLLECTION.CATEGORIES.LEAVE,
			});
		});
		builder.addCase(fetchMeetingDetails.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.MEETING_ACTIVITY.MEETING_DETAILS,
				category: DATA_COLLECTION.CATEGORIES.MEETING,
			});
		});
		builder.addCase(fetchClinicList.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.CLINIC_ACTIVITY.GET_CLINICS,
				category: DATA_COLLECTION.CATEGORIES.CLINIC,
			});
		});
		builder.addCase(getReadingList.fulfilled, (state, { payload }) => {
			updateActivitiesData({
				state,
				data: { goals: payload.data.length.toString() },
				activityType: DATA_COLLECTION.LIBRARY_ACTIVITY.GET_READING_LIST,
				category: DATA_COLLECTION.CATEGORIES.READING_GOALS,
			});
		});
		builder.addCase(addReadingList.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.LIBRARY_ACTIVITY.ADD_READING_GOALS,
				category: DATA_COLLECTION.CATEGORIES.READING_GOALS,
			});
		});
		builder.addCase(updateReadingList.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.LIBRARY_ACTIVITY.UPDATE_READING_GOALS,
				category: DATA_COLLECTION.CATEGORIES.READING_GOALS,
			});
		});
		builder.addCase(addProspect.fulfilled, (state, { meta }) => {
			updateActivitiesData({
				state,
				data: meta.arg,
				activityType: DATA_COLLECTION.LEADGEN_ACTIVITY.SUBMIT_LEAD,
				category: DATA_COLLECTION.CATEGORIES.LEADGEN,
			});
		});
		builder.addCase(submitDataCollectionLogs.fulfilled, (state) => {
			state.activities = dataCollectionAdapter.getInitialState();
		});
	},
});

export const { dataCollectionReset, updateCurrentLocation } = slice.actions;
export default slice.reducer;

const updateActivitiesData = ({ state, data, activityType, category }) => {
	const formattedData = {
		id: Moment().format('x'),
		detail: JSON.stringify(data),
		timeStamp: Moment().format(dateFormat.BACKEND_DATE_TIME),
		latitude: state.latitude,
		longitude: state.longitude,
		activityType,
		category,
	};
	dataCollectionAdapter.addOne(state.activities, formattedData);
};
