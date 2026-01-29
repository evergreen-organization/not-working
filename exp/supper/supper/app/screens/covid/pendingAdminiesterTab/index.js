import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { fetchPendingSelfTestResults, getPending } from 'stores';
import { showFailure } from 'utils';
import { routes } from 'navigations';
import { LOADING } from 'constant';

import { PendingAdministerView } from './compoenent';

export const PendingAdministerTab = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const info = useSelector(getPending);
	const { status, list } = info;

	useEffect(() => {
		(async () => {
			await retrieveResult();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const retrieveResult = async () => {
		const { payload } = await dispatch(fetchPendingSelfTestResults());
		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};
	const handleRefresh = async () => {
		await retrieveResult();
	};

	const handlePendingItemPress = (item) => {
		navigation.navigate(routes.COVID_APPROVE_DETAIL, { item });
	};

	const props = {
		handleRefresh,
		handlePendingItemPress,
		data: list,
		loading: status === LOADING,
	};

	return <PendingAdministerView {...props} />;
};
