import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { fetchPinLogin } from '../login';
import { enrollPin, getPublicKey, validatePin } from './thunk';
import { captureMessage } from '@sentry/react-native';

const initialState = {
	publicKey: null,
	publicKeyStatus: 'idle',
	pinEnrolled: false,
	pinEnrollMessage: null,
	pinEnrollStatus: 'idle',
	loginMessage: null,
	validatePinStatus: 'idle',
	pinEnrollmentShown: false,
	pinRemainingAttempts: '',
};

const slice = createSlice({
	name: 'pin',
	initialState,
	reducers: {
		init: (_) => initialState,
		setPinEnrolled: (state, { payload }) => {
			state.pinEnrolled = payload;
		},
		setLoginMessage: (state, { payload }) => {
			state.loginMessage = payload;
			if (payload) {
				captureMessage(payload, 'info');
			}
		},
		setPinRemainingAttempts: (state, { payload }) => {
			state.pinRemainingAttempts = payload;
		},
		setPinEnrollmentShown: (state, { payload }) => {
			state.pinEnrollmentShown = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(REHYDRATE, (state, { payload }) => {
				if (payload?.pin !== undefined) {
					return payload.pin;
				}
			})
			.addCase(getPublicKey.fulfilled, (state, { payload }) => {
				state.publicKeyStatus = 'success';
				state.publicKey = payload.data.key;
			})
			.addCase(getPublicKey.pending, (state) => {
				state.publicKeyStatus = 'loading';
			})
			.addCase(getPublicKey.rejected, (state) => {
				state.publicKeyStatus = 'failed';
			})
			.addCase(enrollPin.fulfilled, (state, { payload, meta }) => {
				state.pinEnrollStatus = 'success';
				state.pinEnrollMessage = payload.data.message;
				if (payload.data.status === 'S') {
					state.pinEnrolled = true;
				}
				if (payload.data.demo) {
					state.demoPin = meta.arg.enteredPin;
				}
			})
			.addCase(enrollPin.pending, (state) => {
				state.pinEnrollStatus = 'loading';
			})
			.addCase(enrollPin.rejected, (state) => {
				state.pinEnrollStatus = 'failed';
			})
			.addCase(validatePin.fulfilled, (state, { payload }) => {
				state.pinRemainingAttempts = null;
				if (payload?.data?.remainingAttempts) {
					state.pinRemainingAttempts = payload.data.remainingAttempts;
				}
			})
			.addCase(fetchPinLogin.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.pinRemainingAttempts = null;
				if (payload?.data?.pinRemainingAttempts) {
					state.pinRemainingAttempts = payload.data.pinRemainingAttempts;
				}
			});
	},
});

export const {
	init,
	setPinEnrolled,
	setLoginMessage,
	setPinEnrollmentShown,
	setPinRemainingAttempts,
} = slice.actions;
export default slice.reducer;
