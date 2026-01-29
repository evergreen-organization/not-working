import React, { useState } from 'react';
import { ECardChallengeComp } from './component';
import { useDispatch, useSelector } from 'react-redux';
import { getECardAdvent, unlockCard } from 'stores';
import {
	ECARD_CHALLENGES,
	ECARD_CHALLENGES_BUTTON_TYPE,
} from '../utils/challenge';
import { formatVideoMedia } from '../utils';
import Share from 'react-native-share';
import { routes } from 'navigations';
import { Linking } from 'react-native';

export const ECardChallenge = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { compliedTraining } = useSelector(getECardAdvent);
	const { id } = route.params || {};
	const [isComplete, setIsComplete] = useState(false);

	const { buttonType, props } = ECARD_CHALLENGES[id] || {};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleComplete = async () => {
		//share eCard
		if (buttonType === ECARD_CHALLENGES_BUTTON_TYPE.share) {
			const shareOptions = await formatVideoMedia(props?.videoPath);
			Share.open(shareOptions)
				.then((res) => {})
				.catch((err) => {
					console.log('err share', err);
				});
			setIsComplete(true);
			dispatch(unlockCard({ id }));
		}
		// navigate to the external module
		if (buttonType === ECARD_CHALLENGES_BUTTON_TYPE.externalModule) {
			if (props?.path === routes.TRAINING) {
				if (compliedTraining >= 3) {
					dispatch(unlockCard({ id }));
					setIsComplete(true);
				}
				Linking.openURL('https://learn.pbebank.com/Account/Login');
			}
		}
	};

	const handleCompleteSurvey = () => {
		dispatch(unlockCard({ id }));
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	const params = {
		handleGoBack,
		handleComplete,
		handleCancel,
		handleCompleteSurvey,
		id,
		isComplete,
	};
	return <ECardChallengeComp {...params} />;
};
