import React, { useState } from 'react';
import { ChangeRequestsComp } from './component';

export const ChangeRequests = ({ navigation }) => {
	const [isPopUpVisible, setIsPopUpVisible] = useState(true);
	const handleClosePopUp = () => {
		setIsPopUpVisible(false);
		handleGoBack();
	};
	function handleGoBack() {
		navigation.goBack();
	}
	const props = {
		setIsPopUpVisible,
		isPopUpVisible,
		handleClosePopUp,
		handleGoBack,
	};

	return <ChangeRequestsComp {...props} />;
};
