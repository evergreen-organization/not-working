import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	biometricMFADestroyed,
	challengeQuestionsReset,
	getBiometric,
	getClientServerTimeShift,
	getPinErrorCount,
	logout,
	pinErrorCountReset,
} from 'stores';
import { biometricUtils, loginUtils } from '../../login/utils';
import { MFAPinComp } from './component';
import {
	destroyPBSSToken,
	generateOTP,
	oasBiometric,
	OTP_TYPE,
	signTransactionOas,
} from 'softToken';
import { routes } from 'navigations';
import { biometricError, isAlarmPermitted, showFailure, showSuccess } from 'utils';
import { BIO_CONSTANT } from '../constants';
import { pinErrorHandler } from '../utils';
import crashlytics from '@react-native-firebase/crashlytics';
import { Alert, NativeModules } from 'react-native';
import { useHandleDeeplink, useCaptureErrorMessage } from 'hooks';
import { WIDGET_APP_GROUP, WIDGET_SHARED_STORAGE_KEY } from 'constant';
import RNExitApp from 'react-native-exit-app';
import notifee from '@notifee/react-native';
import { trackUserBoundError } from 'libs/firebase/crashlytics';

const { SharedStorage } = NativeModules;

export const MFAPin = ({ navigation, route }) => {
	const { isFromDeeplink } = route?.params ?? {};
	const pinErrorCount = useSelector(getPinErrorCount);
	const dispatch = useDispatch();
	const isGenSig = route?.params?.isGenSig;
	const showForgetPin = route?.params?.showForgetPin;
	const isResetToLogin = route?.params?.isResetToLogin;
	const biometric = useSelector(getBiometric);
	const [pin, setPin] = useState('');
	const [isAlertShow, setIsAlertShow] = useState(false);
	const isFaceID = biometricUtils.isFaceIDSupported(biometric);
	const [errorMessage, setErrorMessage] = useState('');
	const mfa = useSelector((state) => state?.mfa);

	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const storeTimeShift = useSelector(getClientServerTimeShift);

	const DOMAIN_TYPE = {
		0: 'PBB',
		1: 'PIV',
	};
	const handleDelete = () => {
		if (pin.length > 0) {
			setPin(pin.slice(0, -1));
		}
	};

	useCaptureErrorMessage({ error });
	useEffect(() => {
		if (biometric?.isOTP) {
			setTimeout(() => {
				onBiometric().then();
			}, 200);
		}
	}, []);

	const showPermissionAlert = async () => {
		const isPermitted = await isAlarmPermitted();
		if (isPermitted) {
			return;
		}

		Alert.alert(
			'Permission Needed',
			'To use the widget, alarm "notifications and reminders" permissions must be granted.',
			[
				{
					text: 'OK',
					onPress: async () => {
						await notifee.openAlarmPermissionSettings();
					},
				},
			],
		);
	};

	useHandleDeeplink({
		eventActions: {
			otp: async () => {
				navigation.setParams({
					isFromDeeplink: true,
				});
				await showPermissionAlert();
			},
		},
	});

	const handlePinChange = async (val, e) => {
		const enteredPin = pin + val;

		if (pin.length < 6) {
			setErrorMessage('');
			setPin(enteredPin);
		}
		if (enteredPin.length === 6) {
			setPin('');
			if (isGenSig) {
				return handleGenerateSignature(enteredPin);
			}

			return requestOTP(enteredPin);
		}
	};

	const requestOTP = async (enteredPin) => {
		setIsLoading(true);
		try {
			const {
				status,
				data,
				errorMessage: otpError,
				errorCode = '',
			} = await generateOTP({
				pinToken: enteredPin,
				type: OTP_TYPE.DISPLAY,
				clientServerTimeShift: storeTimeShift ?? '0',
				dispatch,
			});
			setIsLoading(false);
			if (status !== 'S') {
				const { isDeactivated, errorMessage: pinError } = await pinErrorHandler({
					status,
					dispatch,
					pinErrorCount,
					errorMessage: otpError,
				});

				trackUserBoundError({
					userId: mfa?.stfNo,
					status,
					errorCode,
					errorMessage: otpError,
				});

				if (isDeactivated) {
					showFailure(pinError);
					navigation.goBack();
					return;
				}
				setErrorMessage(pinError);
				return;
			}
			dispatch(pinErrorCountReset());
			if (isFromDeeplink && (await isAlarmPermitted())) {
				SharedStorage.setData(
					WIDGET_SHARED_STORAGE_KEY.otp,
					typeof data.OTP === 'string' ? data.OTP : JSON.stringify(data.OTP),
					WIDGET_APP_GROUP,
					(err) => {
						if (err) {
							console.error(err);
						}
					},
				);

				setTimeout(() => RNExitApp?.exitApp?.(), 500);
			} else {
				navigation.reset({
					index: 1,
					routes: [
						{ name: isResetToLogin ? routes.LOGIN : routes.TAB_NAVIGATOR },
						{
							name: routes.MFA_OTP,
							params: { enteredPin, otp: data.OTP, isResetToLogin },
						},
					],
				});
			}
		} catch (e) {
			crashlytics().recordError(e);
		}
	};

	const handleGenerateSignature = async (pinToken) => {
		setIsLoading(true);
		const { status, errorMessage: oasError } = await signTransactionOas({
			pinToken,
			domain: DOMAIN_TYPE[biometric?.domain],
			username: biometric?.userid,
			payload: route?.params?.data,
			dispatch,
		});
		setIsLoading(false);
		if (status !== 'S') {
			setIsLoading(false);
			const { isDeactivated, errorMessage: pinError } = await pinErrorHandler({
				status,
				dispatch,
				pinErrorCount,
				errorMessage: oasError,
			});

			if (isDeactivated) {
				showFailure(pinError);
				navigation.goBack();
				return;
			}
			showFailure(pinError);
			return;
		}

		navigation.navigate(routes.TAB_NAVIGATOR);
		dispatch(challengeQuestionsReset());
		return showSuccess('Success');
	};

	const handleForgotPin = () => setIsAlertShow(true);

	const handleCloseAlert = () => {
		setIsAlertShow(false);
	};

	const handleHeaderLeftButton = () => {
		navigation.goBack();
	};
	const handleForgetPinConfirm = async () => {
		await destroyPBSSToken(dispatch);
		dispatch(logout());
		setIsAlertShow(false);
		navigation.navigate(routes.LOGIN);
	};

	const onBiometric = async () => {
		if (!biometric?.isOTP) {
			setError({
				message: 'Biometric is not enabled',
			});
			return;
		}

		const {
			ok,
			quickPin,
			errorMessage: bioErrorMessage,
			errorTitle,
		} = await loginUtils.getBiometric(true);

		if (quickPin === biometricError.newEnrollment) {
			setIsLoading(false);
			dispatch(biometricMFADestroyed());
			Alert.alert(errorTitle, bioErrorMessage, [
				{
					text: 'Confirm',
				},
			]);
			return;
		}

		if (!ok) {
			setIsLoading(false);
			if (!bioErrorMessage) {
				showFailure('Please input your Secure PIN.');
				return;
			}
			setError({
				title: errorTitle,
				message: bioErrorMessage,
			});
			return;
		}

		if (quickPin !== BIO_CONSTANT) {
			setIsLoading(false);
			setError({
				title: 'Error',
				message: 'Please input your Secure PIN.',
			});
			return;
		}

		const { status, data } = await oasBiometric();
		if (status !== 'S') {
			setIsLoading(false);
			setError({
				title: 'Error',
				message: 'Please input your Secure PIN.',
			});
		}
		const { randomPasswordInString } = data;
		if (!randomPasswordInString) {
			setIsLoading(false);
			setError({
				title: 'Error',
				message: 'Unable to get biometric. Please try again later.',
			});
			return;
		}

		if (isGenSig) {
			return handleGenerateSignature(randomPasswordInString);
		}
		return await requestOTP(randomPasswordInString);
	};

	const handlePopupClose = () => setError(null);

	const props = {
		handlePinChange,
		handleDelete,
		handleForgotPin,
		handleCloseAlert,
		handleForgetPinConfirm,
		handleHeaderLeftButton,
		isFaceID,
		pin,
		isAlertShow,
		errorMessage,
		isLoading,
		onBiometric,
		showForgetPin,
		error,
		handlePopupClose,
	};

	return <MFAPinComp {...props} />;
};
