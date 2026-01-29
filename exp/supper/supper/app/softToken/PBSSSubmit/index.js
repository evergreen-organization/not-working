import React, { useEffect, useState } from 'react';
import { PBSSSubmitView } from './component';
import { PBSecureSign } from '../PBSecureSign';
import { showFailure } from 'utils';
import { PBSS_NO_SECFA, PBSS_SECURE_PAC, PBSS_SECURE_PAC_INPUT } from '../constants';

export const PBSSSubmit = ({ onComplete, onCancel, activated, transactionObj }) => {
	const [startSecfaType, setStartSecfaType] = useState(false);
	const [startSecureSign, setStartSecureSign] = useState(false);
	const [initType, setInitType] = useState(PBSecureSign.type.pin);

	useEffect(() => {
		if (activated) {
			start();
		}
	}, [activated]);

	const start = () => {
		setStartSecfaType(true);
	};

	const onSecfaCancel = () => {
		setStartSecfaType(false);
		onCancel();
	};

	const onSecfaComplete = (result) => {
		setStartSecfaType(false);
		const { secfaType, problem } = result || {};

		if (problem) {
			onSecureSignCancel();
			return showFailure(problem);
		}

		if (secfaType === PBSS_NO_SECFA) {
			return onComplete({ isSuccess: true });
		}

		setSecfaType(secfaType);
		setTimeout(() => setStartSecureSign(true), 1000);
	};

	const setSecfaType = (softTokenType) => {
		if (softTokenType === PBSS_SECURE_PAC) {
			return setInitType(PBSecureSign.type.pinPac);
		}
		if (softTokenType === PBSS_SECURE_PAC_INPUT) {
			return setInitType(PBSecureSign.type.pinPacInput);
		}
		return setInitType(PBSecureSign.type.pin);
	};

	const onSecureSignComplete = (result) => {
		setStartSecureSign(false);
		onComplete(result);
	};

	const onSecureSignCancel = () => {
		setStartSecureSign(false);
		onCancel();
	};

	const props = {
		onSecfaComplete,
		onSecfaCancel,
		onSecureSignComplete,
		onSecureSignCancel,
		transactionObj,
		initType,
		startSecureSign,
		startSecfaType,
	};

	return <PBSSSubmitView {...props} />;
};
