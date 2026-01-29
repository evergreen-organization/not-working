import React from 'react';

import { NameCardComponent } from './component';

export const NameCard = ({ width = 200, cardInfo, isLoading }) => {
	const {
		name,
		designation,
		branchName,
		branchAddress,
		officeAddress,
		branchTel,
		branchFax,
		mobileNumber,
		email,
		directTelNo1,
		directTelNo2,
		companyCode,
	} = cardInfo || {};

	const props = {
		name,
		designation,
		branchName,
		branchAddress,
		officeAddress,
		branchTel,
		branchFax,
		mobileNumber,
		email,
		directTelNo1,
		directTelNo2,
		isLoading,
		companyCode,
	};
	return <NameCardComponent {...props} width={width} />;
};
