import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import {
	getAuth,
	getSecfaAuth,
	logout,
	paymentAuthPacReset,
	requestInitSoftTokenActivation,
	requestSoftTokenRegisterDevice,
} from 'stores';
import { showFailure } from 'utils';
import { routes } from 'navigations';
import { SoftTokenPACView } from './component';

const RETRY_LIMIT = 3;
export const SoftTokenPAC = ({ navigation }) => {
	const dispatch = useDispatch();
	const { lastPacReqTime } = useSelector(getSecfaAuth) || {};
	const auth = useSelector(getAuth);
	const lastTimerMS = useRef(0);
	const remainingRetry = useRef(RETRY_LIMIT);
	const [requestedRecently, setRequestedRecently] = useState(false);

	const lastPacReqTimeDiff = 15 - Moment().diff(lastPacReqTime, 'second');
	const [pac, setPac] = useState('');
	const [error, setError] = useState('');
	const [requestAgainTimer, setRequestAgainTimer] =
		useState(lastPacReqTimeDiff);
	const [allowReqPac, setAllowReqPac] = useState(requestAgainTimer < 0);

	useEffect(() => {
		if (lastPacReqTime && !allowReqPac) {
			return setRequestedRecently(true);
		}
		(async () => await loadPac())();

		return () => {
			dispatch(paymentAuthPacReset());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const timer =
			requestAgainTimer > 0
				? setTimeout(() => setRequestAgainTimer(requestAgainTimer - 1), 1000)
				: setAllowReqPac(true);
		return () => clearTimeout(timer);
	}, [requestAgainTimer]);

	const loadPac = async () => {
		await iniSoftToken();
		lastTimerMS.current = Moment().valueOf();
	};

	const iniSoftToken = async () => {
		const { payload } = await dispatch(requestInitSoftTokenActivation());

		if (payload?.problem) {
			showFailure(payload?.problem);
			navigation.navigate(routes.TAB_NAVIGATOR);
		}

		setRequestedRecently(false);
	};

	const handleChange = async (secfa) => {
		setPac(secfa);
		if (secfa.length === 6) {
			await submitPac(secfa);
		}
	};

	const submitPac = async (secfa) => {
		const { payload } = await dispatch(
			requestSoftTokenRegisterDevice({ secfa }),
		);
		const { status, problem, data } = payload || {};

		if (status === 401) {
			showFailure('Sorry, you have reached your maximum number of attempts.');
			return dispatch(logout());
		}

		if (problem) {
			setPac('');
			setError(problem);
			return displayError();
		}

		navigation.replace(routes.SOFT_TOKEN_ACTIVATION, {
			...data,
			activationPassword: secfa,
		});
	};

	const displayError = () => {
		if (remainingRetry.current <= 1) {
			return navigation.navigate(routes.TAB_NAVIGATOR);
		}

		remainingRetry.current -= 1;
		setPac('');
		setError(`Incorrect Code. ${remainingRetry.current} attempt(s) left`);
	};

	const props = {
		loadPac,
		handleChange,
		requestedRecently,
		allowReqPac,
		requestAgainTimer,
		auth,
		error,
		pac,
	};
	return <SoftTokenPACView {...props} />;
};
