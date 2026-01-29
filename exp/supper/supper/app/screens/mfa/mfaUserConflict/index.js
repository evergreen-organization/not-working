import React from 'react';
import { useDispatch } from 'react-redux';

import { destroyPBSSToken } from 'softToken';
import { InfoCenterTemplate } from 'templates';
import AlertIcon from 'assets/icon/warning-red.png';

import { MFA_CONFLICT_DESCRIPTION } from '../constants';

export const MFAUserConflict = ({ navigation }) => {
	const dispatch = useDispatch();
	const handleRightPress = () => {
		destroyPBSSToken(dispatch).then();
		navigation.goBack();
	};

	const handleLeftPress = () => {
		navigation.goBack();
	};

	return (
		<InfoCenterTemplate
			icon={AlertIcon}
			title={'Warning'}
			description={MFA_CONFLICT_DESCRIPTION}
			leftButtonTitle={'Cancel'}
			rightButtonTitle={'Continue'}
			onLeftPress={handleLeftPress}
			onRightPress={handleRightPress}
		/>
	);
};
