import { createAsyncThunk } from '@reduxjs/toolkit';
import { DemoData } from 'constant';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

export const fetchPendingCourse = createAsyncThunk(
	'fetchPendingCourse',
	async (status, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Training.PendingCourse;
		}
		const result = await client.get('/Training/PendingCourse');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchCompletedCourse = createAsyncThunk(
	'fetchCompletedCourse',
	async (status, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Training.CompleteCourse;
		}
		const result = await client.get('/Training/CompletedCourse');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchTrainingReminder = createAsyncThunk(
	'fetchTrainingReminder',
	async (status, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Training.TrainingReminder;
		}
		const result = await client.get('/Training/Notification');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchComplianceStatus = createAsyncThunk(
	'fetchComplianceStatus',
	async (status, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Training.ComplianceStatus;
		}
		const result = await client.get('/Training/StatusOfCompliance');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
