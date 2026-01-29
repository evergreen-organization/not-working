import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCompletedSelfTestResults, getComplete } from 'stores';
import { showFailure } from 'utils';
import { routes } from 'navigations';
import { LOADING } from 'constant';

import { CompleteAdministerTabView } from './component';

export const CompleteAdministerTab = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const info = useSelector(getComplete);
	const { status, list } = info;

	useEffect(() => {
		(async () => {
			await fetchResult();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchResult = async () => {
		const { payload } = await dispatch(fetchCompletedSelfTestResults());
		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};
	const onRefresh = async () => {
		await fetchResult();
	};

	const handleItemPress = (item) => {
		navigation.navigate(routes.COVID_APPROVE_DETAIL, { item });
	};

	const props = {
		onRefresh,
		handleItemPress,
		data: list,
		loading: status === LOADING,
	};

	return <CompleteAdministerTabView {...props} />;
};
