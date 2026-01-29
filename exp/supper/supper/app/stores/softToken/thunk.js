import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';

export const requestValidateId = createAsyncThunk(
	'SoftTokenValidateId',
	async ({ icNumber }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.ValidateId;
		}
		const result = await client.post('/Activation/UserVerification', {
			icNumber,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const initSoftTokenActivation = createAsyncThunk(
	'initSoftTokenActivation',
	async (param, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.InitSoftTokenActivation;
		}
		const result = await client.get('/Activation/Initialization');
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const requestInitSoftTokenActivation = createAsyncThunk(
	'initSoftTokenActivation',
	async (param, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.InitSoftTokenActivation;
		}
		const result = await client.get('/Activation/Initialization');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestSoftTokenRegisterDevice = createAsyncThunk(
	'SoftTokenRegisterDevice',
	async ({ secfa }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.RegisterDSApp;
		}
		const result = await client.post('/Activation/Step1', { secfa });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const generateTokenLicense = createAsyncThunk(
	'generateTokenLicense',
	async (param, { rejectWithValue }) => {
		const result = await client.post('/Activation/Step2', param);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const generateTokenInstance = createAsyncThunk(
	'generateTokenInstance',
	async (param, { rejectWithValue }) => {
		const result = await client.post('/Activation/Step3', param);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const activateTokenInstance = createAsyncThunk(
	'activateTokenInstance',
	async (param, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.Activate;
		}
		const result = await client.post('/Activation/Step4', param);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestPBSSSecfa = createAsyncThunk(
	'requestPBSSSecfa',
	async ({ secfaInfo }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.Secfa;
		}
		const result = await client.post('/Transaction/GetSecfa', secfaInfo);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestPBSSInitTransaction = createAsyncThunk(
	'requestPBSSInitTransaction',
	async (param, { rejectWithValue }) => {
		const result = await client.get(
			'/Transaction/GenerateSecureChannelMessage',
		);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const validatePBSSSignature = createAsyncThunk(
	'validatePBSSSignature',
	async ({ transactionId, signature }, { rejectWithValue }) => {
		const result = await client.post('/Transaction/ValidateSignature', {
			transactionId,
			signature,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const validatePBSSSecurePIN = createAsyncThunk(
	'validatePBSSSecurePIN',
	async ({ pin }, { rejectWithValue }) => {
		const result = await client.post(
			'/Transaction/GetRandomPasswordDerivator',
			{ pin },
		);
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const submitChallengeQuestion = createAsyncThunk(
	'submitChallengeQuestion',
	async ({ secfaInfo }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.SubmitTransaction;
		}
		const result = await client.post('/Transaction/Submit', secfaInfo);
		return handleThunkResponse({ result, rejectWithValue });
	},
);
