import React from 'react';
import { MFASuccessComp } from './component';

export const MFASuccess = ({ navigation }) => {
	const handleDone = () => navigation.popToTop();

	const props = {
		handleDone,
	};
	return <MFASuccessComp {...props} />;
};
