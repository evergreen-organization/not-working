import {
	createSelector,
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { Config } from '../../env';

export const photoWallAdapter = createEntityAdapter({
	selectId: (photos) => photos.id,
});

export const cardMessageAdapter = createEntityAdapter({
	selectId: (cardMessage) => cardMessage.id,
});

const initialState = {
	photos: photoWallAdapter.getInitialState(),
	cardMessage: cardMessageAdapter.getInitialState(),
	currentTemplate: 0,
	showCarousel: true,
	version: Config.E_CARDS_VERSION,
};

export const addPhoto = createAsyncThunk(
	'photoWall/photos/add',
	async (request, { dispatch, getState, rejectWithValue }) => {},
);

export const updatePhoto = createAsyncThunk(
	'photoWall/photos/update',
	async (request, { dispatch, getState, rejectWithValue }) => {
		return null;
	},
);

export const deletePhoto = createAsyncThunk(
	'photoWall/photos/delete',
	async (request, { dispatch, getState, rejectWithValue }) => {
		return null;
	},
);
export const addCardMessage = createAsyncThunk(
	'photoWall/cardMessage/add',
	async (request, { dispatch, getState, rejectWithValue }) => {
		return null;
	},
);

export const updateCardMessage = createAsyncThunk(
	'photoWall/cardMessage/update',
	async (request, { dispatch, getState, rejectWithValue }) => {
		return null;
	},
);

const slice = createSlice({
	name: 'photoWallChristmas',
	initialState,
	reducers: {
		resetPhotoWall: () => initialState,
		updateCurrentTemplate: (state, { payload }) => {
			state.currentTemplate = payload;
		},
		hideECardsCarousel: (state, { payload }) => {
			state.showCarousel = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addPhoto.fulfilled, (state, { payload, meta }) => {
			photoWallAdapter.addOne(state.photos, meta.arg);
		});
		builder.addCase(updatePhoto.fulfilled, (state, { payload, meta }) => {
			photoWallAdapter.updateOne(state.photos, {
				id: meta.arg.id,
				changes: { ...meta.arg },
			});
		});
		builder.addCase(deletePhoto.fulfilled, (state, { payload, meta }) => {
			photoWallAdapter.removeOne(state.photos, meta.arg.id);
		});
		builder.addCase(addCardMessage.fulfilled, (state, { payload, meta }) => {
			cardMessageAdapter.addOne(state.cardMessage, meta.arg);
		});
		builder.addCase(updateCardMessage.fulfilled, (state, { payload, meta }) => {
			cardMessageAdapter.updateOne(state.cardMessage, {
				id: meta.arg.id,
				changes: { ...meta.arg },
			});
		});
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.photoWallChristmas !== undefined) {
				return payload.photoWallChristmas;
			}
		});
	},
});

export const { updateCurrentTemplate, hideECardsCarousel, resetPhotoWall } = slice.actions;
export default slice.reducer;

const { selectAll: selectAllPhotos, selectById: selectPhotoById } = photoWallAdapter.getSelectors(
	(state) => state,
);
const { selectAll: selectAllCardMessage, selectById: selectCardMessageById } =
	cardMessageAdapter.getSelectors((state) => state);

export const getAllPhotos = createSelector(
	(state) => state.photoWallChristmas.photos,
	(photos) => selectAllPhotos(photos),
);

export const getAllCardMessage = createSelector(
	(state) => state.photoWallChristmas.cardMessage,
	(cardMessage) => selectAllCardMessage(cardMessage),
);

export const getCardMessageById = (id) =>
	createSelector(
		(state) => state.photoWallChristmas.cardMessage,
		(cardMessage) => {
			if (!id) {
				return;
			}
			return selectCardMessageById(cardMessage, id);
		},
	);

export const getCurrentTemplate = createSelector(
	(state) => state.photoWallChristmas.currentTemplate,
	(currentTemplate) => currentTemplate,
);

export const getPhotoWall = createSelector(
	(state) => state.photoWallChristmas,
	(photoWall) => photoWall,
);
