import { EBizCardComponent } from './component';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchEbizData,
	fetchEbizFields,
	fetchTags,
	getBiometric,
	getEbizData,
	updateCardImage,
	updateEbizFields,
} from 'stores';
import {
	captureBusinessCard,
	convertToObject,
	eBizErrorPrompt,
} from '../../../eBizCard/utils/utils';
import { useEffect, useRef, useState } from 'react';

export const EBizCardWidget = ({ onPressCard, onView, onShare }) => {
	const { eBizData } = useSelector(getEbizData);

	const cardInfo = convertToObject(eBizData);
	const dispatch = useDispatch();
	const biometric = useSelector(getBiometric);
	const [isLoading, setIsLoading] = useState(false);
	const businessCardRef = useRef(null);
	useEffect(() => {
		fetchEBizCardData().then(() => {});
		fetchEBizAllTags();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setTimeout(() => {
			captureBusinessCard(businessCardRef).then((uri) => {
				dispatch(updateCardImage(uri));
			});
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eBizData]);

	const fetchEBizCardData = async () => {
		setIsLoading(true);
		// Get User eBiz card user data
		const responseEBizData = await dispatch(fetchEbizData({ adId: biometric.userid }));
		if (!responseEBizData.payload.ok) {
			return eBizErrorPrompt(responseEBizData.payload);
		}
		// if User data is empty, need init all the user fields.
		// Get all fields for eBiz card
		if (responseEBizData.payload?.data?.length === 0) {
			const responseFields = await dispatch(fetchEbizFields());
			if (!responseFields.payload.ok) {
				return eBizErrorPrompt(responseFields.payload);
			}
			// Update all fields for eBiz card to true for User Data
			const requestEnableAllField = responseFields.payload.data.map((item) => ({
				...item,
				isVisible: true,
			}));
			const responseUpdateFields = await dispatch(
				updateEbizFields({ fields: requestEnableAllField }),
			);
			if (!responseUpdateFields.payload?.ok) {
				return eBizErrorPrompt(responseUpdateFields.payload);
			}
			// Get all eBizCard User Data
			const { payload } = await dispatch(fetchEbizData({ adId: biometric.userid }));
			if (!payload?.ok) {
				return eBizErrorPrompt(payload);
			}
		}
		setIsLoading(false);
	};
	const fetchEBizAllTags = async () => {
		const { payload } = await dispatch(fetchTags());
		if (!payload?.ok) {
			return eBizErrorPrompt(payload);
		}
	};

	const props = {
		cardInfo,
		onPressCard,
		onView,
		onShare,
		isLoading,
	};
	return <EBizCardComponent {...props} ref={businessCardRef} />;
};
