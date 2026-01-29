import React from 'react';
import { SecurePacDisplay, SecurePacInput, SecurePin } from '../components';
import { PBSS_PIN, PBSS_SECURE_PAC, PBSS_SECURE_PAC_INPUT } from '../constants';

export const PBSecureSignView = (props) => {
	const { type } = props;

	const renderPopUp = () => {
		if (type === PBSS_PIN) {
			return <SecurePin isVisible={type === PBSS_PIN} {...props} />;
		}

		if (type === PBSS_SECURE_PAC) {
			return (
				<SecurePacDisplay isVisible={type === PBSS_SECURE_PAC} {...props} />
			);
		}

		if (type === PBSS_SECURE_PAC_INPUT) {
			return (
				<SecurePacInput isVisible={type === PBSS_SECURE_PAC_INPUT} {...props} />
			);
		}
	};

	return <>{renderPopUp()}</>;
};
