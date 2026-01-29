import React from 'react';
import ADIDImage1 from 'assets/adid/adid-1.png';
import ADIDImage2 from 'assets/adid/adid-2.png';
import ADIDImage3 from 'assets/adid/adid-3.png';
import WarningIcon from 'assets/icon/warning.png';
import { Details1 } from './components/Detail1';
import { Detail2 } from './components/Detail2';
import { Detail3 } from './components/Detail3';
import { routes } from 'navigations';
import { adAwarenessClicked } from 'stores';

export const popUp3Details = [
	'Go to the IAM portal and click on PB SecureSign on the side menu navigation tab',
	'Input your current AD ID password',
	'A QR code will be generated. Scan the QR code using the PBeXperience app',
];

export const warningList = [
	'Ensure you have successfully enroled your Challenge Questions in the IAM portal before this step!',
	'Remember to have your PBeXperience app ready to scan the QR code once generated.',
];

export const errorPopUpDetailsList = [
	'Challenge Questions in IAM not found. Please make sure you have completed Step 1: “Set up your Challenge Questions”, and have successfully set up all your Challenge Questions.',
	'Alternatively, you may contact IT Helpdesk at 03-8738 8402 for more assistance.',
];

export const instructionText = [
	'In addition to your AD ID username and password, staff will be required to use their soft token to securely generate a one-time password (OTP) during login to their work terminals.',
	'In order to use the soft token feature in PBeXperience, you must first activate/re-activate PB SecureSign.',
];

export const CHALLENGE_QUESTIONS = 'challengeQuestions';
export const SECURE_SIGN = 'secureSign';

const Intro = {
	image: ADIDImage1,
	title: 'Forgot your work computer  password? Can’t sign in?',
	buttonTitle: "Let's Go",
	details: <Details1 />,
	conditionalNavigation: () => {},
};

const challengeQuestion = {
	image: ADIDImage2,
	title: 'Step 1: Set up your Challenge Questions',
	buttonTitle: 'Next Step',
	details: <Detail2 />,
	conditionalNavigation: () => {},
};

const errorChallengeQuestion = {
	image: ADIDImage1,
	title: 'ERROR: IAM Challenge Questions Not Completed',
	titleIcon: WarningIcon,
	buttonTitle: 'Set up Challenge Questions',
	details: <Detail3 detailList={errorPopUpDetailsList} />,
	conditionalNavigation: () => {},
};

const secureSign = (isActivatedMFA) => ({
	image: ADIDImage3,
	title: 'Step 2: Activate PB SecureSign',
	buttonTitle: isActivatedMFA ? 'Done' : 'CLOSE',
	details: <Detail3 detailList={popUp3Details} warningList={warningList} />,
	conditionalNavigation: () => {
		if (!isActivatedMFA) {
			return routes.MFA_INTRO;
		}
	},
});

export const adidIntroFull = (isActivatedMFA) => [
	Intro,
	challengeQuestion,
	secureSign(isActivatedMFA),
];
export const adidIntroNoChallenge = () => [Intro, challengeQuestion, errorChallengeQuestion];
export const adidFlowChallengeQuestion = (isActivatedMFA) => [
	challengeQuestion,
	secureSign(isActivatedMFA),
];
export const adidFlowNoChallengeQuestion = () => [challengeQuestion, errorChallengeQuestion];
export const adidFlowSecureSign = (isActivatedMFA) => [secureSign(isActivatedMFA)];
export const adidFlowSecureSignNoChallenge = () => [errorChallengeQuestion];

export const checkPopUpShow = (adAwarenessClicked, isActivated, adidModuleAvailable) => {
	return adAwarenessClicked < 3 && !isActivated && adidModuleAvailable;
};

export const handleIAMModal = async ({
	isActivatedMFA,
	challenge,
	setIAMModalSlides,
	setIsIAMModalVisible,
	dispatch,
}) => {
	const hasEnrollChallengeQuestion = await challenge.getQuestions({});
	setIAMModalSlides(
		hasEnrollChallengeQuestion ? adidIntroFull(isActivatedMFA) : adidIntroNoChallenge(),
	);
	setIsIAMModalVisible(true);
	dispatch(adAwarenessClicked());
};

export const handleIAMModalNoChallengeQuestion = ({ setIAMModalSlides, setIsIAMModalVisible }) => {
	setIAMModalSlides([errorChallengeQuestion]);
	setIsIAMModalVisible(true);
};
