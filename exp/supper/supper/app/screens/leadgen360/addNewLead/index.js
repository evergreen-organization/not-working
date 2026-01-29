import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllLeadGenProducts,
	getCustomer,
	getLeadGen,
	resetLeadIdNo,
	updateCheckICStatus,
	verifyCustomerProduct,
} from 'stores';
import { routes } from 'navigations';

import { LG360NewLeadScreen } from './component';
import { FOUND, IDLE } from '../utils';
import { showFailure } from 'utils';
import { Keyboard } from 'react-native';

export const LG360NewLead = ({ navigation }) => {
	const dispatch = useDispatch();
	const { name, contactNo, icStatus, idNo } = useSelector(getLeadGen);
	const products = useSelector(getAllLeadGenProducts);
	const [viewState, setViewState] = useState(LG360NewLeadScreen.states.default);
	const icFormInitialValues = {
		idNo: '',
	};

	const getLeadInitialValues = () => {
		if (icStatus === FOUND) {
			return {
				name: name ?? '',
				contactNo: contactNo ?? '',
				productInterested: '',
			};
		}

		return {
			name: '',
			contactNo: '',
			productInterested: '',
		};
	};

	const handleCheckIc = async ({ idNo }) => {
		Keyboard.dismiss();
		const formattedIC = idNo.replace(/-/g, '');
		const { payload } = await dispatch(getCustomer({ idNo: formattedIC }));

		if (payload.status === 200 || payload.status === 404) {
			return setViewState(LG360NewLeadScreen.states.icChecked);
		}

		return showFailure(payload.problem);
	};

	const handleIcChange = () => {
		if (icStatus !== IDLE) {
			setViewState(LG360NewLeadScreen.states.default);
			dispatch(updateCheckICStatus(IDLE));
		}
	};

	const handleSubmit = async ({ name, contactNo, productInterested }) => {
		const { payload } = await dispatch(
			verifyCustomerProduct({
				idNo,
				productCode: productInterested,
				name,
				contactNo,
			}),
		);
		if (payload.problem) {
			return showFailure(payload.problem);
		}
		if (!payload.data.exist) {
			return navigation.navigate(routes.LG360_NEW_LEAD_DETAILS_FORM, {
				productCode: productInterested,
				name,
				contactNo,
			});
		}

		return navigation.navigate(routes.LG360_ACKNOWLEDGEMENT);
	};

	const handleNoICPress = () => {
		setViewState(LG360NewLeadScreen.states.noIC);
		dispatch(resetLeadIdNo());
	};
	const handleHeaderLeftBtn = () => navigation.goBack();

	const props = {
		handleCheckIc,
		handleIcChange,
		handleSubmit,
		handleNoICPress,
		handleHeaderLeftBtn,
		getLeadInitialValues,
		icStatus,
		icFormInitialValues,
		products,
		viewState,
	};

	return <LG360NewLeadScreen {...props} />;
};
