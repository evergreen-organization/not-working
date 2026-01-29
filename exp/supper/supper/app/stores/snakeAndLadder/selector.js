import { createSelector } from '@reduxjs/toolkit';

export const getGame = createSelector(
	(state) => state.snakeAndLadder,
	(game) => game,
);
