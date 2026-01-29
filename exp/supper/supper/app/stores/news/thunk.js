import { createAsyncThunk } from '@reduxjs/toolkit';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';

export const fetchNewsList = createAsyncThunk(
	'fetchNewsList',
	async ({ startWith, count }, { rejectWithValue }) => {
		const result = await client.post('/customsearch/PbbSearch', {
			startWith,
			count,
		});
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return handleThunkResponse({ result, rejectWithValue });
	},
);
