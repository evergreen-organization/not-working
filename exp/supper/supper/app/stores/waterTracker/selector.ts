import { createSelector } from '@reduxjs/toolkit';
import appReducer from '../reducer';

type RootState = ReturnType<typeof appReducer>;

export const getWaterTrackerData = createSelector(
	(state: RootState) => state.waterTracker,
	(waterTracker) => waterTracker,
);
