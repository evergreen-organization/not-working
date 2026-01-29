import { createAsyncThunk } from '@reduxjs/toolkit';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';

export const fetchEbizData = createAsyncThunk(
	'fetchEbizData',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.cardDataNew;
		}
		const { adId } = request;
		const result = await client.post('/EBiz/data/user', { adId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchEbizFields = createAsyncThunk(
	'fetchEbizFields',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.fields;
		}
		const result = await client.get('/EBiz/data/fields');
		console.log({ path: 'fetchEbizFields', result });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const updateEbizFields = createAsyncThunk(
	'updateEbizFields',
	async ({ fields }, { getState, rejectWithValue }) => {
		console.log({ path: 'updateEbizFields', fields });
		const request = fields.map(({ key, isVisible }) => ({
			key,
			isVisible,
		}));
		if (checkIsDemoFromState(getState())) {
			return { data: { result: true } };
		}
		const result = await client.post('/EBiz/data/update', { data: request });

		return handleThunkResponse({
			result,
			rejectWithValue,
		});
	},
);

export const fetchProfileImage = createAsyncThunk(
	'fetchProfileImage',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.profileImg;
		}
		const result = await client.get('/ebiz');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const fetchDataApproval = createAsyncThunk(
	'fetchDataApproval',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.cardDataApproval;
		}
		const result = await client.get('/ebiz');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const fetchDataChanges = createAsyncThunk(
	'fetchDataChanges',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.dataChanges;
		}
		const result = await client.get('/ebiz');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const fetchTags = createAsyncThunk(
	'fetchTags',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.tags;
		}
		const result = await client.post('/EBiz/tag/all');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const createTag = createAsyncThunk(
	'createTag',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return {
				data: {
					url: 'https://visionary-zuccutto-6d8738.netlify.app/',
					isDemo: true,
				},
			};
		}
		const result = await client.post('/EBiz/tag/create', request);

		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const renewTags = createAsyncThunk(
	'renewTags',
	async (request, { getState, rejectWithValue }) => {
		let ids = request.map((item) => item.id);
		console.log('ids', ids);
		if (checkIsDemoFromState(getState())) {
			return { data: { result: true } };
		}
		const result = await client.post('/EBiz/tag/renew', { id: ids });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const deleteTags = createAsyncThunk(
	'deleteTags',
	async (request, { getState, rejectWithValue }) => {
		let ids = request.map((item) => item.id);

		if (checkIsDemoFromState(getState())) {
			return { data: { result: true } };
		}
		const result = await client.post('/EBiz/tag/delete', { id: ids });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchEbizPreviewData = createAsyncThunk(
	'fetchEbizPreviewData',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.EBizCard.cardDataNew;
		}
		const { adId } = request;
		const result = await client.post('/EBiz/data/preview', { adId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
