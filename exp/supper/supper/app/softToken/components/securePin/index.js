import React, { useEffect, useState } from 'react';
import { biometricError, getKeychainPIN, showFailure } from 'utils';
import { validatePBSSSecurePIN } from 'stores';
import { SecurePinView } from './component';
import { signTransaction } from '../../transAuthUtils';
import { useRSA } from 'hooks';
import { CONNECTION_TIMEOUT } from 'constant';

export const MSG_BIOMETRIC_FAILED = 'Failed Biometric Authentication, please proceed with PIN.';

export const SecurePin = ({
	onCancel,
	isVisible,
	onSuccess,
	onFailure,
	state,
	dispatch,
	isPublic,
}) => {
	const rsa = useRSA();
	const [pin, setPin] = useState('');

	const [modalPinVisible, setModalPinVisible] = useState(isVisible);
	const [pinError, setPinError] = useState(null);
	const [pinLoading, setPinLoading] = useState(false);

	useEffect(() => {
		setModalPinVisible(isVisible);
	}, [isVisible]);

	const onBiometric = async () => {
		const quickPin = await getKeychainPIN('Quick Payment');

		if (quickPin === biometricError.limit || quickPin === biometricError.locked) {
			return showFailure(MSG_BIOMETRIC_FAILED);
		}
		if (quickPin === biometricError.noKeychain) {
			return showFailure(
				'No keychain found',
				'Please authenticate with PIN and enable in Settings',
			);
		}

		if (quickPin === biometricError.failed) {
			return showFailure(MSG_BIOMETRIC_FAILED);
		}

		if (!quickPin) {
			return;
		}

		setPin('');
		return await onSubmitPin(quickPin);
	};

	const handleChange = async (digit) => {
		const newPin = pin + digit;
		setPin(newPin);

		if (newPin.length === 6) {
			setPin('');
			return onSubmitPin(newPin);
		}
	};

	const handleDelete = () => setPin(pin.slice(0, -1));

	// Secure Sign Sequence: Secure Pin Submission
	const onSubmitPin = async (newPin) => {
		setPinError(null);
		setPinLoading(true);
		const encryptMsg = await rsa.encryptPin(newPin);
		if (!encryptMsg) {
			return;
		}
		// 1. Validate Secure Pin
		const { payload: response } = await dispatch(
			validatePBSSSecurePIN({
				pin: encryptMsg,
			}),
		);

		const { status, data, problem } = response;

		// 2. Error handling
		if (status === 401) {
			setPinLoading(false);
			return onFailure({ response: data, isPinLocked: true });
		}

		if (status === CONNECTION_TIMEOUT) {
			setPinLoading(false);
			return onFailure({ response, isSuccess: false });
		}

		if (problem) {
			setPinLoading(false);
			return data?.remainingAttempts
				? setPinError(`Incorrect PIN. ${data?.remainingAttempts} attempt(s) left`)
				: setPinError('Error');
		}

		// 3. Secure Pin Sequence: on Pin Validation Success
		setPin('');
		await validatePinSuccess(data);
		setPinLoading(false);
	};

	// Secure Pin Sequence: on Pin Validation Success
	const validatePinSuccess = async (res) => {
		// 1. Sign transaction
		const signature = await signTransaction(res);
		if (!signature) {
			return onFailure({ response: res });
		}

		// 2. Close secure pin modal
		setModalPinVisible(false);
		return onSuccess({ data: { signature } });
	};

	const props = {
		handleChange,
		handleDelete,
		onBiometric,
		onCancel,
		pinLoading,
		pin,
		pinError,
		modalPinVisible,
	};

	return <SecurePinView {...props} />;
};
