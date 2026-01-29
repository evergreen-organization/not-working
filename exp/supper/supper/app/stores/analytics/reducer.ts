import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { UserAnalyticsType } from './analytics.type';
import { submitUserAnalyticLogs } from './thunk';

export const actionsAdapter = createEntityAdapter<UserAnalyticsType>({
	selectId: (action) => action.id,
});

const initialState = {
	actions: actionsAdapter.getInitialState(),
};

const slice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {
		analyticsReset: () => initialState,
		userActionAdded: (state, { payload }) => {
			actionsAdapter.addOne(state.actions, payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(submitUserAnalyticLogs.fulfilled, (state) => {
			state.actions = actionsAdapter.getInitialState();
		});
	},
});

export const { analyticsReset, userActionAdded } = slice.actions;

export default slice.reducer;
