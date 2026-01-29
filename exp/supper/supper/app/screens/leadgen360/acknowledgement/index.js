import React from 'react';
import { useSelector } from 'react-redux';
import { routes } from 'navigations';
import { getLeadGen } from 'stores';

import { LG360AcknowledgementScreen } from './component';

export const LG360Acknowledgement = ({ navigation, route }) => {
	const { addProspectResult } = route.params || {};
	const { name, productExist, referralCode } = useSelector(getLeadGen);
	const handleDone = () => {
		if (productExist) {
			return navigation.goBack();
		}
		navigation.navigate(routes.HOME);
		navigation.navigate(routes.LG360_PROSPECT);
	};

	const handleGoBack = (_) => navigation.goBack();

	const props = {
		handleDone,
		handleGoBack,
		name,
		addProspectResult,
		productExist,
		referralCode,
	};
	return <LG360AcknowledgementScreen {...props} />;
};
