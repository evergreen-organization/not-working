import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { TemplateList } from '../../screens/photoWall/utils';
import { ECardAdventType } from './eCardAdvent.type';
import { REHYDRATE } from 'redux-persist';
import { fetchComplianceStatus } from '../training';

export const eCardsAdventAdapter = createEntityAdapter<ECardAdventType>({
	selectId: (eCard) => eCard.id,
});

const getInitialECardsAdvent = () =>
	TemplateList.reduce((array, item) => {
		array.push({ id: item.id, isUnlocked: item.isUnlocked });
		return array;
	}, []);

const populateECardsAdvent = eCardsAdventAdapter.upsertMany(
	eCardsAdventAdapter.getInitialState(),
	getInitialECardsAdvent(),
);

const initialState = {
	eCardsAdvent: populateECardsAdvent,
	compliedTraining: null,
};

const slice = createSlice({
	name: 'eCardsAdventNew',
	initialState,
	reducers: {
		resetECardsAdvent: () => initialState,
		unlockCard: (state, { payload }) => {
			const { id } = payload;
			eCardsAdventAdapter.updateOne(state.eCardsAdvent, {
				id,
				changes: {
					isUnlocked: true,
				},
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }: any) => {
			if (payload?.eCardsAdventNew !== undefined) {
				return payload.eCardsAdventNew;
			}
		});
		builder.addCase(fetchComplianceStatus.fulfilled, (state, { payload }) => {
			state.compliedTraining = payload.data[0].totalComplied;
		});
	},
});

export const { resetECardsAdvent, unlockCard } = slice.actions;
export default slice.reducer;
