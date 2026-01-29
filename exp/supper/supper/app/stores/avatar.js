import { createSelector, createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
	image: 0,
};

const slice = createSlice({
	name: 'Avatar',
	initialState,
	reducers: {
		avatarStored(state, { payload }) {
			state.image = payload.image;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.avatar !== undefined) {
				return payload.avatar;
			}
		});
	},
});

export const { avatarStored } = slice.actions;
export default slice.reducer;

export const getAvatar = createSelector(
	(state) => state.avatar,
	(avatar) => avatar,
);
