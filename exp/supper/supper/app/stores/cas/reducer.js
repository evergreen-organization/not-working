import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { createSlice } from '@reduxjs/toolkit';
import { requestCASOtp } from './thunk';

const initialState = {
	status: IDLE,
};

const slice = createSlice({
	name: 'cas',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(requestCASOtp.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(requestCASOtp.rejected, (state) => {
				state.status = FAIL;
			})
			.addCase(requestCASOtp.fulfilled, (state) => {
				state.status = SUCCESS;
			});
	},
});

export default slice.reducer;
