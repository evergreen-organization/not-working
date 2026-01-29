import React, { useRef, useState } from 'react';
import { NativeModules } from 'react-native';
import { MFAEnrollPinComp } from './component';
import routes from '../../../navigations/routes';
import { useDispatch } from 'react-redux';
import {
	destroyPBSSToken,
	generateClientServerTimeShift,
	generateOTP,
	OTP_TYPE,
	postPinSoftToken,
} from 'softToken';
import { showFailure } from 'utils';
import { ACTIVATION_FAILED } from '../constants';
import { requestTimeSync } from 'stores';

const { SoftTokenModule } = NativeModules;

export const MFAEnrollPin = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const data = route?.params?.data;
	const [newPin, setNewPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const timeRetry = useRef(0);

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
					setIsLoading(true);
					await loginPin();
					setIsLoading(false);
				} else {
					resetInput();
					setErrorMsg('PIN mismatch');
				}
			}
		} catch (err) {
			setIsLoading(false);
			console.error(err);
		}
	};

	const loginPin = async () => {
		let isPasswordWeak = await SoftTokenModule.isCheckPasswordWeak(newPin);
		if (isPasswordWeak) {
			resetInput();
			setErrorMsg('Please use a stronger PIN.');
			return;
		}

		const {
			status: postStatus,
			errorMessage,
			errorCode,
		} = await postPinSoftToken({
			deviceCode: data?.deviceCode,
			registrationId: data?.registrationId,
			deviceId: data?.deviceId,
			staffNo: data?.staffNo,
			activationPassword: data?.activationPassword,
			tokenPin: newPin,
			dispatch,
		});
		if (postStatus !== 'S') {
			showFailure(`${ACTIVATION_FAILED}\n\n${postStatus}-${errorCode}:${errorMessage}`);
			return navigation.popToTop();
		}
		await timeSync({ pin: newPin });
	};

	const timeSync = async ({ pin }) => {
		if (timeRetry.current >= 3) {
			timeRetry.current = 0;
			destroyPBSSToken(dispatch).then();
			navigation.popToTop();
			showFailure(`${ACTIVATION_FAILED}\n\nError syncing time`);
			return;
		}

		const { status: timeShiftStatus, data: timeShiftData } = await generateClientServerTimeShift({
			dispatch,
		});
		// if backend pass value then use it, else use the stored value
		if (timeShiftStatus !== 'S') {
			timeRetry.current += 1;

			await timeSync({ pin });
			return;
		}

		const {
			status: OTPStatus,
			data: OTPData,
			errorCode,
			errorMessage,
		} = await generateOTP({
			pinToken: pin,
			clientServerTimeShift: timeShiftData.clientServerTimeShift,
			type: OTP_TYPE.DISPLAY,
		});

		if (OTPStatus !== 'S') {
			destroyPBSSToken(dispatch).then();
			navigation.popToTop();
			showFailure(`${ACTIVATION_FAILED}\n\n${OTPStatus}-${errorCode}:${errorMessage}`);
			return;
		}

		const { payload } = await dispatch(
			requestTimeSync({
				domain: data?.domain,
				username: data?.adid,
				otp: OTPData?.OTP,
			}),
		);

		if (!payload.ok) {
			timeRetry.current += 1;
			await timeSync({ pin });
			return;
		}

		setIsLoading(false);
		navigation.navigate(routes.MFA_ENROLL_BIOMETRIC, { newPin });
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
		isLoading,
	};

	return <MFAEnrollPinComp {...props} />;
};
