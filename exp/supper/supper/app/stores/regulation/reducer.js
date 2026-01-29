import { createSlice } from '@reduxjs/toolkit';
import { FAIL, LOADING, SUCCESS, IDLE } from 'constant';
import { fetchRegulationDetails, fetchRegulationList } from './thunk';

const initialState = {
	regulations: [],
	paths: [],
	favouritePath: [],
	status: IDLE,
	regulationList: [],
};

const slice = createSlice({
	name: 'regulations',
	initialState,
	reducers: {
		addRegulation: (state, { payload }) => {
			state.regulations.push(payload);
		},
		udpateRegulation: (state, { payload }) => {
			state.regulations = payload.regulations;
		},
		updatedPath: (state, { payload }) => {
			state.paths = payload.answers;
		},
		addFavouritePath: (state, { payload }) => {
			state.favouritePath.push(payload);
		},
		removeFavouritePath: (state, { payload }) => {
			state.favouritePath = state.favouritePath.filter(
				(item, index) => index !== payload.index,
			);
		},
		regulationReset: (state) => {
			state.regulations = initialState.regulations;
		},
		pathsReset: (state) => {
			state.paths = initialState.paths;
		},
		favouritePathReset: (state) => {
			state.favouritePath = initialState.favouritePath;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRegulationList.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(fetchRegulationList.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(fetchRegulationList.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.regulationList = payload?.data;
		});
		builder.addCase(fetchRegulationDetails.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(fetchRegulationDetails.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(fetchRegulationDetails.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.regulations.push(payload?.data);
		});
	},
});

export const {
	addRegulation,
	addFavouritePath,
	udpateRegulation,
	updatedPath,
	removeFavouritePath,
	regulationReset,
	pathsReset,
	favouritePathReset,
} = slice.actions;
export default slice.reducer;
