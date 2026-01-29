import { createSlice } from '@reduxjs/toolkit';
import { fetchModuleAvailable, fetchRevokeDevice, fetchUnbindDevice } from './thunk';

const initialState = {
	loading: false,
	loggedIn: false,
	modulesAvailable: {},
};

const slice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		loginReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchModuleAvailable.fulfilled, (state, { payload }) => {
				state.modulesAvailable = payload.data;
			})
			.addCase(fetchRevokeDevice.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchRevokeDevice.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(fetchRevokeDevice.rejected, (state) => {
				state.loading = false;
			})
			.addCase(fetchUnbindDevice.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUnbindDevice.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(fetchUnbindDevice.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { loginReset } = slice.actions;
export default slice.reducer;
