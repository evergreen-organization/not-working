import React, { useEffect, useState } from 'react';
import { SecfaCheckView } from './component';
import { identifyAuthenticationMethod } from '../transAuthUtils';
import { useDispatch } from 'react-redux';
import {
	PBSS_NO_SECFA,
	PBSS_PIN,
	PBSS_SECFA_OPTIONS,
	PBSS_SECURE_PAC,
	SECFA_OPTIONS,
} from '../constants';
import { softTokenTransactionIdUpdated } from 'stores';

export const PBSSCheckSecfa = ({
	onComplete,
	onCancel: onActionCancel,
	data,
	activated,
}) => {
	const dispatch = useDispatch();
	const [secfaResult, setSecfaResult] = useState({});
	const [type, setType] = useState(null);
	const [list, setList] = useState([]);

	useEffect(() => {
		if (activated) {
			(async () => await checkSecfa())();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activated]);

	const checkSecfa = async () => {
		const result = await identifyAuthenticationMethod({
			secfaInfo: data,
			dispatch,
		});

		setSecfaResult(result);
		if (!result) {
			return onCancel();
		}

		if (result.transactionId) {
			dispatch(
				softTokenTransactionIdUpdated({ transactionId: result.transactionId }),
			);
		}

		//Secfa Options
		if (result.showSecfaModal) {
			setList(SECFA_OPTIONS);
			return setType(PBSS_SECFA_OPTIONS);
		}

		handleSecfaResult(result);
	};
	const onCancel = () => {
		setType(null);
		onActionCancel({ quit: true });
	};

	const onSuccess = (result) => {
		handleSecfaResult(result ?? secfaResult);
	};

	const handleSecfaResult = (result) => {
		if (result.isFailure) {
			return onComplete({ isSuccess: false, problem: result?.message });
		}

		if (result.isSecfaNotRequired) {
			return onComplete({ isSuccess: true, secfaType: PBSS_NO_SECFA });
		}

		if (result.showPac) {
			return onComplete({ isSuccess: true, secfaType: PBSS_SECURE_PAC });
		}

		if (result.showPinModal) {
			return onComplete({ isSuccess: true, secfaType: PBSS_PIN });
		}

		if (result.selectedSecfa) {
			return onComplete({ isSuccess: true, secfaType: result.selectedSecfa });
		}
	};

	const props = {
		type,
		list,
		data,
		onCancel,
		onSuccess,
	};

	return <SecfaCheckView {...props} />;
};
