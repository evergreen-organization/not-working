import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { createSlice } from '@reduxjs/toolkit';
import { fetchMeetingDetails, fetchMeetingList } from './thunk';

const initialState = {
	tooltipGuide: false,
	status: IDLE,
	meetings: [],
	replyDate: '',
	requestDate: '',
	lastEventStartDate: '',
	meetingDetails: {},
};

const slice = createSlice({
	name: 'meetings',
	initialState,
	reducers: {
		tooltipGuideUpdated(state, { payload }) {
			state.tooltipGuide = payload;
		},
		tooltipGuideReset: (_) => initialState,
		updateCurrentMeetingList(state, { payload }) {
			state.meetings = payload;
		},
		updateMeetingDates(state, { payload }) {
			const { requestDate, replyDate, lastEventStartDate } = payload;
			state.requestDate = requestDate;
			state.replyDate = replyDate;
			state.lastEventStartDate = lastEventStartDate;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMeetingList.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchMeetingList.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
		builder.addCase(fetchMeetingList.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
		});
		builder.addCase(fetchMeetingDetails.pending, (state, { payload }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchMeetingDetails.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
		builder.addCase(fetchMeetingDetails.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.meetingDetails = payload.data;
		});
	},
});

export const {
	tooltipGuideUpdated,
	updateCurrentMeetingList,
	updateMeetingDates,
} = slice.actions;
export default slice.reducer;
