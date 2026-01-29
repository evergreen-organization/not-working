import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { createSlice } from '@reduxjs/toolkit';
import { fetchReliefAssignment } from '../relief';

const initialState = {
	reliefInfo: [],
	leaveInfo: [],
	status: IDLE,
};

const slice = createSlice({
	name: 'relief',
	initialState: initialState,
	reducers: {
		reliefReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchReliefAssignment.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(fetchReliefAssignment.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(fetchReliefAssignment.fulfilled, (state, { payload }) => {
			state.reliefInfo = payload.data.reliefInfo;
			state.leaveInfo = payload.data.leaveInfo;
			state.status = SUCCESS;
		});
	},
});
export const { reliefReset } = slice.actions;
export default slice.reducer;
