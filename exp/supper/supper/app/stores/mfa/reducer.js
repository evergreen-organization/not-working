import { IDLE } from 'constant';
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { requestVerifyActivation } from 'stores';

const initialState = {
	status: IDLE,
	isActivatedMFA: false,
	isForcePassword: false,
	mfaMigrationModalShowed: 0,
	clientServerTimeShift: '',
	stfNo: '',
	pinErrorCount: 2,
	hasSoftToken: false,
	hasHardToken: false,
};

const slice = createSlice({
	name: 'mfa',
	initialState,
	reducers: {
		mfaReset: (_) => initialState,
		mfaActivated: (state, { payload }) => {
			state.isActivatedMFA = payload.isActivated;
			state.stfNo = payload.stfNo;
		},
		increaseMfaMigrationModalShowed: (state) => {
			state.mfaMigrationModalShowed = state.mfaMigrationModalShowed + 1;
		},
		clientServerTimeShiftStored: (state, { payload }) => {
			state.clientServerTimeShift = payload;
		},
		pinErrorCountIncreased: (state) => {
			state.pinErrorCount = state.pinErrorCount - 1;
		},
		pinErrorCountReset: (state) => {
			state.pinErrorCount = 2;
		},
		forcePasswordLogin: (state) => {
			state.isForcePassword = true;
		},
		forcePasswordLoginReset: (state) => {
			state.isForcePassword = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.mfa !== undefined) {
				return payload.mfa;
			}
		});
		builder.addCase(requestVerifyActivation.fulfilled, (state, { payload }) => {
			state.hasSoftToken = payload.data.hasSoftToken;
			state.hasHardToken = payload.data.hasHardToken;
		});
	},
});

export const {
	mfaReset,
	mfaActivated,
	increaseMfaMigrationModalShowed,
	clientServerTimeShiftStored,
	pinErrorCountIncreased,
	pinErrorCountReset,
	forcePasswordLogin,
	forcePasswordLoginReset,
} = slice.actions;

export default slice.reducer;
