import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

import {
	addProspect,
	getAllLeadGenBranches,
	getBranch,
	getLeadGen,
	getSalesPersonnel,
	getUser,
	resetAddLeadForm,
	updateSelectedBranch,
} from 'stores';
import { dateFormat } from 'components';
import { routes } from 'navigations';
import { SUCCESS } from 'constant';

import { LG360DetailsFormScreen } from './component';
import {
	findProductName,
	formatStaffId,
	GET_SALES_PERSONNEL_ERROR_MESSAGE,
	SYSTEM_AUTO_ASSIGN,
} from '../utils';
import { showFailure } from 'utils';

export const LG360DetailsForm = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const today = Moment().toDate();
	const { productCode, name, contactNo, customerAliasId } = route.params || {};
	const { staffId } = useSelector(getUser);
	const formattedStaffId = formatStaffId(staffId);
	const { activeSalesPersonnel, status, products, referral, idNo, selectedBranch } =
		useSelector(getLeadGen);
	const { regBrDeptCode } = referral || {};
	const sortedBranches = useSelector(getAllLeadGenBranches);
	const productName = findProductName({ productCode, productList: products });
	const [salesPersonnelDisabled, setSalesPersonnelDisabled] = useState(true);
	const initialValues = {
		productName: productName ?? '',
		dateInterested: today,
		brDeptCode: '',
		salesPersonStaffNo: '',
		salesPersonnelID: '',
		referralStaffNo: formattedStaffId ?? '',
		referralBranchDeptCode: regBrDeptCode ?? '',
		remarks: '',
	};

	useEffect(() => {
		dispatch(resetAddLeadForm());
		dispatch(getBranch());
	}, []);

	useEffect(() => {
		selectedBranch ? setSalesPersonnelDisabled(false) : setSalesPersonnelDisabled(true);
	}, [selectedBranch]);

	const handlePreferredBranchSelected = async (brDeptCode) => {
		dispatch(updateSelectedBranch(brDeptCode));
		const { payload } = await dispatch(getSalesPersonnel({ brDeptCode }));
		if (payload.problem) {
			return showFailure(GET_SALES_PERSONNEL_ERROR_MESSAGE);
		}
	};

	const handleSubmit = async ({
		dateInterested,
		brDeptCode,
		referralStaffNo,
		remarks,
		salesPersonStaffNo,
	}) => {
		if (salesPersonStaffNo === SYSTEM_AUTO_ASSIGN.fieldValue) {
			salesPersonStaffNo = '';
		}
		const { payload } = await dispatch(
			addProspect({
				customerAliasId,
				idNo,
				name,
				contactNo,
				productCode,
				dateInterested: Moment(dateInterested).format(dateFormat.BACKEND_DATE),
				brDeptCode,
				salesPersonStaffNo,
				refStaffNo: referralStaffNo,
				refRegBrDeptCode: regBrDeptCode,
				remarks,
			}),
		);
		dispatch(resetAddLeadForm());
		navigation.navigate(routes.HOME);
		return navigation.navigate(routes.LG360_ACKNOWLEDGEMENT, {
			addProspectResult: payload.problem ?? SUCCESS,
		});
	};

	const props = {
		handlePreferredBranchSelected,
		handleSubmit,
		initialValues,
		name,
		activeSalesPersonnel,
		sortedBranches,
		customerAliasId,
		status,
		salesPersonnelDisabled,
	};

	return <LG360DetailsFormScreen {...props} />;
};
