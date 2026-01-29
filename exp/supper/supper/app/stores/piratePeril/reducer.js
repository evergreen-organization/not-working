import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	questions: [],
};

const slice = createSlice({
	name: 'piratePeril',
	initialState,
	reducers: {
		pirateQuestionsAdded: (state, { payload }) => {
			state.questions = payload;
		},
		resetPirate: () => initialState,
	},
});

export const { pirateQuestionsAdded, resetPirate } = slice.actions;
export default slice.reducer;
