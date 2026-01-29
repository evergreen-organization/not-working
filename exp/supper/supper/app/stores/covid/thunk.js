import { createAsyncThunk } from '@reduxjs/toolkit';

import { DemoData } from 'constant';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

export const fetchSelfTestResults = createAsyncThunk(
	'Mobile/GetCovidTestResults',
	async (params, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.SelfTestResult;
		}
		const result = await client.post('/Mobile/GetCovidTestResults');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const uploadSelfTestResult = createAsyncThunk(
	'Mobile/UploadCovidTestResult',
	async (
		{ base64Image, testResult, approverId, staffName },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.UploadResult;
		}
		const result = await client.post('/Mobile/UploadCovidTestResult', {
			base64Image,
			result: testResult,
			approverId,
			staffName,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchSelfTestResultImage = createAsyncThunk(
	'Mobile/GetCovidTestResultImage',
	async ({ id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.SelfTestResultImage;
		}
		const result = await client.post('/Mobile/GetCovidTestResultImage', { id });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchPendingSelfTestResults = createAsyncThunk(
	'Mobile/GetPendingCovidTestResults',
	async (params, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.PendingSelfTestResult;
		}
		const result = await client.post('/Mobile/GetCovidTestResultIntray', {
			status: 'P',
		});
		console.log({ path: 'fetchPendingSelfTestResults', result });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchCompletedSelfTestResults = createAsyncThunk(
	'Mobile/GetCompleteCovidTestResults',
	async (params, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.CompleteSelfTestResult;
		}
		const result = await client.post('/Mobile/GetCovidTestResultIntray', {
			status: 'C',
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const approveSelfTestResult = createAsyncThunk(
	'Mobile/ApproveCovidTest',
	async ({ id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.ApproveSelfTest;
		}
		const result = await client.post('/Mobile/ApproveCovidTest', { id });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const rejectSelfTestResult = createAsyncThunk(
	'Mobile/RejectCovidTest',
	async ({ id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.RejectSelfTest;
		}
		const result = await client.post('/Mobile/RejectCovidTest', { id });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const withdrawSelfTestResult = createAsyncThunk(
	'Mobile/WithdrawCovidTest',
	async ({ id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SelfTest.WithdrawSelfTest;
		}
		const result = await client.post('/Mobile/WithdrawCovidTest', { id });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
