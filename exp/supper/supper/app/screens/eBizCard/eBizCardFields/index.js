import React, { useEffect, useRef, useState } from 'react';
import { EBizCardFieldsComponent } from './component';
import { HIDDEN_FIELDS } from '../constant/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchEbizData,
	fetchEbizFields,
	getBiometric,
	getEbizData,
	updateEbizFields,
} from 'stores';

import { eBizErrorPrompt } from '../utils/utils';
import { addAnalyticCheckpoint } from 'utils';
import { USER_ANALYTICS } from 'constant';

export const EBizCardFields = ({ navigation }) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [isPopUpVisible, setIsPopUpVisible] = useState(false);
	const { eBizData } = useSelector(getEbizData);
	const biometric = useSelector(getBiometric);
	const [isLoading, setIsLoading] = useState(false);
	const [analytics, setAnalytics] = useState([]);
	const viewRef = useRef();
	const dispatch = useDispatch();
	useEffect(() => {
		fetchFields().then(() => {});
	}, []);

	const fetchFields = async () => {
		setIsLoading(true);
		const { payload } = await dispatch(fetchEbizFields());
		setIsLoading(false);

		if (!payload.ok) {
			return eBizErrorPrompt(payload);
		}

		let fieldsMapped = [];
		payload.data.forEach((fieldItem) => {
			const userData = eBizData.find((dataItem) => dataItem.key === fieldItem.key);
			const hideFields = !!HIDDEN_FIELDS.some((e) => e === fieldItem.key);
			if (!hideFields) {
				fieldsMapped.push({
					...fieldItem,
					isVisible: userData?.isVisible ?? true,
				});
			}
		});
		setSelectedItems(fieldsMapped);
	};

	const addAnalytics = (item) => {
		switch (item.key) {
			case 'branchAddress':
				analytics.push('OAG');
				break;
			case 'officeAddress':
				analytics.push('OAD');
				break;
			case 'branchTel':
				analytics.push('ONG');
				break;
			case 'branchFax':
				analytics.push('FNG');
				break;
			case 'directTelNo1':
				analytics.push('EX1');
				break;
			case 'directTelNo2':
				analytics.push('EX2');
				break;
			case 'mobileNumber':
				analytics.push('MNB');
				break;
			case 'email':
				analytics.push('EML');
				break;
		}
	};
	function handleSelection(selection, index) {
		let temp = { ...selection, isVisible: !selection.isVisible };
		let tempArr = [...selectedItems];
		tempArr[index] = temp;
		setSelectedItems(tempArr);
	}

	function handleAddressSelection(general, detailed, index, dIndex) {
		let gTemp = { ...general, isVisible: !general.isVisible };
		let dTemp = { ...detailed, isVisible: !detailed.isVisible };
		let tempArr = [...selectedItems];
		tempArr[index] = gTemp;
		tempArr[dIndex] = dTemp;
		setSelectedItems(tempArr);
	}

	function handleGoBack() {
		navigation.goBack();
	}
	const handleSubmit = async () => {
		selectedItems.forEach((item) => (item.isVisible && !item.isRequired ? addAnalytics(item) : ''));

		setIsLoading(true);

		const { payload } = await dispatch(updateEbizFields({ fields: selectedItems }));
		setIsLoading(false);

		if (!payload?.ok) {
			return eBizErrorPrompt(payload);
		}
		setIsPopUpVisible(true);
		await dispatch(fetchEbizData({ adId: biometric.userid }));

		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.EBIZCARD_SCREENS.EBC_SHARING_PREFERENCE,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.UPDATE_PREFERENCES + analytics.join(';'),
		}).then();
	};

	const handleClosePopUp = () => {
		setAnalytics([]);
		setIsPopUpVisible(false);
	};

	const props = {
		handleSelection,
		handleGoBack,
		handleSubmit,
		handleClosePopUp,
		selectedItems,
		isPopUpVisible,
		isLoading,
		setIsPopUpVisible,
		handleAddressSelection,
	};

	return <EBizCardFieldsComponent {...props} />;
};
