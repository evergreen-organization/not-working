import React, { useState } from 'react';
import { EditCardFormComp } from './component';
export const EditCardForm = ({ navigation }) => {
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
	return <EditCardFormComp {...props} />;
};
