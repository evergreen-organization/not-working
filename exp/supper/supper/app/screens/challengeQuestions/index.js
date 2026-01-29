import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from 'navigations';
import { CONNECTION_TIMEOUT, CONNECTION_TIMEOUT_MSG, tranApiType } from 'constant';
import { useBiometric, useChallenge, useRSA } from 'hooks';
import {
	challengeQuestionsReset,
	getAdAuthentication,
	init as initPin,
	logout,
	submitChallengeQuestion,
} from 'stores';
import { showFailure, showSuccess } from 'utils';
import ChallengeQuestionsView from './component';
import {
	ERR_MSG_MAX_ATTEMPTS,
	ERR_MSG_TRANSACTION_FAILED,
	ERR_MSG_TRY_AGAIN,
	MSG_ADID_UNLOCK_SUCCESS,
	MSG_PASSWORD_RESET_SUCCESS,
	MSG_PIN_ENROL_SUCCESS,
	MSG_SUCCESSFUL,
} from './constant';

export const ChallengeQuestions = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const rsa = useRSA();
	const {
		api,
		apiParam,
		onSuccessParam,
		tranType,
		tranApiType: type,
		payload: responseData,
	} = route.params || {};

	const { questions } = useSelector(getAdAuthentication) || {};
	const [submissionLoading, setSubmissionLoading] = useState(false);
	const answersRef = useRef();
	const transactionObj = useRef();
	const biometricUtils = useBiometric();
	const challenge = useChallenge();

	const [startSecureSign, setStartSecureSign] = useState(false);

	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef(null);
	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const preHandleSubmitAnswer = (values) => {
		answersRef.current = { ...answersRef.current, ...values };

		if (currentIndex < 2) {
			return carouselRef.current.scrollToIndex({ index: currentIndex + 1 });
		}

		(async () => await handleSubmitAnswer())();
	};

	const handleSubmitAnswer = () => {
		setSubmissionLoading(true);
		return tranType ? submitPBSSApi() : submitApi();
	};

	const submitPBSSApi = async () => {
		//Require Soft Token Signing
		const data = await rsa.encryptIAM({
			...answersRef.current,
			...responseData?.secure,
			type: tranType,
		});
		navigation.navigate(routes.MFA_PIN, {
			data,
			isGenSig: true,
			navSuccess: navigateSuccess,
			type,
		});
	};

	const submitApi = async () => {
		const encryptedAnswer = await rsa.encryptIAM({ ...answersRef.current });
		const { payload } = await dispatch(api({ ...apiParam, data: encryptedAnswer }));
		const { data } = payload || {};

		if (data?.status === 'S') {
			return navigateSuccess();
		}

		showFailure('Error', data?.message);
		await reinitChallengeQuestion(data?.status);
		setSubmissionLoading(false);
	};

	const reinitChallengeQuestion = async (status) => {
		if (status !== 'E') {
			return;
		}
		const result = await challenge.getQuestions({ init: true });
		if (!result) {
			navigation.navigate(routes.TAB_NAVIGATOR);
			dispatch(challengeQuestionsReset());
		}
	};

	const navigateFailure = (response) => {
		handleCancel();
		if (!response) {
			navigation.navigate(routes.TAB_NAVIGATOR);
			return showFailure(ERR_MSG_TRANSACTION_FAILED);
		}
		const { status, data } = response;
		status === CONNECTION_TIMEOUT
			? showFailure(CONNECTION_TIMEOUT_MSG, ERR_MSG_TRY_AGAIN)
			: showFailure(ERR_MSG_TRANSACTION_FAILED, data?.message);

		return reinitChallengeQuestion(data?.status);
	};

	const navigateSuccess = async (response) => {
		handleCancel();
		if (type === tranApiType.ENROLL_PIN) {
			navigation.navigate(routes.TAB_NAVIGATOR);
			dispatch(challengeQuestionsReset());
			navigation.navigate(routes.INIT_LOADING);
			showSuccess(MSG_SUCCESSFUL, MSG_PIN_ENROL_SUCCESS);
			await biometricUtils.storeBiometricPIN(onSuccessParam.pin);
			return;
		}
		if (type === tranApiType.UNLOCK_ADID) {
			navigation.navigate(routes.TAB_NAVIGATOR);
			dispatch(challengeQuestionsReset());
			return showSuccess(MSG_SUCCESSFUL, MSG_ADID_UNLOCK_SUCCESS);
		}
		if (type === tranApiType.RESET_ADID) {
			navigation.navigate(routes.TAB_NAVIGATOR);
			dispatch(challengeQuestionsReset());
			return showSuccess(MSG_SUCCESSFUL, MSG_PASSWORD_RESET_SUCCESS);
		}
	};

	const handleComplete = async ({ isSuccess, isPinLocked, response }) => {
		// on Pin Validation Complete
		if (isPinLocked) {
			handleCancel();
			dispatch(initPin());
			dispatch(logout());
			return showFailure(ERR_MSG_MAX_ATTEMPTS);
		}

		if (!isSuccess) {
			return navigateFailure(response);
		}

		// Submit Challenge Question
		const { payload } = await dispatch(
			submitChallengeQuestion({ secfaInfo: transactionObj.current }),
		);
		//Navigate on Failure
		if (payload?.problem) {
			return navigateFailure(payload);
		}

		return navigateSuccess();
	};

	const handleCancel = () => {
		setStartSecureSign(false);
		setSubmissionLoading(false);
	};

	const handleStepIndicator = (index) => {
		if (index < currentIndex) {
			setCurrentIndex(index);
			carouselRef.current.scrollToIndex({ index });
		}
	};

	const handleSnapToItem = (index) => {
		setCurrentIndex(index);
	};

	const handleHeaderLeftBtn = () => {
		navigation.goBack();
	};

	const props = {
		handleSnapToItem,
		handleComplete,
		handleCancel,
		handleStepIndicator,
		preHandleSubmitAnswer,
		handleHeaderLeftBtn,
		name: route.name,
		currentIndex,
		carouselRef,
		questions,
		transactionObj: transactionObj.current,
		startSecureSign,
		submissionLoading,
	};

	const refs = {
		viewableItemsChanged,
		carouselRef,
	};

	return <ChallengeQuestionsView {...props} ref={refs} />;
};

export default ChallengeQuestions;
