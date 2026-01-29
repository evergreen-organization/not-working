import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useApi } from 'hooks';
import { fetchApproverList, getCovid, getLeave, uploadSelfTestResult } from 'stores';
import { showFailure, showSuccess } from 'utils';
import { routes } from 'navigations';
import { LOADING } from 'constant';

import { UploadResultView } from './component';

export const UploadResult = ({ navigation }) => {
	const dispatch = useDispatch();
	const getApproverList = useApi(fetchApproverList);
	const { approverList, savedApprover } = useSelector(getLeave);
	const { uploadStatus } = useSelector(getCovid);
	const user = useSelector((state) => state.user);
	const initialValues = {
		base64Image: '',
		testResult: '',
		approverId: savedApprover.Id ?? '',
	};

	useEffect(() => {
		(async () => await loadApproverList())();
	}, []);

	const loadApproverList = async () => {
		await getApproverList.request();
	};

	const handleSubmit = async ({ base64Image, testResult, approverId }) => {
		const { payload } = await dispatch(
			uploadSelfTestResult({
				base64Image,
				testResult,
				approverId,
				staffName: user.name,
			}),
		);
		if (payload.problem) {
			return showFailure(payload.problem);
		}

		showSuccess('Success', 'Self Test Result successfully submitted');
		return navigation.navigate(routes.COVID_TEST_HISTORY);
	};

	const handleBack = () => navigation.goBack();

	const props = {
		handleSubmit,
		handleBack,
		loading: uploadStatus === LOADING,
		approverList,
		initialValues,
	};

	return <UploadResultView {...props} />;
};
