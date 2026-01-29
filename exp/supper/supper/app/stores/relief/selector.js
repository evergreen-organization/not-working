import { createSelector } from '@reduxjs/toolkit';

export const getRelief = createSelector(
	(state) => state.relief,
	(relief) => relief,
);
