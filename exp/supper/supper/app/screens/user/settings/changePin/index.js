import React, { useState } from 'react';
import { NativeModules } from 'react-native';
import { ChangePinComp } from './component';
import { useDispatch, useSelector } from 'react-redux';
import { changePin } from 'softToken';
import { setKeychainPIN, showFailure, showSuccess } from 'utils';
import { biometricDisabled, getBiometric, getPinErrorCount, pinErrorCountReset } from 'stores';
import { pinErrorHandler } from '../../../mfa/utils';
import { BIO_CONSTANT } from 'screens/mfa/constants';

const { SoftTokenModule } = NativeModules;

export const ChangePin = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const oldPin = route?.params?.oldPin;
	const pinErrorCount = useSelector(getPinErrorCount);
	const [newPin, setNewPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const biometric = useSelector(getBiometric);

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
					changPin();
				} else {
					resetInput();
					setErrorMsg('PIN mismatch');
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	const changPin = async () => {
		let isPasswordWeak = await SoftTokenModule.isCheckPasswordWeak(newPin);
		if (isPasswordWeak) {
			resetInput();
			setErrorMsg('Please use a stronger PIN.');
			return;
		}
		const { status, errorMessage } = await changePin({ oldPin, newPin });
		if (status !== 'S') {
			const { isDeactivated, errorMessage: pinError } = await pinErrorHandler({
				status,
				dispatch,
				pinErrorCount,
				errorMessage,
			});

			if (isDeactivated) {
				showFailure(pinError);
				navigation.goBack();
				return;
			}
			showFailure(pinError);
			return;
		}
		dispatch(pinErrorCountReset());
		await SoftTokenModule.deleteBiometricStorage();
		if (biometric.isStored) {
			try {
				await setKeychainPIN(BIO_CONSTANT);
			} catch (error) {
				dispatch(biometricDisabled());
				navigation.goBack();
				return showFailure('Change Pin Successful. Please enable your biometric approval again.');
			}

			const { status: bioStatus } = await SoftTokenModule.activateBiometric(newPin);
			if (bioStatus !== 'S') {
				showSuccess('Change Pin Successful. Please enable your biometric approval again.');
				// to disable all biometric and change flag to isOTPEnabled
				await SoftTokenModule.deleteBiometricStorage();
				dispatch(biometricDisabled());
				navigation.goBack();
				return;
			}
		}
		showSuccess('Change Pin Successful.');
		navigation.goBack();
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
		setNewPin('');
		setConfirmPin('');
	};

	const handleHeaderLeftBtn = () => navigation.goBack();

	const props = {
		handleHeaderLeftBtn,
		handleChange,
		handleDelete,
		resetInput,
		errorMsg,
		newPin,
		confirmPin,
	};

	return <ChangePinComp {...props} />;
};
