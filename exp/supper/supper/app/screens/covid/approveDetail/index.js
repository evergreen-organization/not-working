import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	approveSelfTestResult,
	fetchSelfTestResultImage,
	getTransaction,
	rejectSelfTestResult,
} from 'stores';
import { showFailure, showSuccess } from 'utils';
import { LOADING } from 'constant';
import { routes } from 'navigations';

import { ApproveDetailView } from './component';

export const ApproveDetail = ({ navigation, route }) => {
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

		return setImageUri(payload.data.base64Image);
	};

	const handleSubmit = async () => {
		const { payload } = await dispatch(approveSelfTestResult({ id }));
		if (payload.data?.success) {
			showSuccess('Success', 'Test result approved successfully');
			return navigation.navigate(routes.COVID_APPROVE_RESULT);
		}
		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};

	const handleReject = async () => {
		const { payload } = await dispatch(rejectSelfTestResult({ id }));
		if (payload.data?.success) {
			showSuccess('Success', 'Test result rejected successfully');
			return navigation.navigate(routes.COVID_APPROVE_RESULT);
		}

		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};

	const props = {
		handleReject,
		handleSubmit,
		loading: transaction.status === LOADING,
		item: route?.params?.item || {},
		imageUri,
	};

	return <ApproveDetailView {...props} />;
};
