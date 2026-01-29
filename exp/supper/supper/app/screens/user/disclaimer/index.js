import React from 'react';
import { DisclaimerComp } from './component';

export const Disclaimer = ({ navigation }) => {
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	const props = {
		handleHeaderLeftBtn,
	};

	return <DisclaimerComp {...props} />;
};
