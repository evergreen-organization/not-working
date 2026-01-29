import { validateTransactionSignature } from '../../transAuthUtils';
import { useEffect, useState } from 'react';
import { SecurePacInputView } from './component';

export const SecurePacInput = ({
	isVisible,
	data,
	onSuccess,
	onCancel,
	state,
	dispatch,
	isPublic,
}) => {
	const [securePac, setSecurePac] = useState('');
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState('');

	const { signature, transactionId } = data || {};

	useEffect(() => {
		if (isVisible) {
			setVisible(true);
		}
	}, [isVisible]);

	const closeModal = () => {
		setVisible(false);
		onCancel();
	};

	const onSecurePacChanged = (input) => {
		setSecurePac(input);
		if (input?.length < 6) {
			return;
		}

		setSecurePac('');
		(async () => await submitPac(input))();
	};

	const submitPac = async (pacInput) => {
		setError(null);

		// 1. Validate transaction signature
		const { errorMsg } = await validateTransactionSignature({
			// isPublic: isPublicRef.current,
			// transactionId: transactionIdRef.current,
			isPublic,
			transactionId,
			signature: pacInput,
			state,
			dispatch,
		});

		// 2. Error handling
		if (errorMsg) {
			return setError(errorMsg);
		}

		//3. Post successful validation: Submit financial transaction
		setVisible(false);
		return onSuccess({ isSuccess: true });
	};

	const props = {
		closeModal,
		onSecurePacChanged,
		visible,
		signature,
		error,
		securePac,
	};

	return <SecurePacInputView {...props} />;
};
