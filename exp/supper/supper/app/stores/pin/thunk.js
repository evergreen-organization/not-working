import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';
import clientAuth from '../../apis/clientAuth';

export const enrollPin = createAsyncThunk(
	'/Pin/EnrollPin',
	async ({ pin, enteredPin, data }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Pin.EnrollPin;
		}
		const result = await clientAuth.post('/Pin/EnrollPin', { pin, data });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const getPublicKey = createAsyncThunk(
	'/Pin/PublicKey',
	async (params, { rejectWithValue }) => {
		const result = await clientAuth.post('/Pin/PublicKey');
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const validatePin = createAsyncThunk(
	'/Pin/ValidatePin',
	async ({ pin }, { rejectWithValue }) => {
		const result = await clientAuth.post('/Pin/ValidatePin', { pin });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);
