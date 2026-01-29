import { createSelector } from '@reduxjs/toolkit';

export const getCAS = createSelector(
	(state) => state.cas,
	(cas) => cas,
);
