import { createSlice } from '@reduxjs/toolkit';
import {
	fetchAttendeeList,
	fetchEventList,
	fetchEventStatistics,
	fetchUncheckInReport,
} from './thunk';
import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';

const initialState = {
	invitations: [],
	attendees: [],
	pendingAttendees: [],
	statistics: {},
	status: IDLE,
};

const slice = createSlice({
	name: 'invitations',
	initialState: initialState,
	reducers: {
		invitationsReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEventList.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchEventList.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
		});
		builder.addCase(fetchEventList.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
		builder.addCase(fetchAttendeeList.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.attendees = payload.data;
		});
		builder.addCase(fetchEventStatistics.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.statistics = payload.data;
		});
		builder.addCase(fetchUncheckInReport.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.pendingAttendees = payload.data.departments;
		});
	},
});

export const { invitationsReset } = slice.actions;
export default slice.reducer;
