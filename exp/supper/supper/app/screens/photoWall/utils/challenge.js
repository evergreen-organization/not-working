import { Task1, Task2, Task3 } from '../components';
import Task3Step1 from 'assets/festive/eCardChallenge/3-step-1.png';
import Task3Step2 from 'assets/festive/eCardChallenge/3-step-2.png';
import Task3Step3 from 'assets/festive/eCardChallenge/3-step-3.png';
import { routes } from 'navigations';

export const E_LEARNING_STEPS = [
	{
		title: 'Step 1',
		description:
			'Go to https://learn.pbebank.com & login with your Webnotes Username and Password.',
		image: Task3Step1,
	},
	{
		title: 'Step 2',
		description: 'Request for the OTP, which will be sent to your PBeXperience.',
		image: Task3Step2,
	},
	{
		title: 'Step 3',
		description:
			'Input the OTP and Voila! You will be logged into the LMS online and can now browse, enrol, and start learning!',
		image: Task3Step3,
	},
];

export const ECARD_CHALLENGES_BUTTON_TYPE = {
	externalModule: 'externalModule',
	survey: 'survey',
	share: 'share',
};
export const ECARD_CHALLENGES = {
	3: {
		intro: 'Your opinion is important. Take a moment to complete this quick survey now!',
		title: 'We’d love to hear your thoughts!',
		description: 'Complete the survey below to unlock this eFestive Card!',
		buttonType: ECARD_CHALLENGES_BUTTON_TYPE.survey,
		props: {
			url: 'https://www.research.net/r/pbxmerdeka2023',
		},
	},
	// 4: {
	// 	intro:
	// 		'To unlock this eFestive Card design, complete a simple challenge! Ready?',
	// 	title: 'Introducing VIDEO eFestive Cards!',
	// 	description:
	// 		'PBeXperience is proud to introduce VIDEO eFestive Cards! Video eFC’s feature beautiful animated designs WITH music created with the assistance of generative Artificial Intelligence!\n' +
	// 		'\n' +
	// 		'Share the video eFC below to unlock this card permanently!',
	// 	buttonType: ECARD_CHALLENGES_BUTTON_TYPE.share,
	// 	cancelTitle: 'I’ll do it later',
	// 	completeTitle: 'Share Now',
	// 	props: {
	// 		video: eCardVideo,
	// 		videoPath: '/ecard-video-1.mp4',
	// 	},
	// },
	5: {
		intro: "Let's get those brain cells working! Why not finish up an eLearning course today?",
		title: 'Sharpen your mind!',
		description:
			'As we reach closer to the last quarter for the year, remember not to neglect your goals to feed your mind and develop your knowledge and skills!\n' +
			'\n' +
			'To unlock this eFC, just make sure to have completed at least 3 days of training/ learning to date!',
		buttonType: ECARD_CHALLENGES_BUTTON_TYPE.externalModule,
		cancelTitle: 'Hmm, maybe later…',
		completeTitle: 'I’ll do it!',
		props: {
			externalModule: 'eLearning',
			path: routes.TRAINING,
		},
	},
};

export const TASK = {
	3: Task2,
	4: Task1,
	5: Task3,
};
