import React from 'react';
import { showInfo } from 'utils';
import { VERIFY_IC_MESSAGE } from '../../utils';
import { VerifyCustomerICComp } from './component';

export const VerifyCustomerIC = ({
	onCheckIC,
	onIcChange,
	initialValues,
	icStatus,
}) => {
	const onInfoPress = () => showInfo(VERIFY_IC_MESSAGE);

	const props = {
		onInfoPress,
		onIcChange,
		onCheckIC,
		initialValues,
		icStatus,
	};

	return <VerifyCustomerICComp {...props} />;
};
