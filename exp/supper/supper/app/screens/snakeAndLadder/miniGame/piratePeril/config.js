import PresentImg from '../../assets/hangman/correct-hangman.png';
import LoseImg from '../../assets/hangman/wrong-hangman.png';

import BackgroundAttempt1 from './assets/images/bgAttempt6.png';
import BackgroundAttempt2 from './assets/images/bgAttempt5.png';
import BackgroundAttempt3 from './assets/images/bgAttempt4.png';
import BackgroundAttempt4 from './assets/images/bgAttempt3.png';
import BackgroundAttempt5 from './assets/images/bgAttempt2.png';
import BackgroundAttempt6 from './assets/images/bgAttempt1.png';

import { PIRATE_STATUS, PIRATE_STEPS } from './constant';

export const PIRATE_ENDGAME = {
	[PIRATE_STATUS.WIN]: {
		image: PresentImg,
		title: 'You are right!',
		label: 'Next Level',
	},
	[PIRATE_STATUS.WRONG]: {
		image: LoseImg,
		title: 'Oops... You lose!',
		label: 'OK',
	},
};

export const PIRATE_BACKGROUND = {
	[PIRATE_STEPS.REMAINING_6]: BackgroundAttempt6,
	[PIRATE_STEPS.REMAINING_5]: BackgroundAttempt5,
	[PIRATE_STEPS.REMAINING_4]: BackgroundAttempt4,
	[PIRATE_STEPS.REMAINING_3]: BackgroundAttempt3,
	[PIRATE_STEPS.REMAINING_2]: BackgroundAttempt2,
	[PIRATE_STEPS.REMAINING_1]: BackgroundAttempt1,
};

export const PIRATE_GAME_PLAY = {
	MAX_ATTEMPTS: 6,
};
