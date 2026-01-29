import { createSelector } from '@reduxjs/toolkit';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';

export const getPiratePeril = createSelector(
	(state) => state,
	(state) => {
		if (checkIsDemoFromState(state)) {
			return {
				questions: DemoData.SnakeAndLadder.questionBankList.data.questions || [],
			};
		}
		return state.piratePeril;
	},
);
