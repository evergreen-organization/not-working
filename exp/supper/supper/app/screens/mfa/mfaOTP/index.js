import React, { useEffect, useRef, useState } from 'react';
import { MFAOtpComp } from './component';
import { useAppState } from 'hooks';
import Moment from 'moment';
import { generateOTP, OTP_TYPE } from 'softToken';
import { useDispatch, useSelector } from 'react-redux';
import { getBiometric, getClientServerTimeShift } from 'stores';
import { loginUtils } from '../../login/utils';
import { routes } from 'navigations';

const initialTime = 32;

export const MFAOtp = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const biometric = useSelector(getBiometric);
	const { enteredPin, otp: initialOTP, isResetToLogin } = route.params || {};
	const isAppState = useAppState();
	const [initialRender, setInitialRender] = useState(true);
	const lastTimerMS = useRef(Moment().valueOf());
	const [counter, setCounter] = useState(initialTime);
	const [otp, setOtp] = useState(initialOTP);
	const [error, setError] = useState('');
	const clientServerTimeShift = useSelector(getClientServerTimeShift);

	useEffect(() => {
		setInitialRender(false);
	}, []);

	useEffect(() => {
		if (counter <= 0) {
			return;
		}
		const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [counter]);

	useEffect(() => {
		if (!initialRender && isAppState) {
			setCounter(initialTime - Moment().diff(lastTimerMS.current, 'second'));
		}
	}, [isAppState]);

	const loadPac = async () => {
		setOtp('');
		setError('');
		const { status, data, errorMessage } = await generateOTP({
			pinToken: enteredPin,
			type: OTP_TYPE.DISPLAY,
			clientServerTimeShift,
			dispatch,
		});
		if (status !== 'S') {
			setError(errorMessage ?? 'Invalid PIN');
			return setOtp('-');
		}
		setOtp(data.OTP);
		lastTimerMS.current = Moment().valueOf();
		setCounter(initialTime);
	};

	const handleHeaderLeftButton = () => navigation.goBack();

	const handleRefresh = async () => {
		if (!biometric?.isOTP) {
			navigation.replace(routes.MFA_PIN, { isResetToLogin });
			return;
		}
		const { ok, errorMessage: bioErrorMessage } = await loginUtils.getBiometric();
		if (!ok) {
			setError(bioErrorMessage);
			return;
		}
		setOtp('');
		await loadPac();
	};

	const props = {
		handleHeaderLeftButton,
		handleRefresh,
		counter,
		otp,
		error,
	};

	return <MFAOtpComp {...props} />;
};
