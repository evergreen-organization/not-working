import React, { useEffect, useRef, useState } from 'react';
import { EBizHomeComp } from './component';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchEbizData,
	fetchEbizFields,
	fetchTags,
	getBiometric,
	getCardImage,
	getEbizData,
	getTagLength,
	updateCardImage,
	updateEbizFields,
} from 'stores';

import { convertToObject, handleShare } from '../utils/utils';
import { USER_ANALYTICS } from 'constant';
import { addAnalyticCheckpoint } from 'utils';

export const EBizHome = ({ navigation }) => {
	const [isPopUpVisible, setIsPopUpVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const badgeCount = useSelector(getTagLength);
	const biometric = useSelector(getBiometric);
	const cardImage = useSelector(getCardImage);
	const { eBizData } = useSelector(getEbizData);
	const viewRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		if (eBizData.length === 0) {
			fetchEBizCardData().then(() => {});
			fetchEBizAllTags();
		}
	}, []);
	const fetchEBizCardData = async () => {
		setIsLoading(true);
		// Get User eBiz card user data
		const responseEBizData = await dispatch(fetchEbizData({ adId: biometric.userid }));

		// if User data is empty, need init all the user fields.
		// Get all fields for eBiz card
		if (responseEBizData.payload?.data?.length === 0) {
			const responseFields = await dispatch(fetchEbizFields());

			// Update all fields for eBiz card to true for User Data
			const requestEnableAllField = responseFields.payload.data.map((item) => ({
				...item,
				isVisible: true,
			}));
			await dispatch(updateEbizFields({ fields: requestEnableAllField }));

			await dispatch(fetchEbizData({ adId: biometric.userid }));
		}
		setIsLoading(false);
	};
	const fetchEBizAllTags = async () => {
		await dispatch(fetchTags());
	};
	const handleCaptureBusinessCard = (cardSS) => {
		dispatch(updateCardImage(cardSS));
	};
	const cardInfo = convertToObject(eBizData);
	const handleBasicShare = (e) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.EBIZCARD_SCREENS.HOME,
			buttonEvent: e.nativeEvent,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.SHARE_BAISC_CARD,
		}).then();
		handleShare(eBizData, cardImage);
	};

	function handleGoBack() {
		navigation.goBack();
	}

	function handleNavigation(route: string) {
		navigation.navigate(route);
	}

	const handlePopUp = () => {
		setIsPopUpVisible(!isPopUpVisible);
	};
	const props: any = {
		badgeCount,
		cardImage,
		cardInfo,
		isPopUpVisible,
		isLoading,
		setIsPopUpVisible,
		handleGoBack,
		handleNavigation,
		handleCaptureBusinessCard,
		handleBasicShare,
		handlePopUp,
	};
	return <EBizHomeComp {...props} />;
};
