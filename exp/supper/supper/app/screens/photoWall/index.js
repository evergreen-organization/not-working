import React, { useEffect, useRef } from 'react';
import PhotoWallGalleryViewScreen from './component';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotoWall, resetPhotoWall, updateCurrentTemplate } from 'stores';
import { routes } from 'navigations';
import { addAnalyticCheckpoint } from 'utils';
import { USER_ANALYTICS } from 'constant';
import { Config } from '../../../env';

export const PhotoWallGalleryView = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const viewRef = useRef();
	const { version } = useSelector(getPhotoWall);

	//For Analytics
	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.E_CARDS,
		view: viewRef,
	};

	useEffect(() => {
		//check on eCard version, if not match reset the store again
		if (version !== Config.E_CARDS_VERSION) {
			dispatch(resetPhotoWall());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNavigation = async (template, e) => {
		e.persist();

		const galleryViewConfig = {
			screen: USER_ANALYTICS.ECARD_SCREENS.GALLERY_VIEW,
			buttonEvent: e?.nativeEvent,
			action: `${USER_ANALYTICS.ECARD_ACTIONS.VIEW}${template}`,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...galleryViewConfig });

		dispatch(updateCurrentTemplate(template));
		navigation.navigate(routes.PHOTO_WALL);
	};

	const handleHeaderLeftBtn = async (e) => {
		const galleryViewConfig = {
			screen: USER_ANALYTICS.ECARD_SCREENS.GALLERY_VIEW,
			buttonEvent: e?.nativeEvent,
			action: USER_ANALYTICS.BACK_ACTION,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...galleryViewConfig });
		navigation.goBack();
	};

	const props = {
		handleNavigation,
		handleHeaderLeftBtn,
	};

	return <PhotoWallGalleryViewScreen {...props} ref={viewRef} />;
};
