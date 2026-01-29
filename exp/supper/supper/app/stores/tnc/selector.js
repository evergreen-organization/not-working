import { createSelector } from '@reduxjs/toolkit';

export const getTNC = createSelector(
	(state) => state.tnc,
	(tnc) => tnc,
);
