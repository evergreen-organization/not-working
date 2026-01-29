import { createAsyncThunk } from '@reduxjs/toolkit';
import { DemoData } from 'constant';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

export const fetchRegulationList = createAsyncThunk(
	'fetchRegulationList',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Regulation.RegulationList;
		}
		const result = await client.get('/Circular/GetAllCirculars');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchRegulationDetails = createAsyncThunk(
	'fetchRegulationDetails',
	async ({ regulationId, lastUpdateStamp }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Regulation.RegulationDetails;
		}
		const result = await client.post('/Circular/GetCircularDetails', {
			CircularId: regulationId,
			LastUpdateStamp: lastUpdateStamp,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const updateDateLastStamp = createAsyncThunk(
	'updateDateLastStamp',
	async ({ dialogId, answerId, clickStamp }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Regulation.UpdateDateLastStamp;
		}
		const result = await client.post('/Circular/DialogAnswerClick', {
			dialogId,
			answerId,
			clickStamp,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
