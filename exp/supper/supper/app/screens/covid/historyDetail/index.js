import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchSelfTestResultImage,
	getTransaction,
	withdrawSelfTestResult,
} from 'stores';
import { showFailure, showSuccess } from 'utils';
import { routes } from 'navigations';
import { LOADING } from 'constant';

import { HistoryDetailView } from './component';

export const HistoryDetail = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const transaction = useSelector(getTransaction);
	const { id, base64Image } = route?.params?.item || {};
	const [imageUri, setImageUri] = useState();

	useEffect(() => {
		(async () => {
			if (!base64Image) {
				await getImage();
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getImage = async () => {
		const { payload } = await dispatch(fetchSelfTestResultImage({ id }));
		if (payload.problem) {
			return showFailure(payload.problem);
		}
		if (payload.data?.base64Image) {
			setImageUri(payload.data.base64Image);
		}
	};

	const handleWithdraw = async () => {
		Alert.alert(
			'Are you sure',
			'To withdraw the pending approval self test result?',
			[
				{ text: 'No', onPress: () => {} },
				{
					text: 'Yes',
					onPress: () => submitWithdraw().then(),
				},
			],
		);
	};

	const submitWithdraw = async () => {
		const { payload } = await dispatch(withdrawSelfTestResult({ id }));
		if (payload.data?.success) {
			showSuccess('Success', 'Test result withdrawn successfully');
			return navigation.navigate(routes.COVID_TEST_HISTORY);
		}
		showFailure('Fail', 'Test result failed to withdraw');
	};

	const props = {
		handleWithdraw,
		loading: transaction.status === LOADING,
		imageUri,
		item: route?.params?.item || {},
	};

	return <HistoryDetailView {...props} />;
};
