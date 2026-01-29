import { actionsAdapter } from './reducer';
import { createSelector } from '@reduxjs/toolkit';
import appReducer from '../reducer';

type RootState = ReturnType<typeof appReducer>;

const actionSelector = actionsAdapter.getSelectors<RootState>(
	(state) => state.analytics.actions,
);

const {
	selectAll: selectAllActions,
	selectIds: selectAllActionIds,
	selectById: selectActionById,
} = actionSelector;

export const getAllActions = createSelector(
	selectAllActions,
	(actions) => actions,
);

export const getAllActionIds = createSelector(selectAllActionIds, (ids) => ids);

export const getActionById = (id) =>
	createSelector(
		(state: RootState) => state,
		(actions) => {
			if (!id) {
				return;
			}
			return selectActionById(actions, id);
		},
	);
