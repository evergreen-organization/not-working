import { createSelector } from '@reduxjs/toolkit';

export const getTraining = createSelector(
	(state) => state.training,
	(training) => training,
);
