import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAnalyticsType } from './analytics.type';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';

export const submitUserAnalyticLogs = createAsyncThunk(
	'userAnalytics/submit',
	async (request: UserAnalyticsType[], { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.UserAnalytics.SubmitLogs;
		}
		const result = await client.post('/Mobile/LogAction', {
			actions: request,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
