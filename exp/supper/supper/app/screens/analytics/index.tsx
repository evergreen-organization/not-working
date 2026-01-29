import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
	analyticsReset,
	getActionById,
	getAllActionIds,
	getAllActions,
} from 'stores';
import { deleteScreenshot } from 'utils';
import { AnalyticsComp } from './component';

export const AnalyticsScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const allActionIds = useSelector(getAllActionIds);
	const allActions = useSelector(getAllActions);

	const [currentActionIndex, setCurrentActionIndex] = useState(0);
	const [aspectRatio, setAspectRatio] = useState(1); //NOTE: aspectRatio is required since screenshots are of different sizes
	const currentAction = useSelector(
		getActionById(allActionIds[currentActionIndex]),
	);

	const currentScreenshotUri = currentAction?.imageUrl;

	useEffect(() => {
		if (currentScreenshotUri) {
			Image.getSize(currentScreenshotUri, (width, height) => {
				setAspectRatio(height === 0 ? 0 : width / height);
			});
		}
	}, [currentScreenshotUri]);

	const handleHeaderBackButton = () => {
		navigation.goBack();
	};

	const handleClearAllButton = () => {
		//delete images
		allActions.forEach((item) => deleteScreenshot(item.imageUrl));

		//reset store
		dispatch(analyticsReset());
	};

	const handlePreviousButton = () => {
		if (currentActionIndex > 0) {
			setCurrentActionIndex(currentActionIndex - 1);
		}
	};

	const handleNextButton = () => {
		if (currentActionIndex < allActionIds.length - 1) {
			setCurrentActionIndex(currentActionIndex + 1);
		}
	};

	const xCoordinate = currentAction?.positionX - 10; //NOTE: minus 10, due to the circle radius is 20px
	const yCoordinate = currentAction?.positionY - 10;

	const props = {
		currentScreenshotUri,
		aspectRatio,
		currentAction,
		yCoordinate,
		xCoordinate,
		handleHeaderBackButton,
		handleClearAllButton,
		handlePreviousButton,
		handleNextButton,
	};

	return <AnalyticsComp {...props} />;
};
