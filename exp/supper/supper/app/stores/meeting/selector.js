import { createSelector } from '@reduxjs/toolkit';

export const getMeetings = createSelector(
	(state) => state.meetings,
	(meetings) => meetings,
);
