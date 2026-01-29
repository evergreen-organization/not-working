import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';

const endPoint = '/Mobile';

export const fetchLeaveSummary = createAsyncThunk(
	'fetchLeaveSummary',
	async ({ noOfDays }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Dashboard.LeaveSummary;
		}
		const result = await client.post(`${endPoint}/LeaveSummary`, { noOfDays });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchStaffLeaveReport = createAsyncThunk(
	'fetchStaffLeaveReport',
	async ({ date }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Dashboard.LeaveReport;
		}
		const result = await client.post(`${endPoint}/StaffsLeaveReport`, { date });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
