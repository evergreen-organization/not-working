import React from 'react';

import { InfoCenterTemplate } from 'templates';
import SuccessLottie from 'assets/lottie/activated.json';

import { MFA_SUCCESS_DESCRIPTION, MFA_SUCCESS_TITLE } from '../constants';

export const MFASuccessComp = ({ handleDone }) => {
	return (
		<InfoCenterTemplate
			lottie={SuccessLottie}
			title={MFA_SUCCESS_TITLE}
			description={MFA_SUCCESS_DESCRIPTION}
			rightButtonTitle={'Done'}
			onRightPress={handleDone}
		/>
	);
};
