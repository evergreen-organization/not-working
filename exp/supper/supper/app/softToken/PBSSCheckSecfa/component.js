import React from 'react';
import { SecfaOptionModal } from '../components';
import { PBSS_SECFA_OPTIONS } from '../constants';

const popupOptions = {
	[PBSS_SECFA_OPTIONS]: (type, props) => (
		<SecfaOptionModal isVisible={true} {...props} />
	),
};

export const SecfaCheckView = (props) => {
	const { type } = props;

	return popupOptions[type] ? popupOptions[type](type, props) : null;
};
