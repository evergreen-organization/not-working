import React, { useState } from 'react';
import { Linking } from 'react-native';
import { showFailure } from 'utils';
import routes from 'navigations/routes';
import { logout, requestValidateId } from 'stores';
import { useDispatch } from 'react-redux';
import { SoftTokenIdValidationView } from './component';
import { ERROR_PBSS_MAX_ATTEMPTS, urlMoreInfoPBSS } from './constant';

export const SoftTokenIdValidation = ({ navigation }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleMore = () => Linking.openURL(urlMoreInfoPBSS);

	const handleSubmit = async ({ id }) => {
		setLoading(true);
		const { payload } = await dispatch(requestValidateId({ icNumber: id })); //830908016217 - klc39940, 760528017495 -
		// Uat11045
		const { status, data, problem } = payload || {};
		setLoading(false);

		if (status === 401) {
			showFailure(ERROR_PBSS_MAX_ATTEMPTS);
			return dispatch(logout());
		}

		if (problem) {
			return showFailure(problem);
		}

		if (!data.isLicenseAvailable) {
			return showFailure(
				'PB SecureSign License is currently unavailable',
				'Please try again later',
			);
		}

		navigation.navigate(routes.SOFT_TOKEN_VALIDATEPAC);
	};

	const props = {
		handleSubmit,
		handleMore,
		loading,
	};

	return <SoftTokenIdValidationView {...props} />;
};
