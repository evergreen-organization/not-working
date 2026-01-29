import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	checkDemoLoginPassword,
	checkDemoPinLogin,
	checkIsDemoFromState,
	checkIsDemoFromUserId,
} from 'utils';
import { DemoData } from 'constant';
import authClient from '../../apis/clientAuth';
import apiClient from '../../apis/client';
import { Config } from '../../../env';
import { handleThunkResponse } from 'apis';
import { storage } from 'auth';
import { setUser } from '@sentry/react-native';

export const fetchLogin = createAsyncThunk(
	'fetchLogin',
	async (
		{ username, password, deviceId, recaptchaToken, domain },
		{ getState, rejectWithValue },
	) => {
		if (checkDemoLoginPassword(username, password)) {
			return DemoData.Login.Login;
		}
		// For UAT Testing on Reset Password / Unlock password
		if (recaptchaToken) {
			authClient.setHeaders({ Token: recaptchaToken });
		}
		authClient.setHeaders({ ValidateDevice: 1, domain: domain });

		if (Config.REGION !== 'PROD' && Config.IAM_LOGIN) {
			const result = await authClient.post('/Auth/LoginIAM', {
				adid: username,
				password,
				deviceId,
			});
			return handleThunkResponse({ result, rejectWithValue });
		} else {
			const result = await authClient.post('/Auth/Login', {
				username,
				password,
				deviceId,
			});
			return handleThunkResponse({ result, rejectWithValue });
		}
	},
);

export const fetchLogout = createAsyncThunk(
	'fetchLogout',
	async (_, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.logout;
		}
		const result = await authClient.get('/Auth/Logout');
		await storage.removeToken();
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchUnbindDevice = createAsyncThunk(
	'fetchUnbindDevice',
	async (_, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.UnbindDevice;
		}
		const result = await authClient.get('/Bio/UnbindDevice');
		await storage.removeToken();
		setUser(null); // set sentry user to null when unbinded
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getVersion = createAsyncThunk(
	'getVersion',
	async (params, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.Version;
		}
		const result = await apiClient.get('/Mobile/GetVersion');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchStaffInfo = createAsyncThunk(
	'fetchStaffInfo',
	async (params, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.StaffInfo;
		}
		const result = await apiClient.get('/Mobile/PersonalInfo');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchEnrollBiometric = createAsyncThunk(
	'fetchEnrollBiometric',
	async ({ deviceModel }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.Biometric;
		}
		const result = await authClient.post('/Bio/Enroll', { deviceModel });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchBindDevice = createAsyncThunk(
	'fetchBindDevice',
	async ({ deviceModel, deviceName }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.BindDevice;
		}
		const result = await authClient.post('/Bio/BindDevice', { deviceModel });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchRevokeDevice = createAsyncThunk(
	'fetchRevokeDevice',
	async ({ revokeDeviceId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.RevokeDevice;
		}
		const result = await authClient.post('/Bio/Revoke', { revokeDeviceId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchGetToken = createAsyncThunk(
	'fetchGetToken',
	async ({ fpToken, username }, { rejectWithValue }) => {
		if (checkIsDemoFromUserId(username)) {
			return DemoData.Login.BiometricLogin;
		}
		const result = await authClient.post('/Bio/GetToken', {
			fpToken,
			username,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchPinLogin = createAsyncThunk(
	'fetchPinLogin',
	async ({ username, pin, enteredPin, recaptchaToken }, { getState, rejectWithValue }) => {
		if (checkDemoPinLogin(username, enteredPin, getState())) {
			return DemoData.Login.PinLogin;
		}
		if (recaptchaToken) {
			authClient.setHeaders({ Token: recaptchaToken });
		}
		const result = await authClient.post('/Pin/Login', { username, pin });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchModuleAvailable = createAsyncThunk(
	'Mobile/GetModulesAvailable',
	async (params, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Login.ModuleAvailable;
		}
		const result = await apiClient.get('/Mobile/GetModulesAvailable');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchOTPLogin = createAsyncThunk(
	'fetchOTPLogin',
	async ({ username, domain, otp, recaptchaToken }, { getState, rejectWithValue }) => {
		if (checkDemoPinLogin(username, otp, getState())) {
			return DemoData.Login.PinLogin;
		}
		if (recaptchaToken) {
			authClient.setHeaders({ Token: recaptchaToken });
		}
		const result = await authClient.post('/Auth/QuickLogin', {
			username,
			domain,
			otp,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
