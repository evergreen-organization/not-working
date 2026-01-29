import { createSlice } from '@reduxjs/toolkit';
import { getShiftedArray } from 'screens/snakeAndLadder/miniGame/jumbleRumple/utils';

const initialState = {
	selectedCharacters: [],
	shuffledCharacters: [],
	questions: [],
};

const slice = createSlice({
	name: 'jumbleRumple',
	initialState,
	reducers: {
		jumbleQuestionsAdded: (state, { payload }) => {
			state.questions = payload;
		},
		characterDeselected: (state) => {
			state.selectedCharacters = getShiftedArray(state.selectedCharacters);
		},
		characterSelected: (state, { payload }) => {
			state.selectedCharacters = [...state.selectedCharacters, payload];
		},
		shuffledCharactersUpdated: (state, { payload }) => {
			state.shuffledCharacters = payload;
		},
		selectedCharactersCleared: (state, { payload }) => {
			state.selectedCharacters = [];
		},
		charactersReset: (state, { payload }) => {
			state.selectedCharacters = [];
			state.shuffledCharacters = [];
		},
		resetJumble: () => initialState,
	},
});

export const {
	jumbleQuestionsAdded,
	charactersReset,
	characterSelected,
	resetJumble,
	shuffledCharactersUpdated,
	selectedCharactersCleared,
	characterDeselected,
} = slice.actions;
export default slice.reducer;
