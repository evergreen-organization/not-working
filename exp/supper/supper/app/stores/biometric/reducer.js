import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { enrollPin } from '../pin';

const initialState = {
	deviceModel: null,
	biometricType: null,
	userid: null,
	domain: null,
	fromLogout: false,
	isNewApp: true,
	isStored: false,
	isTranApprovalEnabled: false,
	isQuickLogin: false,
	isOTP: false,
};

const slice = createSlice({
	name: 'biometric',
	initialState,
	reducers: {
		biometricSetup: (state, { payload }) => {
			state.deviceModel = payload.deviceModel;
			state.userid = payload.username;
			state.domain = payload.domain;
		},
		biometricTypeStored: (state, { payload }) => {
			state.biometricType = payload;
		},
		biometricFromLogout: (state, { payload }) => {
			state.fromLogout = payload;
		},
		biometricReset: (_) => initialState,
		biometricDisabled: (state) => {
			state.isQuickLogin = false;
			state.isOTP = false;
		},
		biometricEnabled: (state) => {
			state.isQuickLogin = true;
			state.isOTP = true;
			state.isStored = true;
		},
		biometricQuickLoginEnabled: (state) => {
			state.isQuickLogin = true;
			state.isStored = true;
		},
		biometricQuickLoginDisabled: (state) => {
			state.isQuickLogin = false;
		},
		biometricOTPEnabled: (state) => {
			state.isOTP = true;
			state.isStored = true;
		},
		biometricOTPDisabled: (state) => {
			state.isOTP = false;
		},
		biometricMFADestroyed: (state) => {
			state.isQuickLogin = false;
			state.isOTP = false;
			state.isStored = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(REHYDRATE, (state, { payload }) => {
				if (payload?.biometric !== undefined) {
					return payload.biometric;
				}
			})
			.addCase(enrollPin.fulfilled, (state) => {
				state.isTranApprovalEnabled = true;
			});
	},
});

export const {
	biometricReset,
	biometricTypeStored,
	biometricFromLogout,
	biometricQuickLoginEnabled,
	biometricOTPEnabled,
	biometricDisabled,
	biometricEnabled,
	biometricOTPDisabled,
	biometricQuickLoginDisabled,
	biometricSetup,
	biometricMFADestroyed,
} = slice.actions;
export default slice.reducer;
