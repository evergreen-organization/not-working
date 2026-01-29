import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Platform } from 'react-native';

import {
	biometricMFADestroyed,
	biometricOTPDisabled,
	biometricOTPEnabled,
	biometricQuickLoginDisabled,
	biometricQuickLoginEnabled,
	disableNotification,
	enableNotification,
	enrollNotification,
	fetchRevokeDevice,
	getBiometric,
	getHardTokenStatus,
	getLogin,
	getMFAStatus,
	getModulesAvailable,
	getNotification,
	unbind,
} from 'stores';
import { useAppState } from 'hooks';
import {
	checkPushNotificationPermission,
	deleteKeychain,
	hasSensor,
	requestPushNotificationPermission,
	showRequestPermissionAlert,
} from 'utils';
import { routes } from 'navigations';
import { storage } from 'auth';

import { SettingsComp } from './component';
import { LBL_UNBIND_DEVICE } from '../../mfa/constants';
import { removeEbizCardInSharedStorage } from 'screens/eBizCard/utils/utils';

export const Settings = ({ navigation }) => {
	const dispatch = useDispatch();
	const isBackground = useAppState();

	const isActivatedMFA = useSelector(getMFAStatus);
	const biometric = useSelector(getBiometric);
	const hasHardToken = useSelector(getHardTokenStatus);
	const { isEnabled, isEnrolled } = useSelector(getNotification) || {};
	const { adid } = useSelector(getModulesAvailable) || {};
	const { loading } = useSelector(getLogin);

	const [initialRender, setInitialRender] = useState(true);
	const [sensor, setSensor] = useState(false);
	const [biometricQuickLogin, setBiometricQuickLogin] = useState(false);
	const [biometricOTP, setBiometricOTP] = useState(false);
	const [pushNotification, setPushNotification] = useState(isEnabled);
	const hasBiometricSettled = useRef(false);

	useEffect(() => {
		setInitialRender(false);
		(async () => {
			await checkBiometric();
			await checkNotification();
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (!initialRender) {
				await checkBiometric();
			}
		})();
	}, [biometric]);

	useEffect(() => {
		(async () => {
			if (!initialRender) {
				await checkNotification();
			}
		})();
	}, [isBackground]);

	// to destroy biometric if both quick login and otp biometric disabled
	useEffect(() => {
		if (hasBiometricSettled.current && !biometricQuickLogin && !biometricOTP) {
			dispatch(biometricMFADestroyed());
		}
	}, [biometricQuickLogin, biometricOTP]);

	const checkBiometric = async () => {
		const temp = await hasSensor();
		setSensor(temp);
		if (!temp || temp === 'locked') {
			setBiometricQuickLogin(false);
			setBiometricOTP(false);
			return;
		}

		setBiometricQuickLogin(biometric.isQuickLogin);
		setBiometricOTP(biometric.isOTP);
		hasBiometricSettled.current = true;
	};

	const checkNotification = async () => {
		//check on the push notification status to toggle the switch
		const permission = await checkPushNotificationPermission();
		const enabled = permission && isEnrolled;
		if (enabled !== isEnabled) {
			enabled ? await dispatch(enableNotification()) : await dispatch(disableNotification());
		}
		setPushNotification(enabled);
	};

	const handleTogglePushNotification = async () => {
		if (pushNotification) {
			return showRequestPermissionAlert({
				title: 'Disable push notifications',
				desc: 'Go to settings and turn off access',
			});
		}
		return await enrollPushNotification();
	};

	const enrollPushNotification = async () => {
		const permission = await requestPushNotificationPermission();
		if (permission) {
			if (!isEnrolled) {
				await dispatch(enrollNotification({ platform: Platform.OS }));
			}
			await dispatch(enableNotification());
		}
	};

	const handleToggleSoftToken = () => {
		if (isActivatedMFA) {
			return; //To turn off
		}

		if (hasHardToken) {
			navigation.navigate(routes.MFA_HAS_HARD_TOKEN);
			return;
		}
		//To turn on
		navigation.navigate(routes.MFA_INTRO);
	};

	const handleToggleQuickLogin = async (value) => {
		if (!value) {
			dispatch(biometricQuickLoginDisabled());
			setBiometricQuickLogin(false);
			return;
		}
		if (!(await hasSensor())) {
			noBiometricPermission();
			setBiometricQuickLogin(false);
			return;
		}

		if (!biometric.isStored) {
			goValidatePin();
			return;
		}

		dispatch(biometricQuickLoginEnabled());
		setBiometricQuickLogin(true);
	};

	const handleToggleOTP = async (value) => {
		if (value) {
			if (!(await hasSensor())) {
				noBiometricPermission();
				setBiometricOTP(false);
				return;
			}
			if (biometric.isStored) {
				dispatch(biometricOTPEnabled());
				setBiometricOTP(true);
				return;
			} else {
				goValidatePin();
			}
		} else {
			dispatch(biometricOTPDisabled());
		}
		setBiometricOTP(false);
	};

	const noBiometricPermission = () =>
		showRequestPermissionAlert({
			title: 'Face/Touch ID permission is required',
			desc: 'Go to settings and turn on access. If permission was given, it might due to Face/Touch ID not turned on in your phone.',
		});
	const goValidatePin = () => navigation.navigate(routes.VALIDATE_PIN);

	const handleToggleDeviceBinding = (value) => {
		if (!value) {
			if (biometric.userid !== undefined) {
				Alert.alert(
					'Warning',
					LBL_UNBIND_DEVICE,
					[
						{
							text: 'Yes',
							onPress: revokeDevice,
						},
						{ text: 'No' },
					],
					{ cancelable: false },
				);
			}
		}
	};

	const revokeDevice = async () => {
		const secret = await storage.getSecret();
		await dispatch(fetchRevokeDevice({ revokeDeviceId: secret.deviceId }));
		dispatch(unbind());
		await deleteKeychain();

		// clear ebiz image from share storage
		removeEbizCardInSharedStorage();
	};

	const handleHeaderLeftBtn = () => navigation.goBack();

	const handleChangePin = () => {
		navigation.navigate(routes.VALIDATE_PIN, { path: routes.CHANGE_PIN });
	};

	const props = {
		handleHeaderLeftBtn,
		handleToggleQuickLogin,
		handleToggleSoftToken,
		handleToggleOTP,
		handleTogglePushNotification,
		handleToggleDeviceBinding,
		sensor,
		biometricOTP,
		biometricQuickLogin,
		adid,
		pushNotification,
		biometric,
		loading,
		isActivatedMFA,
		handleChangePin,
	};

	return <SettingsComp {...props} />;
};
