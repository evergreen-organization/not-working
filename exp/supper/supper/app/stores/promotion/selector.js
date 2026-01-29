import { createSelector } from '@reduxjs/toolkit';

export const getPromotion = createSelector(
	(state) => state.promotion,
	(promotion) => promotion,
);
