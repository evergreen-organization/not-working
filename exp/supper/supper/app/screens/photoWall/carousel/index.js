import React, { createRef, useMemo, useState } from 'react';
import PhotoWallWithTemplateScreen from './component';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTemplate, getECardsAdventById, updateCurrentTemplate } from 'stores';
import { shareMediaFile, TemplateList, VIDEO } from '../utils';
import { routes } from 'navigations';
import { addAnalyticCheckpoint } from 'utils';
import { USER_ANALYTICS } from 'constant';

export const PhotoWallWithTemplate = ({ navigation }) => {
	const dispatch = useDispatch();
	const currentTemplate = useSelector(getCurrentTemplate);
	const isUnlocked = useSelector(
		getECardsAdventById(TemplateList[currentTemplate]?.id),
	)?.isUnlocked;
	const [isPhotoLoading, setIsPhotoLoading] = useState(false);
	const [touchLocation, setTouchLocation] = useState();
	const [isChallengeModalVisible, setIsChallengeModalVisible] = useState(false);
	const [selectedChallenge, setSelectedChallenge] = useState();

	const templateRefs = useMemo(() => TemplateList.map(() => createRef()), []);

	//For Analytics
	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.E_CARDS,
	};

	const onShare = async () => {
		// catch error if any promise rejected
		try {
			setIsPhotoLoading(true);
			const template = TemplateList?.find((item) => item?.id === currentTemplate);
			const { type, data } = template ?? {};

			if (template?.type === VIDEO) {
				await shareMediaFile({ type, data });
			} else {
				const index = TemplateList?.findIndex((item) => item?.id === currentTemplate);
				const uri = await templateRefs?.[index]?.current?.capture();

				const base64 = uri.replace(/(\r\n|\n|\r)/gm, '');
				await shareMediaFile({ type, data, photoBase64: `data:image/png;base64,${base64}` });
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsPhotoLoading(false);
		}
	};

	const onTemplateChange = async (item) => {
		dispatch(updateCurrentTemplate(item?.id));

		if (!touchLocation) {
			return;
		}
		const carouselConfig = {
			screen: USER_ANALYTICS.ECARD_SCREENS.CAROUSEL,
			buttonEvent: touchLocation,
			action: `${USER_ANALYTICS.ECARD_ACTIONS.CAROUSEL_VIEW}${item?.id}`,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...carouselConfig });
	};

	const onEdit = () => {
		navigation.navigate(routes.CARD_TEXT_FORM, {
			data: TemplateList?.find((item) => item?.id === currentTemplate)?.data,
		});
	};

	const handleBackPressed = () => {
		navigation.goBack();
	};

	const handleTouchEvents = (e) => {
		e.persist();
		setTouchLocation(e?.nativeEvent);
	};

	const handleUnlockPress = (id) => {
		setSelectedChallenge(id);
		setIsChallengeModalVisible(true);
	};

	const handleChallengePress = () => {
		setIsChallengeModalVisible(false);
	};

	const handleChallengeCancel = () => setIsChallengeModalVisible(false);

	const props = {
		handleBackPressed,
		handleTouchEvents,
		handleUnlockPress,
		handleChallengePress,
		handleChallengeCancel,
		onShare,
		onTemplateChange,
		onEdit,
		isPhotoLoading,
		currentTemplate,
		templateRefs,
		isUnlocked,
		isChallengeModalVisible,
		selectedChallenge,
		isSharing: isPhotoLoading,
	};

	return <PhotoWallWithTemplateScreen {...props} />;
};
