import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import { useIAMModal } from 'contexts';
import { getMFAStatus } from 'stores';
import { useChallenge } from 'hooks';
import { routes } from 'navigations';
import UserGuidePdf from 'assets/adid/adid-user-guide.pdf';

import { ADIDInstructionScreen } from './component';
import {
	CHALLENGE_QUESTIONS,
	SECURE_SIGN,
	adidFlowChallengeQuestion,
	adidFlowSecureSign,
	adidFlowSecureSignNoChallenge,
	adidFlowNoChallengeQuestion,
} from '../utils';

const UserGuidePdfAndroid = 'bundle-assets://adid-user-guide.pdf';

export const ADIDInstruction = ({ navigation }) => {
	const isActivatedMFA = useSelector(getMFAStatus);
	const challenge = useChallenge();
	const { setIAMModalSlides, setIsIAMModalVisible } = useIAMModal();
	const [isLoading, setIsLoading] = useState(false);
	const [showPDFModal, setShowPDFModal] = useState(false);
	const [navigationFlow, setNavigationFlow] = useState({});
	const [pdfSource, setPdfSource] = useState({});

	useEffect(() => {
		renderInstructionButton().then();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderInstructionButton = async () => {
		setIsLoading(true);
		const hasEnrollChallengeQuestion = await challenge.getQuestions({});
		setNavigationFlow({
			[CHALLENGE_QUESTIONS]: hasEnrollChallengeQuestion
				? adidFlowChallengeQuestion(isActivatedMFA)
				: adidFlowNoChallengeQuestion(),
			[SECURE_SIGN]: hasEnrollChallengeQuestion
				? adidFlowSecureSign(isActivatedMFA)
				: adidFlowSecureSignNoChallenge(),
		});
		setIsLoading(false);
	};

	const handlePopUp = async (type) => {
		setIAMModalSlides(navigationFlow[type]);
		setIsIAMModalVisible(true);
	};

	const handleFAQPress = () => navigation.navigate(routes.ADID_FAQ);
	const handleCloseModal = () => setShowPDFModal(false);
	const handleShowPdf = () => {
		setShowPDFModal(true);
		if (Platform.OS === 'ios') {
			return setPdfSource(UserGuidePdf);
		}
		return setPdfSource({ uri: UserGuidePdfAndroid });
	};

	const handleGoBack = () => navigation.goBack();

	const props = {
		handleShowPdf,
		handleFAQPress,
		handlePopUp,
		handleCloseModal,
		handleGoBack,
		isLoading,
		showPDFModal,
		pdfSource,
	};

	return <ADIDInstructionScreen {...props} />;
};
