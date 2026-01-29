import {
	checkNotifications,
	PERMISSIONS,
	request,
	requestMultiple,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidNotificationSetting } from '@notifee/react-native';

export const checkCameraPermission = async () => {
	const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
	const isCameraGranted = await request(permission);
	if (isCameraGranted === RESULTS.GRANTED) {
		return true;
	}
	showRequestPermissionAlert({
		title: 'Camera Usage',
		desc: 'Please enable camera usage at settings',
	});
	return false;
};

export const checkGalleryPermission = async () => {
	const permit =
		Platform.OS === 'ios'
			? checkPermissionResult(await request(PERMISSIONS.IOS.PHOTO_LIBRARY))
			: true;

	if (permit) {
		return true;
	}
	showRequestPermissionAlert({
		title: 'PBeXperience would like to access your Gallery',
		desc: 'Please enable Media Access in settings',
	});
	return false;
};

const requestIOSNotification = async () => {
	const authorizationStatus = await messaging().requestPermission();
	return (
		authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
	);
};

export const checkPushNotificationPermission = async () => {
	if (Platform.OS === 'ios') {
		return requestIOSNotification();
	}

	const { status } = await checkNotifications();
	return checkPermissionResult(status);
};

export const requestPushNotificationPermission = async () => {
	if (Platform.OS === 'ios') {
		const permission = await requestIOSNotification();
		if (!permission) {
			showRequestPermissionAlert({
				title: 'Notifications permission is required',
				desc: 'Please enable Notification Access in settings',
			});
		}
		return permission;
	}

	//Android push notification permission
	const { status } = await requestNotifications();
	if (checkPermissionResult(status)) {
		return true;
	}
	showRequestPermissionAlert({
		title: 'Notifications permission is required',
		desc: 'Please enable Notification Access in settings',
	});
	return false;
};

export const showRequestPermissionAlert = ({ title, desc }) => {
	Alert.alert(title, desc, [
		{ text: 'Cancel' },
		{
			text: 'Go to settings',
			onPress: () => {
				Linking.openSettings();
			},
		},
	]);
};

const checkMultiplePermissionAccess = async (permissions) => {
	const statuses = await requestMultiple(permissions);
	return !!Object.values(statuses).includes(RESULTS.GRANTED);
};

export const checkPermissionResult = (result) => {
	switch (result) {
		case RESULTS.DENIED:
		case RESULTS.BLOCKED:
		case RESULTS.UNAVAILABLE:
			return false;
		case RESULTS.LIMITED:
		case RESULTS.GRANTED:
			return true;
		default:
			return false;
	}
};

export const isAlarmPermitted = async () => {
	// Check if the platform is Android and API level is 31 or higher (Android 12+)
	if (Platform.OS !== 'ios' && Number(Platform.Version) >= 31) {
		const settings = await notifee.getNotificationSettings();

		// Check if alarm permission is disabled
		if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
			return false;
		}
	}

	// If the platform is iOS or alarm permission is enabled, return true
	return true;
};
