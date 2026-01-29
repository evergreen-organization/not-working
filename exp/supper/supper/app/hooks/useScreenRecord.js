import {
	CaptureProtection,
	CaptureProtectionModuleStatus,
} from 'react-native-capture-protection';
import { Alert, Platform } from 'react-native';
import { useEffect } from 'react';
import { routes } from 'navigations';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUserLoggedIn } from 'stores';

export const useScreenRecord = () => {
	const navigation = useNavigation();
	const isUserLoggedIn = useSelector(getUserLoggedIn);

	useEffect(() => {
		(async () => {
			await screenRecordListener();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkScreenRecording = async () => {
		const isScreenRecord = await CaptureProtection.isScreenRecording();
		if (isScreenRecord) {
			showAlert();
		}
		return isScreenRecord;
	};

	const showAlert = () => {
		isUserLoggedIn && navigation.navigate(routes.HOME);
		Alert.alert(
			'Your screen is being recorded.',
			'Please disable screen recording to continue.',
			[
				{
					text: 'OK',
					onPress: () => {
						checkScreenRecording().then();
					},
				},
			],
		);
	};

	const screenRecordListener = async () => {
		if (Platform.OS === 'ios') {
			const isRecording = await checkScreenRecording();
			if (isRecording) {
				return;
			}
			CaptureProtection.addEventListener(async ({ status }) => {
				if (status === CaptureProtectionModuleStatus.RECORD_DETECTED_START) {
					showAlert();
				}
			});
		}
	};
};
