import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaveSummary, fetchStaffLeaveReport } from './thunk';
import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';

const initialState = {
	staffLeaveReportStatus: IDLE,
	leaveSummaryStatus: IDLE,
};

const slice = createSlice({
	name: 'dashboard',
	initialState: initialState,
	reducers: {
		dashboardReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchStaffLeaveReport.pending,
			(state, { payload, meta }) => {
				state.staffLeaveReportStatus = LOADING;
			},
		);
		builder.addCase(
			fetchStaffLeaveReport.rejected,
			(state, { payload, meta }) => {
				state.staffLeaveReportStatus = FAIL;
			},
		);
		builder.addCase(
			fetchStaffLeaveReport.fulfilled,
			(state, { payload, meta }) => {
				state.staffLeaveReportStatus = SUCCESS;
			},
		);
		builder.addCase(fetchLeaveSummary.pending, (state, { payload, meta }) => {
			state.leaveSummary = LOADING;
		});
		builder.addCase(fetchLeaveSummary.rejected, (state, { payload, meta }) => {
			state.leaveSummary = FAIL;
		});
		builder.addCase(fetchLeaveSummary.fulfilled, (state, { payload, meta }) => {
			state.leaveSummary = SUCCESS;
		});
	},
});

export const { dashboardReset } = slice.actions;
export default slice.reducer;
