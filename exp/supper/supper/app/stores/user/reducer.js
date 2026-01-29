import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { checkDemoLoginPassword, checkIsDemoFromUserId } from 'utils';
import { DemoData } from 'constant';
import { fetchGetToken, fetchLogin, fetchPinLogin } from '../login';

const initialState = {
	staffId: '',
	gradeCode: '',
	jobCode: '',
	name: '',
	designation: '',
	costCenter: '',
	division: '',
	branchAddress: '',
	isRelief: false,
	isPnAdmin: false,
	cacheDate: '',
	token: null,
	expiresIn: null,
	deeplink: null,
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userStored(state, { payload }) {
			state.staffId = payload.personId;
			state.gradeCode = payload.gradeCode;
			state.jobCode = payload.jobCode;
			state.name = payload.name;
			state.designation = payload.designation;
			state.costCenter = payload.costCenter;
			state.division = payload.division;
			state.branchAddress = payload.branchName;
			state.isRelief = payload.isRelief;
			state.isPnAdmin = payload.isPnAdmin;
			state.cacheDate = payload.cacheDate;
			state.token = payload.token;
			state.expiryIn = payload.expiresIn;
		},
		userLoggedOut(state) {
			state.token = null;
			state.expiresIn = null;
		},
		userReset: (_) => initialState,
		setDeeplink: (state, { payload: { deeplink } }) => {
			state.deeplink = deeplink;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLogin.fulfilled, (state, { meta, payload }) => {
			const { username, password } = meta.arg;
			if (checkDemoLoginPassword(username, password)) {
				state.staffId = DemoData.Login.StaffInfo.data.personId;
			}
		});
		builder.addMatcher(
			isAnyOf(fetchPinLogin.fulfilled, fetchGetToken.fulfilled),
			(state, { payload, meta }) => {
				const { username } = meta.arg;
				if (checkIsDemoFromUserId(username)) {
					state.staffId = DemoData.Login.StaffInfo.data.personId;
				}
			},
		);
	},
});

export const { userStored, userReset, userLoggedOut, userDemoLogin, setDeeplink } = slice.actions;
export default slice.reducer;
