import { createSelector, createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
	adAwarenessClicked: 0,
};

const slice = createSlice({
	name: 'adAwareness',
	initialState,
	reducers: {
		adAwarenessReset: (_) => initialState,
		adAwarenessClicked(state) {
			state.adAwarenessClicked = state.adAwarenessClicked + 1;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.adAwareness !== undefined) {
				return payload.adAwareness;
			}
		});
	},
});

export const { adAwarenessReset, adAwarenessClicked } = slice.actions;

export default slice.reducer;

export const getAdAwarenessClicked = createSelector(
	(state) => state.adAwareness,
	(adAwareness) => adAwareness.adAwarenessClicked,
);
