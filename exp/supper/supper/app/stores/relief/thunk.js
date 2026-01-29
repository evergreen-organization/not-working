import { createAsyncThunk } from '@reduxjs/toolkit';
import { DemoData } from 'constant';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

export const fetchReliefAssignment = createAsyncThunk(
	'fetchReliefAssignment',
	async ({ year }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Relief.ReliefAssigment;
		}
		const result = await client.post('/Mobile/ReliefAssignment', { year });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
