import React from 'react';
import { MfaTncComp } from './component';

export const MfaTnc = ({ navigation, route }) => {
	const path = route.params?.path;
	const urName = route.params?.urName;
	const handleHeaderRightBtn = () => navigation.goBack();

	const handleCancel = () => navigation.goBack();

	const handleAccept = () => {
		if (!path) {
			navigation.goBack();
			return;
		}
		navigation.replace(path, { urName });
	};

	const props = {
		handleHeaderRightBtn,
		handleCancel,
		handleAccept,
	};
	return <MfaTncComp {...props} />;
};
