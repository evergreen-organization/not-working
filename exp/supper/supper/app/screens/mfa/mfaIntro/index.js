import React from 'react';
import MFAIcon from 'assets/icon/authenticator.png';
import { routes } from 'navigations';
import { InfoCenterTemplate } from 'templates';
import { useSelector } from 'react-redux';
import { getBiometric } from 'stores';
import { MFA_INTRO_DESCRIPTION } from '../constants';

export const MFAIntro = ({ navigation }) => {
	const biometric = useSelector(getBiometric);

	const handleNavigate = () => {
		navigation.replace(routes.MFA_TNC, {
			path: routes.MFA_QR_SCAN,
			urName: biometric?.userid,
		});
	};
	return (
		<InfoCenterTemplate
			icon={MFAIcon}
			title={'PB SecureSign Updates'}
			description={MFA_INTRO_DESCRIPTION}
			rightButtonTitle={'Continue'}
			onRightPress={handleNavigate}
		/>
	);
};
