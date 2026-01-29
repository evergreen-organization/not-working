import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';

import client from '../apis/client';
import { handleThunkResponse } from 'apis';

import { DemoData, FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { getTotalBooksRead } from '../screens/home/library/utils';
import { checkIsDemoFromState } from 'utils';

const initialState = {
	goals: { done: '0', goal: '0' },
	books: [],
	epublications: [],
	readingList: [],
	loadingGoals: IDLE,
	loadingBooks: IDLE,
};

export const getBooks = createAsyncThunk(
	'library/getBooks',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Library.Books;
		}
		const result = await client.post('/Training/GetBook');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getPublications = createAsyncThunk(
	'library/getPublications',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Library.EPublications;
		}
		const result = await client.post('/Training/GetPublication');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getReadingList = createAsyncThunk(
	'library/getReadingList',
	async ({ year }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Library.ReadingList;
		}
		const result = await client.post('/Training/GetReadingList', { year });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const addReadingList = createAsyncThunk(
	'library/addReadingList',
	async ({ title, author, year }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Library.SubmitReadingList;
		}
		const result = await client.post('/Training/SetReadingList', {
			title,
			author,
			year,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const updateReadingList = createAsyncThunk(
	'library/updateReadingList',
	async (
		{ id, title, author, year, readingStatus },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Library.EditReadingList;
		}
		const result = await client.post('/Training/UpdateReadingList', {
			id,
			title,
			author,
			year,
			readingStatus,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const deleteReadingList = createAsyncThunk(
	'library/deleteReadingList',
	async ({ id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Library.RemoveReadingList;
		}
		const result = await client.post('/Training/DeleteReadingList', { id });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

const slice = createSlice({
	name: 'library',
	initialState: initialState,
	reducers: {
		libraryReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getBooks.pending, (state, { payload, meta }) => {
			state.loadingBooks = LOADING;
		});
		builder.addCase(getBooks.rejected, (state, { payload, meta }) => {
			state.loadingBooks = FAIL;
		});
		builder.addCase(getBooks.fulfilled, (state, { payload, meta }) => {
			state.loadingBooks = SUCCESS;
			state.books = payload.data;
		});
		builder.addCase(getPublications.pending, (state, { payload, meta }) => {
			state.loadingBooks = LOADING;
		});
		builder.addCase(getPublications.rejected, (state, { payload, meta }) => {
			state.loadingBooks = FAIL;
		});
		builder.addCase(getPublications.fulfilled, (state, { payload, meta }) => {
			state.loadingBooks = SUCCESS;
			state.epublications = payload.data;
		});
		builder.addCase(getReadingList.pending, (state, { payload, meta }) => {
			state.loadingGoals = LOADING;
		});
		builder.addCase(getReadingList.rejected, (state, { payload, meta }) => {
			state.loadingGoals = FAIL;
		});
		builder.addCase(getReadingList.fulfilled, (state, { payload }) => {
			state.goals = {
				done: getTotalBooksRead(payload.data).toString(),
				goal: payload.data.length.toString(),
			};
			state.readingList = payload.data;
			state.loadingGoals = SUCCESS;
		});
		builder.addCase(addReadingList.pending, (state, { payload }) => {
			state.loadingGoals = LOADING;
		});
		builder.addCase(addReadingList.fulfilled, (state, { payload }) => {
			state.loadingGoals = SUCCESS;
		});
		builder.addCase(updateReadingList.pending, (state, { payload }) => {
			state.loadingGoals = LOADING;
		});
		builder.addCase(updateReadingList.fulfilled, (state, { payload }) => {
			state.loadingGoals = SUCCESS;
		});
		builder.addCase(deleteReadingList.pending, (state, { payload }) => {
			state.loadingGoals = LOADING;
		});
		builder.addCase(deleteReadingList.fulfilled, (state, { payload }) => {
			state.loadingGoals = SUCCESS;
		});
	},
});

export const getLibrary = createSelector(
	(state) => state.library,
	(library) => library,
);

export const { libraryReset } = slice.actions;
export default slice.reducer;
