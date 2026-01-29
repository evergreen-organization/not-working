import React from 'react';

import { EBizCardInfoPropsType } from './types';

import { VCFCardInfoListView } from '../components';

import { getEbizData } from 'stores';
import { useSelector } from 'react-redux';

export const EBizCardInfo = ({ navigation }) => {
	const { eBizData } = useSelector(getEbizData);

	function handleGoBack() {
		navigation.goBack();
	}

	const props: EBizCardInfoPropsType = {
		handleGoBack,

		cardData: eBizData,
	};
	return <VCFCardInfoListView {...props} />;
};
