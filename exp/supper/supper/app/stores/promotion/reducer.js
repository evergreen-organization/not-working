import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { fetchPromoDetails, fetchPromoList } from './thunk';

const initialState = {
	status: IDLE,
	promotionList: [],
	promotionDetails: {},
};

const slice = createSlice({
	name: 'promotion',
	initialState: initialState,
	reducers: {
		promotionStored: (state, action) => {
			for (const key in action.payload) {
				state[key] = action.payload[key];
			}
		},
		promotionReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.promotion) {
				return payload.promotion;
			}
		});
		builder.addCase(fetchPromoList.pending, (state, { meta }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchPromoList.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.promotionList = payload.data;
		});
		builder.addCase(fetchPromoDetails.pending, (state, { meta }) => {
			state.status = LOADING;
		});
		builder.addCase(fetchPromoDetails.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.promotionDetails = payload.data;
		});
		builder.addCase(fetchPromoDetails.rejected, (state, { payload }) => {
			state.status = FAIL;
		});
	},
});

export const { promotionStored, promotionReset } = slice.actions;
export default slice.reducer;
