import { createSlice } from '@reduxjs/toolkit';
import {
	fetchCompletedCourse,
	fetchComplianceStatus,
	fetchPendingCourse,
	fetchTrainingReminder,
} from './thunk';
import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';

const initialState = {
	pendingCourse: 0,
	course: [],
	trainingReminder: [],
	eLearning: 0,
	classroom: 0,
	digital: 0,
	complied: 0,
	pending: 0,
	status: IDLE,
};

const slice = createSlice({
	name: 'training',
	initialState: initialState,
	reducers: {
		trainingReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPendingCourse.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchPendingCourse.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.pendingCourse = payload.data;
		});
		builder.addCase(fetchPendingCourse.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
		builder.addCase(fetchCompletedCourse.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchCompletedCourse.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.course = payload.data;
		});
		builder.addCase(fetchCompletedCourse.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
		builder.addCase(fetchTrainingReminder.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchTrainingReminder.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.trainingReminder = payload.data;
		});
		builder.addCase(fetchTrainingReminder.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
		builder.addCase(fetchComplianceStatus.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchComplianceStatus.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.eLearning = payload.data[0].totalElearningCreditDays;
			state.classroom = payload.data[0].totalClassRoomCreditDays;
			state.digital = payload.data[0].totalDigitalCreditDays;
			state.complied = payload.data[0].totalComplied;
			state.pending = payload.data[0].totalPending;
		});
		builder.addCase(fetchComplianceStatus.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
	},
});

export const { trainingReset } = slice.actions;
export default slice.reducer;
