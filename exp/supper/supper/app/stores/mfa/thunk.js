import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';

export const requestVerifyActivation = createAsyncThunk(
	'verifyActivationOAS',
	async ({ username, domain }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.VerifyActivation;
		}

		const result = await client.post('/Oas/Activation/VerifyActivation', {
			username,
			domain,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestExchangeKeyOAS = createAsyncThunk(
	'exchangeKeyOAS',
	async (
		{ registrationId, deviceId, clientEphemeralPublicKey, staffNo },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.SubmitTransaction;
		}

		const result = await client.post('/Oas/Activation/ExchangeKey', {
			registrationId,
			deviceId,
			clientEphermeralPubKey: clientEphemeralPublicKey,
			staffNo,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestGenLicenseActivationMsg = createAsyncThunk(
	'genLicenseActivationMsOAS',
	async (
		{ registrationId, deviceId, clientEvidenceMessage, staffNo },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.SubmitTransaction;
		}
		const result = await client.post('/Oas/Activation/GenLAM', {
			registrationId,
			deviceId,
			clientEvidenceMessage,
			staffNo,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestInitActivation = createAsyncThunk(
	'initActivationOAS',
	async ({ registrationId, deviceId, deviceCode, staffNo }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.SubmitTransaction;
		}
		const result = await client.post('/Oas/Activation/InitActivation', {
			registrationId,
			deviceId,
			deviceCode,
			staffNo,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestPostActivation = createAsyncThunk(
	'postActivationOAS',
	async (
		{ registrationId, deviceId, signature, serialNumber, sequenceNumber, staffNo },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.SubmitTransaction;
		}
		const result = await client.post('/Oas/Activation/PostActivation', {
			registrationId,
			deviceId,
			signature,
			serialNumber,
			sequenceNumber,
			staffNo,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestServerUtcTime = createAsyncThunk(
	'getServerUtcTime',
	async (_, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.RequestServerUtcTime;
		}
		const result = await client.get('/Oas/GetServerUtcTime', {});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestExecTransaction = createAsyncThunk(
	'execTransaction',
	async (
		{ domain, username, secureChnInfoMsg, serialNo, sequenceNo, signature },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.SubmitTransaction;
		}
		const result = await client.post('/Oas/Transaction/ExecTransaction', {
			domain,
			username,
			secureChnInfoMsg,
			serialNo,
			sequenceNo,
			signature,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const requestTimeSync = createAsyncThunk(
	'timeSync',
	async ({ domain, username, otp }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.SoftToken.RequestTimeSync;
		}
		const result = await client.post('/Oas/Activation/TimeSync', {
			Domain: domain,
			Username: username,
			Otp: otp,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
