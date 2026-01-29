import PresentImg from '../../assets/wordzzle/correct-wordzzle.png';
import LoseImg from '../../assets/wordzzle/wrong-wordzzle.png';
import WarningImg from '../../assets/wordzzle/warning-attempt.png';
import DoneImg from 'assets/icon/victory.png';
import { JUMBLE_STATUS } from './constant';
import { styles } from 'screens/snakeAndLadder/miniGame/jumbleRumple/main/styles';

export const JUMBLE_ENDGAME = {
	[JUMBLE_STATUS.CORRECT]: {
		image: PresentImg,
		title: 'Well done! You got it right.',
		label: 'Next',
	},
	[JUMBLE_STATUS.WRONG]: {
		image: LoseImg,
		title: 'Oops...Wrong answer. \nYou have one more chance.',
		label: 'Try Again',
	},
	[JUMBLE_STATUS.WARNING]: {
		image: WarningImg,
	},
	[JUMBLE_STATUS.WIN]: {
		image: DoneImg,
		title: 'Congratulations! You win.',
		label: 'Done',
		endImage: DoneImg,
		endImageStyle: styles.manImage,
		endLabel: 'Well done!\n You have successfully \ncompleted this tile.',
	},
	[JUMBLE_STATUS.END]: {
		image: DoneImg,
		title: 'Challenge completed. Keep it up!',
		label: 'Done',
	},
	[JUMBLE_STATUS.LOST]: {
		image: LoseImg,
		title: 'Oops... Game over!',
		label: 'OK',
		endImage: LoseImg,
		endImageStyle: styles.lanternImage,
		endLabel: 'Game over. \nYou lost the game!\n Dare to try again.',
	},
};

export const JUMBLE_GAMEPLAY = {
	MAX_ATTEMPTS: 2,
};
