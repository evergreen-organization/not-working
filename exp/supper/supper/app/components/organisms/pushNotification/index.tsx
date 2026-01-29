import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { fcmTokenUpdate, getNotification, notificationClicked, notificationShown } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Pressable, StyleSheet, View } from 'react-native';
import { checkPushNotificationPermission } from 'utils';
import { Text } from 'atoms';

const PushNotification = () => {
	const dispatch = useDispatch();
	const { fcmToken: fcmTokenFromStore, pushNotification } = useSelector(getNotification);
	const { title, body, type, isClicked, isShown } = pushNotification;

	useEffect(() => {
		(async () => {
			await getFcmToken();
		})();

		// Listen for token refresh events
		const unsubscribeTokenRefresh = messaging().onTokenRefresh((newFcmToken) => {
			storeFcmToken(newFcmToken);
		});

		return () => {
			unsubscribeTokenRefresh();
		};
	}, []);

	useEffect(() => {
		(async () => {
			await promptNotification();
		})();
	}, [pushNotification]);

	const promptNotification = async () => {
		const permission = await checkPushNotificationPermission();
		if (!permission || type === 'O' || isShown) {
			return;
		}
		if (!isClicked && type === 'I') {
			Toast.show({
				type: 'custom',
				text1: title,
				text2: body,
				onPress: notifyOnPress,
			});
			dispatch(notificationShown(true));
		}
	};

	const notifyOnPress = () => {
		Toast.hide();
		dispatch(notificationClicked(true));
	};

	const storeFcmToken = (fcmToken) => {
		if (fcmToken) {
			dispatch(fcmTokenUpdate(fcmToken));
		}
	};

	const getFcmToken = async () => {
		try {
			if (fcmTokenFromStore) {
				return;
			}
			storeFcmToken(await messaging().getToken());
		} catch (error) {
			storeFcmToken(null);
		}
	};

	return <>{!isClicked && type === 'I' && <Toast config={toastConfig} visibilityTime={10000} />}</>;
};

const toastConfig = {
	custom: ({ text1, text2, onPress }) => (
		<Pressable style={{ width: '100%' }} onPress={() => onPress(0)}>
			<View style={styles.toastContainerStyle}>
				<Text bold style={{ fontSize: 16, marginBottom: 3 }}>
					{text1}
				</Text>
				<Text style={{ fontSize: 15, color: '#666' }}>{text2}</Text>
			</View>
		</Pressable>
	),
};

const styles = StyleSheet.create({
	toastContainerStyle: {
		backgroundColor: 'rgba(255,255,255,0.95)',
		margin: 0,
		marginHorizontal: 10,
		borderRadius: 10,
		paddingHorizontal: 15,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
});
export default PushNotification;
