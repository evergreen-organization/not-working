import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { FAIL, LOADING, SUCCESS } from 'constant';
import {
	approveSelfTestResult,
	fetchCompletedSelfTestResults,
	fetchPendingSelfTestResults,
	fetchSelfTestResultImage,
	fetchSelfTestResults,
	rejectSelfTestResult,
	uploadSelfTestResult,
	withdrawSelfTestResult,
} from './thunk';

const initialState = {
	history: {
		status: 'idle',
		list: [],
	},
	uploadStatus: 'idle',
	pending: {
		status: 'idle',
		list: [],
	},
	complete: {
		status: 'idle',
		list: [],
	},
	detail: {
		status: 'idle',
		data: {},
	},
	transaction: {
		status: 'idle',
	},
};

const slice = createSlice({
	name: 'covid19Test',
	initialState,
	reducers: {
		covid19TestReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSelfTestResults.pending, (state) => {
				state.history.status = 'loading';
			})
			.addCase(fetchSelfTestResults.fulfilled, (state, { payload }) => {
				state.history.status = 'succeeded';
				state.history.list = Array.isArray(payload.data) ? payload.data : [];
			})
			.addCase(fetchSelfTestResults.rejected, (state) => {
				state.history.status = 'failed';
			})
			.addCase(fetchSelfTestResultImage.fulfilled, (state, { payload, meta }) => {
				if (payload.data.base64Image) {
					const pendingItem = state.pending.list
						.map((x) => x.data?.find((y) => y.id === meta.arg.id) ?? [])
						.flat(1)[0];
					const completeItem = state.complete.list
						.map((x) => x.data?.find((y) => y.id === meta.arg.id) ?? [])
						.flat(1)[0];
					const historyItem = state.history.list.find((x) => x?.id === meta.arg.id);
					if (pendingItem) {
						pendingItem.base64Image = payload.data.base64Image;
					}
					if (completeItem) {
						completeItem.base64Image = payload.data.base64Image;
					}
					if (historyItem) {
						historyItem.base64Image = payload.data.base64Image;
					}
				}
			})
			.addCase(uploadSelfTestResult.pending, (state) => {
				state.uploadStatus = LOADING;
			})
			.addCase(uploadSelfTestResult.fulfilled, (state, { meta, payload }) => {
				state.uploadStatus = SUCCESS;
				if (payload.data.success) {
					state.history.list.unshift(payload.data);
				}
			})
			.addCase(uploadSelfTestResult.rejected, (state) => {
				state.uploadStatus = FAIL;
			})
			.addCase(fetchPendingSelfTestResults.pending, (state) => {
				state.pending.status = 'loading';
			})
			.addCase(fetchPendingSelfTestResults.fulfilled, (state, { payload }) => {
				state.pending.status = 'succeeded';
				if (Array.isArray(payload.data)) {
					state.pending.list = formatApproveList(payload.data);
				}
			})
			.addCase(fetchPendingSelfTestResults.rejected, (state) => {
				state.pending.status = 'failed';
			})
			.addCase(fetchCompletedSelfTestResults.pending, (state) => {
				state.complete.status = 'loading';
			})
			.addCase(fetchCompletedSelfTestResults.fulfilled, (state, { payload }) => {
				state.complete.status = 'succeeded';
				if (Array.isArray(payload.data)) {
					state.complete.list = formatApproveList(payload.data);
				}
			})
			.addCase(fetchCompletedSelfTestResults.rejected, (state) => {
				state.complete.status = 'failed';
			})
			.addCase(approveSelfTestResult.pending, (state) => {
				state.transaction.status = 'loading';
			})
			.addCase(approveSelfTestResult.fulfilled, (state, { payload }) => {
				state.transaction.status = 'succeeded';
				if (Array.isArray(payload.data.pending)) {
					state.pending.list = formatApproveList(payload.data.pending);
				}
				if (Array.isArray(payload.data.completed)) {
					state.complete.list = formatApproveList(payload.data.completed);
				}
			})
			.addCase(approveSelfTestResult.rejected, (state) => {
				state.transaction.status = 'failed';
			})
			.addCase(rejectSelfTestResult.pending, (state) => {
				state.transaction.status = 'loading';
			})
			.addCase(rejectSelfTestResult.fulfilled, (state, { payload }) => {
				state.transaction.status = 'succeeded';
				if (Array.isArray(payload.data.pending)) {
					state.pending.list = formatApproveList(payload.data.pending);
				}
				if (Array.isArray(payload.data.completed)) {
					state.complete.list = formatApproveList(payload.data.completed);
				}
			})
			.addCase(rejectSelfTestResult.rejected, (state) => {
				state.transaction.status = 'failed';
			})
			.addCase(withdrawSelfTestResult.pending, (state) => {
				state.transaction.status = 'loading';
			})
			.addCase(withdrawSelfTestResult.fulfilled, (state, { payload }) => {
				state.transaction.status = 'succeeded';
				if (payload.data.success) {
					state.history.list = payload.data.history;
				}
			})
			.addCase(withdrawSelfTestResult.rejected, (state) => {
				state.transaction.status = 'failed';
			});
	},
});

const formatApproveList = (array) => {
	const grouped = array.reduce((prev, current) => {
		const currentDate = moment(current.date, 'M/D/YYYY').format('D MMM YYYY (ddd)');
		return {
			...prev,
			[currentDate]: [...(prev[currentDate] || []), current],
		};
	}, {});

	const formattedList = Object.keys(grouped).map((key) => {
		return {
			title: key,
			data: grouped[key],
		};
	});

	return formattedList;
};

export const { covid19TestReset } = slice.actions;

export default slice.reducer;
