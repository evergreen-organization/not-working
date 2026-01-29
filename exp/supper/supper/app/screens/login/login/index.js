import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '@sentry/react-native';
import { Loading } from 'atoms';
import { dateFormat } from 'configs';
import { BiometricType, DOMAIN_TYPE, isIos, showFestive, USER_ANALYTICS } from 'constant';
import { useAppState, useCaptureErrorMessage, useHandleDeeplink } from 'hooks';
import Moment from 'moment';
import { routes } from 'navigations';
import { MESSAGE_PLEASE_LOGIN } from 'organisms';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { destroyPBSSToken, loginOTP, oasBiometric } from 'softToken';
import {
	biometricFromLogout,
	biometricMFADestroyed,
	biometricReset,
	biometricSetup,
	biometricTypeStored,
	forcePasswordLoginReset,
	getBiometric,
	getClientServerTimeShift,
	getMFA,
	getMFAUser,
	getNotification,
	getPinErrorCount,
	pinErrorCountReset,
	updateCurrentLocation,
	userStored,
} from 'stores';
import {
	addAnalyticCheckpoint,
	algorithm,
	awaitAlert,
	biometricError,
	getGeoLocationPermission,
	getLocationCoordinates,
	localDeviceInfo,
	showFailure,
	validateUserCredentials,
} from 'utils';
import { encryptData } from 'utils/encryption';
import { BIO_CONSTANT } from '../../mfa/constants';
import { pinErrorHandler } from '../../mfa/utils';
import { LoginErrorPopup } from '../components';
import { LOGIN_MESSAGE, LOGIN_STATE } from '../constant';
import { biometricUtils, loginUtils, useLoginApi } from '../utils';
import LoginComp from './component';
import LoginFestiveComp from './componentFestive';

import { navigate } from 'navigations/RootNavigation';
import { changeIcon, getIcon, resetIcon } from 'react-native-change-icon';

export const Login = ({ navigation }) => {
	const biometric = useSelector(getBiometric);
	const notification = useSelector(getNotification);
	const pinErrorCount = useSelector(getPinErrorCount);
	const { isActivatedMFA, isForcePassword } = useSelector(getMFA) || {};
	const appState = useAppState();
	const dispatch = useDispatch();
	const viewRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const [loadingProgress, setLoadingProgress] = useState(null);
	const [loginError, setLoginError] = useState(null);
	const [screenStatus, setScreenStatus] = useState(LOGIN_STATE.SPLASH);
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const loginApi = useLoginApi();
	let loginData = useRef({});
	const MFAStaffID = useSelector(getMFAUser);
	const storeTimeShift = useSelector(getClientServerTimeShift);
	const shouldReactivateBiometric = useRef(false);

	// For analytics purpose
	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.LOGIN,
		view: viewRef,
	};
	useCaptureErrorMessage({ error: loginError });
	useHandleDeeplink({
		eventActions: {
			token: () => {
				handleMFAPress();
			},
			otp: () => {
				handleMFAPress(true);
			},
			quickLinks: () => {
				navigate(routes.QUICK_LINKS);
			},
			miniQuickLinks: () => {
				navigate(routes.QUICK_LINKS, { isMini: true });
			},
		},
		loginCallback: () => {
			handleLoginPress();
		},
	});

	useEffect(() => {
		if (biometric?.username) {
			awaitAlert(LOGIN_MESSAGE.UPDATE_SECURITY_SETTING).then();
			AsyncStorage.clear().then();
			dispatch(biometricReset());
		}

		if (appState) {
			(async () => {
				await getPosition();
			})();
		}

		// changeAppIcon();
	}, []);

	useEffect(() => {
		if (!appState) {
			handleKeyboardClose();
		}
	}, [appState]);

	const changeAppIcon = async () => {
		try {
			const iconName = await getIcon();
			if (iconName.includes('Festive') && showFestive) {
				return;
			}
			if (!showFestive && !iconName.includes('Festive')) {
				return;
			}

			showFestive ? changeIcon(isIos ? 'FestiveAppIcon' : 'Festive') : resetIcon();
		} catch (error) {}
	};

	const getPosition = async () => {
		await getGeoLocationPermission();
		const coords = await getLocationCoordinates();
		dispatch(updateCurrentLocation(coords.response));
	};

	const handleLoginPress = async (event) => {
		if (isForcePassword) {
			setScreenStatus(LOGIN_STATE.PASSWORD);
			return;
		}

		if (!!isActivatedMFA && !!biometric.userid) {
			await handleBiometricLogin();
			setScreenStatus(LOGIN_STATE.PIN);
			return;
		}

		setScreenStatus(LOGIN_STATE.PASSWORD);
	};

	const reActivateBiometric = (userData) => {
		navigation.navigate(routes.MFA_RE_ENROLL_BIOMETRIC, {
			userData,
			pin: loginData?.current?.pin,
		});
	};

	const FLOW_STEPS = {
		STEP1_PASSWORD_LOGIN: 'STEP1_PASSWORD',
		STEP1_PIN_LOGIN: 'STEP1_PIN',
		STEP1_BIOMETRIC_LOGIN: 'STEP1_BIOMETRIC',
		STEP2_CHECK_BINDING: 'STEP2_CHECK_BINDING',
		STEP3_BINDING_REQUEST: 'STEP3_BINDING_REQUEST',
		STEP4_BINDING: 'STEP4_BINDING',
		STEP5_ENROLL: 'STEP5_ENROLL',
		STEP6_VERIFY_OAS_ACTIVATION: 'STEP6_VERIFY_OAS_ACTIVATION',
		STEP7_GET_USER: 'STEP7_GET_USER',
	};

	const loginFlowController = async (step) => {
		switch (step) {
			case FLOW_STEPS.STEP1_PASSWORD_LOGIN:
				await flowPasswordLogin();
				break;
			case FLOW_STEPS.STEP1_PIN_LOGIN:
				await flowPinLogin();
				break;
			case FLOW_STEPS.STEP1_BIOMETRIC_LOGIN:
				await flowBiometricLogin();
				break;
			case FLOW_STEPS.STEP2_CHECK_BINDING:
				await flowCheckBinding();
				break;
			case FLOW_STEPS.STEP3_BINDING_REQUEST:
				await flowBindingRequest();
				break;
			case FLOW_STEPS.STEP4_BINDING:
				await flowBinding();
				break;
			case FLOW_STEPS.STEP5_ENROLL:
				await flowEnrollment();
				break;
			case FLOW_STEPS.STEP6_VERIFY_OAS_ACTIVATION:
				await flowVerifyOASActivation();
				break;
			case FLOW_STEPS.STEP7_GET_USER:
				await flowGetUser();
				break;
			default:
				break;
		}
	};

	const flowPasswordLogin = async () => {
		const { id, password, domain, recaptchaToken, nativeEvent } = loginData.current;

		const validate = validateUserCredentials(id, password);
		if (!validate.ok) {
			setLoginError({ message: validate.error });
			return;
		}
		const username = id.toLowerCase().trim();

		const loginConfig = {
			screen: USER_ANALYTICS.LOGIN_SCREENS.PASSWORD_FORM,
			buttonEvent: nativeEvent,
			action: USER_ANALYTICS.LOGIN_ACTIONS.PASSWORD_LOGIN,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...loginConfig });

		setIsLoading(true);
		setLoadingProgress('Performing login');
		const response = await loginApi.passwordLogin({
			username,
			password,
			recaptchaToken,
			domain: DOMAIN_TYPE[domain ?? 0].id,
			deviceModel: localDeviceInfo.deviceModel,
			deviceId: localDeviceInfo.deviceUniqueId,
		});
		if (!response.ok) {
			setLoginError({ message: response.error });
			setIsLoading(false);
			return;
		}
		setLoadingProgress('Credentials Loaded');

		const { validateDevice, token, expiresIn } = response.data;
		loginData.current = {
			...loginData.current,
			...validateDevice,
			validateDevice,
			token,
			expiresIn,
		};

		// Check if PBSS ADID is same as login ADID, prompt conflict info page if conflict
		if (!!MFAStaffID && MFAStaffID !== algorithm.toStaffNo(username)) {
			setIsLoading(false);
			navigation.navigate(routes.MFA_INFO_CONFLICT);
			return;
		}

		await loginFlowController(FLOW_STEPS.STEP2_CHECK_BINDING);
	};

	const flowPinLogin = async () => {
		console.log('flowPinLogin');
		const { pin, recaptchaToken } = loginData.current;
		setIsLoading(true);
		setLoadingProgress('Loading Generation');

		// Get OTP from One Span SDK
		const {
			status,
			data: generateOTPData,
			errorMessage,
		} = await loginOTP({
			pinToken: pin,
			dispatch,
		});
		setLoadingProgress('Generation Complete');
		if (status !== 'S') {
			setIsLoading(false);
			const { isDeactivated, errorMessage: pinError } = await pinErrorHandler({
				status,
				dispatch,
				pinErrorCount,
				errorMessage,
			});

			if (isDeactivated) {
				showFailure(pinError);
				navigation.replace(routes.LOGIN);
				return;
			}
			setLoginError({ message: pinError });
			return;
		}
		dispatch(pinErrorCountReset());

		// Login to PBeX using OTP
		const { OTP } = generateOTPData;
		const {
			ok,
			data: optLoginData,
			error,
			screenStatus: loginScreenStatus,
		} = await loginApi.otpLogin({
			username: biometric.userid,
			domain: DOMAIN_TYPE[biometric?.domain ?? 0].key,
			otp: OTP,
			recaptchaToken,
			deviceModel: localDeviceInfo.deviceModel,
			deviceId: localDeviceInfo.deviceUniqueId,
		});
		setLoadingProgress('Quick Login Complete');

		if (!ok) {
			setLoginError({ message: error });
			setIsLoading(false);
			if (loginScreenStatus) {
				setScreenStatus(loginScreenStatus);
			}
			return;
		}

		const { token, expiresIn, validateDevice } = optLoginData;
		loginData.current = {
			...loginData.current,
			token,
			expiresIn,
			validateDevice,
		};
		await loginFlowController(FLOW_STEPS.STEP6_VERIFY_OAS_ACTIVATION);
	};

	const flowBiometricLogin = async () => {
		setLoadingProgress('Loading Biometric');
		const { ok, quickPin, errorMessage, errorTitle } = await loginUtils.getBiometric();

		if (quickPin === biometricError.newEnrollment) {
			setIsLoading(false);
			dispatch(biometricMFADestroyed());
			Alert.alert(errorTitle, errorMessage, [
				{
					text: 'No',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: () => {
						shouldReactivateBiometric.current = true;
					},
				},
			]);
			return;
		}

		if (!ok) {
			setIsLoading(false);
			if (!errorMessage) {
				showFailure('Please input your PIN.');
				return;
			}
			setLoginError({ message: errorMessage });
			return;
		}

		if (quickPin !== BIO_CONSTANT) {
			setIsLoading(false);
			setLoginError({ message: 'Please input your PIN.' });
			return;
		}

		setLoadingProgress('Loading as Biometric');
		const { status, data } = await oasBiometric();
		if (status !== 'S') {
			setIsLoading(false);
			setLoginError({ message: 'Please input your PIN.' });
			return;
		}
		const { randomPasswordInString } = data;
		if (!randomPasswordInString) {
			setIsLoading(false);
			setLoginError({
				message: 'Unable to get biometric. Please try again later.',
			});
			return;
		}
		loginData.current = {
			...loginData.current,
			pin: randomPasswordInString,
		};
		await loginFlowController(FLOW_STEPS.STEP1_PIN_LOGIN);
	};

	const flowCheckBinding = async () => {
		const requireBinding = await loginUtils.checkBindingRequired({
			validateDevice: loginData.current.validateDevice,
		});
		setLoadingProgress('Loading Check Binding');

		return loginFlowController(requireBinding ? FLOW_STEPS.STEP4_BINDING : FLOW_STEPS.STEP5_ENROLL);
	};

	const flowBindingRequest = async () => {
		const { isValidDevice } = loginData.current.validateDevice;
		if (isValidDevice) {
			return loginFlowController(FLOW_STEPS.STEP4_BINDING);
		}
		setIsLoading(false);
		setScreenStatus(LOGIN_STATE.BIND_CONFLICT);
	};

	const flowBinding = async () => {
		const { bindedDevices } = loginData.current;
		setLoadingProgress('Loading Revolver');
		const responseRevoke = await loginApi.revokeDevice(bindedDevices[0]?.deviceId);

		if (!responseRevoke.ok) {
			setLoginError({ message: responseRevoke.error });
			return setIsLoading(false);
		}
		setLoadingProgress('Loading Binding');

		const responseBind = await loginApi.bindDevice({
			deviceId: localDeviceInfo.deviceUniqueId,
			deviceName: localDeviceInfo.deviceModel,
		});
		if (!responseBind.ok) {
			setLoginError({ message: responseBind.error });
			return setIsLoading(false);
		}

		await loginFlowController(FLOW_STEPS.STEP5_ENROLL);
	};

	const flowEnrollment = async () => {
		setLoadingProgress('Loading Enrollment');
		const { id, domain } = loginData.current;
		// Biometric deviceModal and username need to be stored to indicate bound device
		dispatch(
			biometricSetup({
				deviceModel: localDeviceInfo.deviceId,
				username: id.toLowerCase().trim(),
				domain,
			}),
		);
		return loginFlowController(FLOW_STEPS.STEP6_VERIFY_OAS_ACTIVATION);
	};

	const flowVerifyOASActivation = async () => {
		const { id, domain } = loginData.current;
		const uName = id ? id.toLowerCase().trim() : biometric.userid;
		setLoadingProgress('Loading Checking Activation');
		await loginApi.verifyOASActivation({
			username: uName,
			domain: DOMAIN_TYPE[domain ?? 0].key,
		});
		return loginFlowController(FLOW_STEPS.STEP7_GET_USER);
	};

	const flowGetUser = async () => {
		const { token, expiresIn } = loginData.current;
		setLoadingProgress('Loading Modules');
		await loginApi.getAvailableModules();

		if (notification.fcmToken) {
			await loginApi.enrollNotification({ platform: Platform.OS });
		}

		setLoadingProgress('Loading Information');
		const response = await loginApi.getStaffInfo();
		if (!response.ok) {
			setLoginError({ message: response.error });
			setIsLoading(false);
			return;
		}

		const { data, headers } = response;
		const cacheDate = Moment(new Date()).format(dateFormat.DATE_TIME);

		setIsLoading(false);

		// reset force login state
		dispatch(forcePasswordLoginReset());

		const userData = {
			...data,
			token,
			expiresIn,
			cacheDate,
			isPnAdmin: headers.ispnadmin === '1' ? 1 : 0,
		};

		if (shouldReactivateBiometric.current) {
			reActivateBiometric(userData);
			return;
		}

		// set sentry user infomation
		setUser({
			id: encryptData(response?.data?.personId),
			username: response?.data?.name,
		});

		dispatch(userStored(userData));
	};

	const handlePasswordLogin = async ({ id, password, domain, recaptchaToken, nativeEvent }) => {
		loginData.current = { id, password, domain, recaptchaToken, nativeEvent };
		handleKeyboardClose();
		return loginFlowController(FLOW_STEPS.STEP1_PASSWORD_LOGIN);
	};

	const handleBiometricLogin = async (e, recaptchaToken) => {
		setIsLoading(true);
		const biometricType = await biometricUtils.getBiometricType();
		dispatch(biometricTypeStored(biometricType));
		if (!biometricType) {
			setIsLoading(false);
			setLoginError({ message: 'Biometric not available' });
			return;
		}
		if (biometric.fromLogout) {
			setIsLoading(false);
			dispatch(biometricFromLogout(false));
			return;
		}

		if (!biometric.isQuickLogin) {
			setIsLoading(false);
			dispatch(biometricFromLogout(false));
			setLoginError({ message: 'Biometric not enabled' });
			return;
		}
		if (biometricType === BiometricType.FACE_ID || biometricType === BiometricType.TOUCH_ID) {
			loginData.current = { recaptchaToken };
			return loginFlowController(FLOW_STEPS.STEP1_BIOMETRIC_LOGIN);
		}

		setLoginError({ message: 'Biometric not available' });
	};

	const handlePinLogin = async (pin, recaptchaToken) => {
		// PIN login using SDK
		if (isActivatedMFA && biometric?.userid) {
			loginData.current = { pin, recaptchaToken };
			return loginFlowController(FLOW_STEPS.STEP1_PIN_LOGIN);
		}
		setLoginError({ message: MESSAGE_PLEASE_LOGIN });
		setScreenStatus(LOGIN_STATE.SPLASH);
	};

	const handleKeyboardClose = () => {
		Keyboard.dismiss();
	};

	const handlePopupClose = () => setLoginError(null);

	const handleMFAPress = (isFromDeeplink = false) => {
		// if PBSS V2 activated, redirect to Pin Login
		if (isActivatedMFA) {
			navigation.navigate(routes.MFA_PIN, {
				isFromDeeplink: typeof isFromDeeplink === 'boolean' && isFromDeeplink,
				isResetToLogin: true,
			});
			return;
		}

		// If already bound but PBSS not activated, force login
		if (!isActivatedMFA && biometric?.userid) {
			setScreenStatus(LOGIN_STATE.FORCE_LOGIN);
			return;
		}

		// No PBSS V2 activated, redirect to MFA activation screen
		navigation.navigate(routes.MFA_TNC, { path: routes.MFA_ADID_FORM });
	};

	const handleBindConflict = () => {
		setIsLoading(true);
		loginFlowController(FLOW_STEPS.STEP4_BINDING).then();
	};

	const handleCancel = () => {
		setIsLoading(false);
		setScreenStatus(LOGIN_STATE.SPLASH);
	};

	const handleForgotPin = () => {
		setIsLoading(false);
		setIsAlertVisible(true);
	};

	const handleConfirmForgotPin = async () => {
		setIsAlertVisible(false);
		setScreenStatus(LOGIN_STATE.SPLASH);
		await destroyPBSSToken(dispatch);
	};

	const handleCloseForgotPin = () => {
		setIsAlertVisible(false);
	};

	const handlePBSSConflict = async () => {
		setIsLoading(true);
		await destroyPBSSToken(dispatch);
		return loginFlowController(FLOW_STEPS.STEP2_CHECK_BINDING);
	};

	const props = {
		handlePasswordLogin,
		handleBiometricLogin,
		handlePinLogin,
		handleKeyboardClose,
		handleLoginPress,
		handleMFAPress,
		handleBindConflict,
		handleCancel,
		handleForgotPin,
		handleCloseForgotPin,
		handleConfirmForgotPin,
		handlePBSSConflict,
		isAlertVisible,
		screenStatus,
	};

	return (
		<>
			{showFestive ? (
				<LoginFestiveComp {...props} ref={viewRef} />
			) : (
				<LoginComp {...props} ref={viewRef} />
			)}
			<LoginErrorPopup
				visible={!!loginError?.message}
				title={loginError?.title}
				testID={'error-pop-up-login'}
				message={loginError?.message}
				onClose={handlePopupClose}
			/>
			{isLoading && <Loading label={loadingProgress} />}
		</>
	);
};
