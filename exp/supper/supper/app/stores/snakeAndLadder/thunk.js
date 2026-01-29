import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';

//NEW THUNK BASED ON NEW APIS
export const campaignStatus = createAsyncThunk(
	'campaignStatus',
	async ({ campaignId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SnakeAndLadder.campStatus;
		}
		const result = await client.post('/CampaignV2/CampaignStatus', { campaignId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestQuestion = createAsyncThunk(
	'requestQuestion',
	async ({ campaignId, gameType }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SnakeAndLadder.questionBankList;
		}
		const result = await client.post('/CampaignV2/questions', { campaignId, gameType });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const submitAnswer = createAsyncThunk(
	'submitAnswer',
	async (
		{ campaignId, gameType, gameStatus, questionSession, answers },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SnakeAndLadder.apiStatus;
		}
		const result = await client.post('/CampaignV2/answer', {
			campaignId,
			gameType,
			gameStatus,
			questionSession,
			answers,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const initGame = createAsyncThunk(
	'initGame',
	async ({ campaignId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SnakeAndLadder.initGame;
		}
		const result = await client.post('/CampaignV2/Init', { campaignId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const updatePosition = createAsyncThunk(
	'updatePosition',
	async ({ campaignId, coins, playerPosition }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return;
		}
		const result = await client.post('/CampaignV2/Position', {
			campaignId,
			coins,
			playerPosition,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const leaderBoard = createAsyncThunk(
	'leaderBoard',
	async ({ campaignId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SnakeAndLadder.leaderBoard;
		}
		const result = await client.post('/CampaignV2/leaderboard', { campaignId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getCampaignId = createAsyncThunk(
	'getCampaignId',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SnakeAndLadder.campaignList;
		}
		const result = await client.get('/CampaignV2/GetCampaignList');
		console.log({ path: 'campaignList', result });
		return handleThunkResponse({ result, rejectWithValue });
	},
);
