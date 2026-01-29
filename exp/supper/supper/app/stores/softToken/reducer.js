import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import Moment from 'moment/moment';
import {
	submitChallengeQuestion,
	validatePBSSSecurePIN,
	validatePBSSSignature,
	requestInitSoftTokenActivation,
	activateTokenInstance,
} from './thunk';
import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';

const initialState = {
	status: IDLE,
	isActivated: false,
	name: '',
	transaction: {
		transactionId: '',
		secureChannelMessageSignature: '',
	},
	auth: {
		selectedSecfa: null,
		pacSeqNo: null,
		phoneNo: null,
		status: IDLE,
		errorAttempt: null,
		errorMsg: null,
		lastPacReqTime: null,
	},
};

const slice = createSlice({
	name: 'softToken',
	initialState,
	reducers: {
		softTokenReset: (_) => initialState,
		softTokenActivated: (state, { payload }) => {
			state.isActivated = payload.isActivated;
		},
		softTokenTransactionIdUpdated: (state, { payload }) => {
			state.transactionId = payload.transactionId;
		},
		updateSoftTokenTransactionObject: (state, { payload }) => {
			for (const key in payload) {
				state.transaction[key] = payload[key];
			}
		},
		updateSoftTokenAuthObject: (state, { payload }) => {
			for (const key in payload) {
				state.auth[key] = payload[key];
			}
		},
		selectedSecfaUpdated: (state, { payload }) => {
			state.auth.selectedSecfa = payload;
		},
		paymentAuthReset: (state) => {
			state.auth = initialState.auth;
		},
		paymentAuthPacReset: (state) => {
			const { lastPacReqTime } = state.auth;
			state.auth = { ...initialState.auth, lastPacReqTime };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.softToken !== undefined) {
				return payload.softToken;
			}
		});
		builder.addCase(activateTokenInstance.fulfilled, (state) => {
			state.isActivated = true;
		});
		builder.addCase(validatePBSSSecurePIN.fulfilled, (state, { payload }) => {
			state.auth.status = SUCCESS;
			if (payload.data.remainingAttempts) {
				state.auth.errorAttempt = payload.data.remainingAttempts;
			} else {
				state.auth.errorAttempt = initialState.auth.errorAttempt;
			}
		});
		builder.addCase(validatePBSSSecurePIN.pending, (state) => {
			state.auth.status = LOADING;
		});
		builder.addCase(validatePBSSSecurePIN.rejected, (state) => {
			state.auth.status = FAIL;
		});
		builder.addCase(validatePBSSSignature.fulfilled, (state, { payload }) => {
			if (payload.data.status !== 'S') {
				state.auth.status = FAIL;
			}
		});
		builder.addCase(validatePBSSSignature.pending, (state) => {
			state.auth.status = LOADING;
		});
		builder.addCase(validatePBSSSignature.rejected, (state) => {
			state.auth.status = FAIL;
		});
		builder.addCase(submitChallengeQuestion.fulfilled, (state) => {
			state.auth.status = SUCCESS;
		});
		builder.addCase(submitChallengeQuestion.pending, (state) => {
			state.auth.status = LOADING;
		});
		builder.addCase(submitChallengeQuestion.rejected, (state) => {
			state.auth.status = FAIL;
		});
		builder.addCase(requestInitSoftTokenActivation.pending, (state) => {
			state.lastPacReqTime = Moment().valueOf();
		});
	},
});

export const {
	softTokenReset,
	softTokenActivated,
	softTokenTransactionIdUpdated,
	updateSoftTokenTransactionObject,
	updateSoftTokenAuthObject,
	selectedSecfaUpdated,
	paymentAuthReset,
	paymentAuthPacReset,
} = slice.actions;
export default slice.reducer;
