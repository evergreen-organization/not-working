import React from 'react';
import AlertIcon from 'assets/icon/warning-red.png';
import { InfoCenterTemplate } from 'templates';
import { MFA_HAS_HARD_TOKEN_DESCRIPTION, MFA_HAS_HARD_TOKEN_TITLE } from '../constants';

export const MfaHasHardToken = ({ navigation }) => {
	const handlePress = () => {
		navigation.goBack();
	};

	return (
		<InfoCenterTemplate
			icon={AlertIcon}
			title={MFA_HAS_HARD_TOKEN_TITLE}
			description={MFA_HAS_HARD_TOKEN_DESCRIPTION}
			rightButtonTitle={'OK'}
			onRightPress={handlePress}
		/>
	);
};
