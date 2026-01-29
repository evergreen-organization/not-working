import React, { useState } from 'react';
import { ChangeProfilePicComp } from './component';

export const ChangeProfilePic = ({ navigation }) => {
	function handleGoBack() {
		navigation.goBack();
	}
	const [isPopUpVisible, setIsPopUpVisible] = useState(true);

	const handleClosePopUp = () => {
		setIsPopUpVisible(false);
		handleGoBack();
	};
	const props = {
		isPopUpVisible,
		setIsPopUpVisible,
		handleClosePopUp,
		handleGoBack,
	};

	return <ChangeProfilePicComp {...props} />;
};
