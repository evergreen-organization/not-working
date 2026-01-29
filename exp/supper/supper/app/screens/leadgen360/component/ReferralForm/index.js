import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { Alert } from 'react-native';
import _ from 'lodash';

import {
	getAllLeadGenRegionBranches,
	getLeadGen,
	getReferral,
	getRegionBranchDepartment,
	getUser,
	updateReferral,
} from 'stores';
import ReferralFormView from './component';
import { USER_ANALYTICS } from 'constant';
import { addAnalyticCheckpoint } from 'utils';

export const ReferralForm = ({ referralStaffNoFormName, referralStaffBranchFormName }) => {
	const dispatch = useDispatch();
	const viewRef = useRef();
	const { status, referral } = useSelector(getLeadGen);
	const { staffId } = useSelector(getUser);
	const sortedRegionBranch = useSelector(getAllLeadGenRegionBranches);

	const [visible, setVisible] = useState(false);
	const [isReferralFound, setIsReferralFound] = useState(true);
	const [searchedReferral, setSearchedReferral] = useState({});

	const { touched, errors, setTouched, setFieldValue } = useFormikContext();

	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.LEADGEN360,
		view: viewRef,
	};

	useEffect(() => {
		/* get the default referral the first time or reset form */
		(async () => _.isEmpty(referral) && (await getDefaultReferral()))();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getDefaultReferral = async () => {
		const result = await handleCheckReferral(staffId);
		dispatch(updateReferral(result));
	};
	const handleUserAnalytics = async (event) => {
		const checkReferralConfig = {
			screen: USER_ANALYTICS.LEADGEN360_SCREENS.ADD_PROSPECT_FORM,
			buttonEvent: event.nativeEvent,
			action: USER_ANALYTICS.LEADGEN360_ACTIONS.CHECK_REFERRAL,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...checkReferralConfig });
	};

	const handleCheckReferral = async (staffNo, event) => {
		if (event) {
			await handleUserAnalytics(event);
		}

		setIsReferralFound(true);
		setFieldValue(referralStaffBranchFormName, '');
		const { payload } = await dispatch(getReferral({ staffNo }));

		if (payload.problem) {
			referralIDNotFoundAlert();
			setIsReferralFound(false);
			return setSearchedReferral({});
		}
		setSearchedReferral(payload.data);
		/* if referral branch not return, get the list of branch for user to select*/
		const { regBrDeptCode, regBrDeptName, isEditable } = payload.data || {};
		/* 2023-4458 if referral no return referral branch name but
		referral branch code still need to prompt user
		 to choose region branch */
		const branchCode = !regBrDeptName || !regBrDeptCode ? '' : regBrDeptCode;
		setFieldValue(referralStaffBranchFormName, branchCode);

		// Only get region branch if editable or branch code empty
		if (isEditable || !branchCode) {
			await dispatch(getRegionBranchDepartment());
		}

		return payload.data;
	};

	const referralIDNotFoundAlert = () => {
		Alert.alert('Error', 'Referral Staff ID not found');
	};

	const handleSelectReferralBranch = (regBrDeptCode) => {
		setSearchedReferral({
			...searchedReferral,
			regBrDeptCode: regBrDeptCode,
		});
	};

	const handleModalOpen = () => setVisible(true);
	const handleModalCancel = () => {
		setVisible(false);
		setIsReferralFound(true);
		/*set the form value with the current referral*/
		setSearchedReferral(referral);
		setFieldValue(referralStaffNoFormName, referral?.staffNo);
		setFieldValue(referralStaffBranchFormName, referral?.regBrDeptCode);
	};
	const handleModalConfirm = () => {
		setTouched({
			[referralStaffBranchFormName]: true,
			[referralStaffNoFormName]: true,
		});
		if (!isReferralFound) {
			return referralIDNotFoundAlert();
		}
		if (errors[referralStaffNoFormName] || errors[referralStaffBranchFormName]) {
			return;
		}
		dispatch(updateReferral(searchedReferral));
		setVisible(false);
	};

	const props = {
		handleModalOpen,
		handleModalConfirm,
		handleModalCancel,
		handleCheckReferral,
		handleSelectReferralBranch,
		touched,
		referralStaffBranchFormName,
		referralStaffNoFormName,
		visible,
		referral,
		sortedRegionBranch,
		status,
		searchedReferral,
	};

	return <ReferralFormView {...props} ref={viewRef} />;
};
