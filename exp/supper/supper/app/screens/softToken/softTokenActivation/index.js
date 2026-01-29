import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storage } from 'auth';
import { activateSoftToken } from 'softToken';
import { activateTokenInstance, getUser } from 'stores';
import { routes } from 'navigations';
import { checkIsDemoFromStaffId } from 'utils';

import { SoftTokenActivationView } from './component';
import { getFormattedDeviceName } from './utils';
import { PBSS_3_ACTIVATE, PBSS_4_COMPLETED } from '../constant';

export const SoftTokenActivation = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { activationPassword, salt, serverEphemeralPublicKey } =
		route?.params || {};
	const { staffId } = useSelector(getUser) || {};
	const isDemo = checkIsDemoFromStaffId(staffId);

	const [step, setStep] = useState(PBSS_3_ACTIVATE); //4 = finish
	const [errorStep, setErrorStep] = useState(0);
	const [error, setError] = useState('');

	useEffect(() => {
		(async () => await continueActivation())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const continueActivation = async () => {
		if (isDemo) {
			dispatch(activateTokenInstance());
			return setStep(PBSS_4_COMPLETED);
		}
		const secret = await storage.getSecret();
		const deviceName = await getFormattedDeviceName();
		const activationData = {
			id: secret.deviceId + staffId,
			deviceName,
			activationPassword,
			salt,
			serverEphemeralPublicKey,
		};

		const result = await activateSoftToken({
			dispatch,
			...activationData,
		});

		if (!result.status) {
			return fail(result.msg);
		}

		setStep(PBSS_4_COMPLETED);
	};

	const fail = (msg) => {
		setStep(PBSS_4_COMPLETED);
		setErrorStep(PBSS_3_ACTIVATE);
		setError(msg);
	};

	const handleDone = () => navigation.navigate(routes.TAB_NAVIGATOR);

	const props = {
		step,
		errorStep,
		error,
		handleDone,
	};

	return <SoftTokenActivationView {...props} />;
};
