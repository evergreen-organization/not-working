import { dataCollectionAdapter } from './reducer';
import { createSelector } from '@reduxjs/toolkit';
import appReducer from '../reducer';

type RootState = ReturnType<typeof appReducer>;

const { selectAll: selectAllData } =
	dataCollectionAdapter.getSelectors<RootState>(
		(state) => state.dataCollection.activities,
	);

export const getAllActivitiesData = createSelector(
	selectAllData,
	(activity) => activity,
);
