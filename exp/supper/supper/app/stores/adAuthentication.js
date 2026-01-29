import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RSA } from 'react-native-rsa-native';
import { Config } from '../../env';
import client from '../apis/client';
import { DemoData } from 'constant';
import { checkIsDemoFromState } from 'utils';
import { handleThunkResponse } from 'apis';

const initialState = {
	pin: undefined,
	answersId: undefined,
	userAnswers: undefined,
	password: undefined,

	questions: [],
	questionsStatus: 'idle',

	unlockStatus: 'idle',
};

export const requestAdAuthenticationQuestions = createAsyncThunk(
	'adAuthentication/questions',
	async (status, { rejectWithValue, getState }) => {
		const result = await client.get('/ADID/GetChallengeQuestions');
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const getUserMemorableQuestions = createAsyncThunk(
	'adAuthentication/getUserMemorableQuestions',
	async (status, { rejectWithValue, getState }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.ADID.MemorableQuestions;
		}
		const { biometric } = getState();
		const encrypted = await RSA.encrypt(
			JSON.stringify({
				adid: biometric.userid,
				domain: biometric.domain ? 'PIV' : 'PBB',
			}),
			Config.REGION === 'PROD' ? Config.CERT_PUBLIC_KEY_PROD : Config.CERT_PUBLIC_KEY_UAT,
		);

		const result = await client.post('/ADID/GetUserChallengeQuestions', {
			data: encrypted,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const resetUserPassword = createAsyncThunk(
	'adAuthentication/resetUserPassword',
	async ({ password }, { rejectWithValue, getState }) => {
		const { adAuthentication, biometric } = getState();

		const encrypted = await RSA.encrypt(
			JSON.stringify({
				adid: biometric.userid,
				domain: biometric.domain ? 'PIV' : 'PBB',
				...adAuthentication.resetPassword.answers,
				password,
			}),
			Config.REGION === 'PROD' ? Config.CERT_PUBLIC_KEY_PROD : Config.CERT_PUBLIC_KEY_UAT,
		);

		const result = await client.post('/ADID/ResetPassword', {
			data: encrypted,
		});

		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const resetQuestions = createAsyncThunk('adAuthentication/questions/clear', () => '');
export const resetUserQuestions = createAsyncThunk(
	'adAuthentication/userQuestions/clear',
	() => '',
);

const slice = createSlice({
	name: 'adAuthentication',
	initialState,
	reducers: {
		adAuthenticationReset: (_) => initialState,
		challengeQuestionsReset(state) {
			state.questions = initialState.questions;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(requestAdAuthenticationQuestions.fulfilled, (state, { payload }) => {
				state.status = 'success';
				state.enrollChallengeQuest.questions = payload.data;
			})
			.addCase(requestAdAuthenticationQuestions.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(requestAdAuthenticationQuestions.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserMemorableQuestions.fulfilled, (state, { payload }) => {
				state.questionsStatus = 'success';
				state.questions = payload.data;
			})
			.addCase(getUserMemorableQuestions.rejected, (state) => {
				state.questionsStatus = 'failed';
			})
			.addCase(getUserMemorableQuestions.pending, (state) => {
				state.questionsStatus = 'loading';
			})
			.addCase(resetQuestions.fulfilled, (state) => {
				state.status = 'idle';
				state.questions = [];
			})
			.addCase(resetUserQuestions.fulfilled, (state) => {
				state.status = 'idle';
				state.userQuestions = [];
			});
	},
});

export const { adAuthenticationReset, challengeQuestionsReset } = slice.actions;
export default slice.reducer;

export const getAdAuthentication = createSelector(
	(state) => state.adAuthentication,
	(adAuthentication) => adAuthentication,
);

export const getUnlockADIDStatus = createSelector(
	(state) => state.adAuthentication,
	(adAuthentication) => adAuthentication.unlockStatus,
);
