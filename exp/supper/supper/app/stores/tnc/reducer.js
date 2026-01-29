import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
	acceptEBCTOU: false,
};

const slice = createSlice({
	name: 'tnc',
	initialState,
	reducers: {
		tncReset: (_) => initialState,
		acceptEBCTOUUpdated: (state) => {
			state.acceptEBCTOU = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.tnc !== undefined) {
				return payload.tnc;
			}
		});
	},
});

export const { acceptEBCTOUUpdated, tncReset } = slice.actions;

export default slice.reducer;
