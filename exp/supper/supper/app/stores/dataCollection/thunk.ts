import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { DataCollectionType } from './reducer';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';

export type DataCollectionProps = {
	activities: DataCollectionType[];
};

export const submitDataCollectionLogs = createAsyncThunk(
	'dataCollection/submit',
	async (request: DataCollectionProps, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.DataCollection.SubmitLogs;
		}

		const result = await client.post('/Mobile/LogActivity', {
			activities: request,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
