import { createAsyncThunk } from '@reduxjs/toolkit';
import { DemoData } from 'constant';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

export const fetchPromoList = createAsyncThunk(
	'fetchPromoList',
	async ({ lastId, count, category }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Promotion.PromoList;
		}
		const result = await client.post('/Marketing/PromoList', {
			lastId,
			count,
			category,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchPromoDetails = createAsyncThunk(
	'fetchPromoDetails',
	async ({ promoId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Promotion.PromoDetails;
		}
		const result = await client.post('/Marketing/PromoDetail', { promoId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
