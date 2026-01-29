import DeviceInfo from 'react-native-device-info';
import { Alert, NativeModules, Platform } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import JailMonkey from 'jail-monkey';
import { Config } from '../../env';

const { EmulatorDetectionModule } = NativeModules;

const checkJailBreak = async () => {
	if (Config.REGION === 'DEV') {
		return;
	}

	const isEmulator =
		Platform.OS === 'ios'
			? await DeviceInfo.isEmulator()
			: EmulatorDetectionModule.isEmulator;

	if (isEmulator) {
		return alertExit(
			'This app is not intended to be executed on emulated environments and may not function as expected and may expose you to online security risks. Kindly refrain from using emulators to run this application.',
		);
	}

	if (JailMonkey.isJailBroken()) {
		return alertExit(
			'This application is not supported on rooted or jail broken devices.',
		);
	}
};

const alertExit = (msg) => {
	Alert.alert(
		'Security Alert',
		msg,
		[
			{
				text: 'OK',
				onPress: () => {
					RNExitApp.exitApp();
				},
			},
		],
		{ cancelable: false },
	);
};

export default {
	checkJailBreak,
};
