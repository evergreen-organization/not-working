import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';

export const fetchClinicList = createAsyncThunk(
	'fetchClinicList',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Clinic.PanelList;
		}
		const result = await client.get('/Mobile/Panel');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchStateList = createAsyncThunk(
	'fetchStateList',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Clinic.StateList;
		}
		const result = await client.get('/Mobile/StateArea');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
