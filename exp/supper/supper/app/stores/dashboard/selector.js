import { createSelector } from '@reduxjs/toolkit';

export const getDashboard = createSelector(
	(state) => state.dashboard,
	(dashboard) => dashboard,
);
