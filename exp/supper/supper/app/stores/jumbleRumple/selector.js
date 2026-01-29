import { createSelector } from '@reduxjs/toolkit';
import { shuffle } from 'lodash';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';

export const getJumbleRumple = createSelector(
	(state) => state,
	(state) => {
		if (checkIsDemoFromState(state)) {
			return {
				...state.jumbleRumple,
				shuffledCharacters: shuffle([
					'A',
					'B',
					'C',
					'D',
					'E',
					'F',
					'G',
					'H',
					'I',
					'J',
					'K',
					'L',
					'M',
					'N',
					'O',
					'P',
					'Q',
					'R',
					'S',
					'T',
					'U',
					'V',
					'W',
					'X',
					'Y',
					'Z',
				]),
				questions: DemoData.SnakeAndLadder.questionBankList.data.questions || [],
			};
		}
		return state.jumbleRumple;
	},
);
