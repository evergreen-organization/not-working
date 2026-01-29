import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRSA } from 'hooks';
import { enrollPin, setPinEnrollmentShown } from 'stores';
import { routes } from 'navigations';
import { tranApiType } from 'constant';
import { showFailure } from 'utils';

import { EnrollPinComp } from './component';

export const EnrollPin = ({ navigation }) => {
	const rsa = useRSA();
	const dispatch = useDispatch();
	const [newPin, setNewPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(setPinEnrollmentShown(true));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEnrollPin = async (enteredPin) => {
		try {
			setLoading(true);

			const encryptedPin = await rsa.encryptPin(enteredPin);
			if (!encryptedPin) {
				return;
			}

			navigation.navigate(routes.CHALLENGE_QUESTIONS, {
				api: enrollPin,
				apiParam: { pin: encryptedPin, enteredPin },
				onSuccessParam: { pin: enteredPin },
				tranApiType: tranApiType.ENROLL_PIN,
			});
		} catch (err) {
			console.error(err);
			fail();
		} finally {
			resetInput();
			setLoading(false);
		}
	};

	const fail = () => {
		resetInput();
		showFailure('Failed to enroll PIN', 'Please try again');
	};

	const handleChange = async (val) => {
		try {
			setErrorMsg('');
			let editingPin = newPin.length < 6 ? newPin : confirmPin;

			const enteredPin = editingPin + val;
			if (editingPin.length < 6) {
				newPin?.length < 6 ? setNewPin(enteredPin) : setConfirmPin(enteredPin);
			}

			if (enteredPin.length === 6 && newPin?.length === 6) {
				if (newPin === enteredPin) {
					await handleEnrollPin(enteredPin);
				} else {
					resetInput();
					setErrorMsg('PIN mismatch');
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = () => {
		let editingPin = newPin.length < 6 ? newPin : confirmPin;
		let slicedPin;
		if (editingPin.length > 0) {
			slicedPin = editingPin.slice(0, -1);
			newPin?.length < 6 ? setNewPin(slicedPin) : setConfirmPin(slicedPin);
		}
	};

	const resetInput = () => {
		// dispatch(dummyEnrollPin(true))
		setNewPin('');
		setConfirmPin('');
	};

	const props = {
		handleChange,
		handleDelete,
		resetInput,
		errorMsg,
		newPin,
		confirmPin,
		loading,
	};
	return <EnrollPinComp {...props} />;
};
