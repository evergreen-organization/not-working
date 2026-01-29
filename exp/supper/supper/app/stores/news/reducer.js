import { createSlice } from '@reduxjs/toolkit';
import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { fetchNewsList } from './thunk';

const initialState = {
	news: [],
	status: IDLE,
};

const slice = createSlice({
	name: 'news',
	initialState: initialState,
	reducers: {
		newsReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchNewsList.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(fetchNewsList.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			if (state.news.length === 0) {
				state.news = payload.data;
			} else {
				state.news = state.news.concat(payload.data);
			}
		});
		builder.addCase(fetchNewsList.rejected, (state) => {
			state.status = FAIL;
		});
	},
});

export const { newsReset } = slice.actions;
export default slice.reducer;
