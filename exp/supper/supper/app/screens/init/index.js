import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import routes from 'navigations/routes';
import { getPin, getSoftToken } from 'stores';
import { useFocusEffect } from '@react-navigation/native';
import { useChallenge } from 'hooks';
import { InitLoadingView } from './component';

export const InitLoading = ({ navigation }) => {
	const challenge = useChallenge();
	const { pinEnrolled } = useSelector(getPin) || {};
	const { isActivated } = useSelector(getSoftToken);

	useFocusEffect(
		useCallback(() => {
			setTimeout(() => start(), 10);
		}, []), // eslint-disable-line react-hooks/exhaustive-deps
	);

	const start = async () => {
		if (!pinEnrolled) {
			const result = await challenge.getQuestions({});
			return result ? navigation.replace(routes.ENROLL_PIN) : finish();
		}

		return isActivated ? finish() : navigation.replace(routes.SOFT_TOKEN_CHECKIC);
	};

	const finish = () => {
		navigation.navigate(routes.TAB_NAVIGATOR);
	};

	return <InitLoadingView />;
};
