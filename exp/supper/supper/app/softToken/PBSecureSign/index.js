import React, { useEffect, useState } from 'react';
import { PBSecureSignView } from './component';
import { PBSS_PIN, PBSS_SECURE_PAC, PBSS_SECURE_PAC_INPUT } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { validateTransactionSignature } from '../transAuthUtils';
import { showFailure } from 'utils';

export const PBSecureSign = ({
	initType,
	transactionObj,
	onComplete,
	onCancel: onCancelAction,
	activated,
}) => {
	const dispatch = useDispatch();
	const state = useSelector((_state) => _state);

	const { transactionId, isPublic } = transactionObj || {};

	const [data, setData] = useState({ ...transactionObj });
	const [step, setStep] = useState(0);
	const [type, setType] = useState(null);

	useEffect(() => {
		if (activated) {
			start();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activated]);

	const start = () => {
		if (initType) {
			setType(initType[step]);
		}
	};

	const resetState = () => {
		setStep(0);
		setType(null);
		setData(null);
	};

	const onCancel = (result) => {
		resetState();
		onCancelAction(result);
	};

	const onFailure = (result) => {
		resetState();
		onComplete({ ...result, isSuccess: false });
	};

	const onSuccess = async (result) => {
		let submitResult = {};
		const currentStep = step + 1;

		setType(initType[currentStep]);

		if (currentStep < initType.length) {
			setStep(currentStep);
			return setData({ ...data, ...result?.data });
		}

		if (initType !== PBSecureSign.type.pinPac) {
			const validationRequest = {
				isPublic,
				transactionId,
				signature: result?.data?.signature,
				state,
				dispatch,
			};

			submitResult = await validateTransactionSignature(validationRequest);
			const { authenticationExpired, problem, errorMsg } = submitResult;

			if (errorMsg) {
				showFailure(errorMsg);
				return onCancel();
			}

			if (authenticationExpired || problem) {
				return onFailure({ authenticationExpired, response: submitResult });
			}
		}

		return onComplete({ isSuccess: true, response: submitResult });
	};

	const props = {
		onCancel,
		onSuccess,
		onFailure,
		type,
		data,
		state,
		dispatch,
		isPublic,
	};

	return <PBSecureSignView {...props} />;
};

PBSecureSign.type = {
	pin: [PBSS_PIN],
	pinPac: [PBSS_PIN, PBSS_SECURE_PAC],
	pinPacInput: [PBSS_PIN, PBSS_SECURE_PAC_INPUT],
};
