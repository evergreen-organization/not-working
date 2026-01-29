import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, getBiometric, getTNC } from 'stores';
import { AddTagPopUp } from './AddTagPopUp';
import { QRTagPopUp } from './QRTagPopUp';
import { eBizErrorPrompt } from 'screens/eBizCard/utils/utils';
import { useHandleDeeplink } from 'hooks';
import { USER_ANALYTICS } from 'constant';
import { addAnalyticCheckpoint } from 'utils';

export const DynamicTagPopUp = ({
	isPopUpVisible,
	setIsPopUpVisible,
	handleOpenEBizSharePopUp,
	shouldIgnoreDeeplink,
	path,
}) => {
	const [tag, setTag] = useState('');
	const [isQRVisible, setIsQRVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const biometric = useSelector(getBiometric);
	const [qrValue, setQRValue] = useState('placeholding');
	const { acceptEBCTOU } = useSelector(getTNC);

	const viewRef = useRef();
	const dispatch = useDispatch();

	const refValues = useRef({
		acceptEBCTOU,
	});

	useEffect(() => {
		refValues.current.acceptEBCTOU = acceptEBCTOU;
	}, [acceptEBCTOU]);

	useHandleDeeplink({
		eventActions: {
			shareQrEbiz: () => {
				if (shouldIgnoreDeeplink) {
					return;
				}
				if (refValues.current.acceptEBCTOU) {
					setTag('General Purpose');
					handleShareQR?.();
				} else {
					handleOpenEBizSharePopUp?.();
				}
			},
		},
	});

	const handleGenerateQRCode = (url) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: path,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.UNIQUE_QR_TAG,
		}).then();
		setQRValue(url);
	};

	let tagData = {
		adId: biometric.userid,
		description: tag,
		long: '122',
		lat: '122',
	};

	const hanleClosePopUp = () => {
		setIsPopUpVisible(false);
		setIsQRVisible(false);
		setTag('');
	};
	const handleShareQR = async (e) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: path,
			buttonEvent: e?.nativeEvent,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.SHARE_DYNAMIC_CARD,
		}).then();
		const { payload } = await dispatch(createTag(tagData));
		if (!payload?.ok) {
			setIsLoading(false);
			return eBizErrorPrompt(payload);
		}
		setIsLoading(false);
		setTag('');
		setIsPopUpVisible(false);
		handleGenerateQRCode(payload.data.url);
		await new Promise((resolve) => setTimeout(resolve, 100));
		setIsQRVisible(!isQRVisible);
	};
	return (
		<>
			<AddTagPopUp
				isPopUpVisible={isPopUpVisible}
				setIsPopUpVisible={setIsPopUpVisible}
				tag={tag}
				setTag={setTag}
				onPressShareQR={handleShareQR}
				onPressClosePopUp={hanleClosePopUp}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
			<QRTagPopUp
				isQRVisible={isQRVisible}
				setIsPopUpVisible={setIsQRVisible}
				onPressClosePopUp={hanleClosePopUp}
				qrValue={qrValue}
			/>
		</>
	);
};
