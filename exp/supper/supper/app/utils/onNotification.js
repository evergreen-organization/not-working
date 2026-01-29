import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import { notificationReceived } from 'stores';

const start = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dispatch = useDispatch();

	messaging().onNotificationOpenedApp((msg) => {
		console.log('Notification caused app to open from background state');
		const { contentId } = msg?.data || {};
		const { title, body } = msg?.notification || {};
		dispatch(
			notificationReceived({
				contentId,
				title,
				body,
				isClicked: true,
				type: 'O',
				sentTime: msg.sentTime,
				isShown: false,
			}),
		);
	});

	messaging()
		.getInitialNotification()
		.then((msg) => {
			if (msg) {
				console.log('Notification caused app to open from quit state');
				const { contentId } = msg?.data || {};
				const { title, body } = msg?.notification || {};
				dispatch(
					notificationReceived({
						contentId,
						title,
						body,
						isClicked: true,
						type: 'O',
						sentTime: msg.sentTime,
						isShown: false,
					}),
				);
			}
		});

	messaging().onMessage((msg) => {
		console.log('Notification received when app is active');
		const { contentId } = msg?.data || {};
		const { title, body } = msg?.notification || {};
		dispatch(
			notificationReceived({
				contentId,
				title,
				body,
				isClicked: false,
				type: 'I',
				sentTime: msg.sentTime,
				isShown: false,
			}),
		);
	});
};

export default { start };
