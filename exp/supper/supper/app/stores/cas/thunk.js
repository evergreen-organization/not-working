import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';

export const requestCASOtp = createAsyncThunk(
	'requestOTP',
	async ({ ticketId, latitude, longitude }, { rejectWithValue }) => {
		const result = await client.post('/SelfServices/RequestOtp', {
			ticketId,
			latitude,
			longitude,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
