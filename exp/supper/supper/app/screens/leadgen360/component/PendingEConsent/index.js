import React from 'react';
import { useSelector } from 'react-redux';
import { Share } from 'react-native';

import { getLeadGen } from 'stores';

import { PendingEConsentView } from './component';
import { PENDING_E_CONSENT_SHARE_MESSAGE } from '../../utils';

export const PendingEConsent = () => {
	const { referralCode } = useSelector(getLeadGen);
	const handleShare = async () =>
		await Share.share({
			message: PENDING_E_CONSENT_SHARE_MESSAGE(referralCode),
		});

	const props = {
		handleShare,
		referralCode,
	};

	return <PendingEConsentView {...props} />;
};
