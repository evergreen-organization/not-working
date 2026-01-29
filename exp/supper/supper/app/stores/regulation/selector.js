import { createSelector } from '@reduxjs/toolkit';

export const getRegulations = createSelector(
	(state) => state.regulations,
	(regulations) => regulations,
);

export const getFavouritePath = createSelector(
	(state) => state.regulations.favouritePath,
	(favouritePath) => favouritePath,
);
