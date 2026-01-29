import { eCardsAdventAdapter } from './reducer';
import appReducer from '../reducer';
import { createSelector } from '@reduxjs/toolkit';

type RootState = ReturnType<typeof appReducer>;

const eCardsAdventSelector = eCardsAdventAdapter.getSelectors<RootState>(
	(state) => state.eCardsAdventNew.eCardsAdvent,
);
const { selectAll: selectAllActions, selectById: selectActionById } = eCardsAdventSelector;

export const getAllECardsAdvent = createSelector(selectAllActions, (eCardsAdvent) => eCardsAdvent);

export const getECardsAdventById = (id) =>
	createSelector(
		(state: RootState) => state,
		(eCardsAdvent) => {
			if (!id) {
				return;
			}
			return selectActionById(eCardsAdvent, id);
		},
	);

export const getECardAdvent = createSelector(
	(state) => state.eCardsAdventNew,
	(eCardsAdvent) => eCardsAdvent,
);
