import DeviceInfo from 'react-native-device-info';
import { Alert, NativeModules, Platform } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import JailMonkey from 'jail-monkey';
import { Config } from '../../env';
import { useEffect, useRef } from 'react';
import { useFreeRasp } from 'freerasp-react-native';

const { EmulatorDetectionModule } = NativeModules;

const RASP_CONFIG = {
	androidConfig: {
		packageName: 'com.reacttutorialapp.uat',
		certificateHashes: ['VWWUX2FfkjpnggyqEDT4gT7cg+QzyhqO2OF8rgpfGas='],
	},
	iosConfig: {
		appBundleId: 'com.reacttutorialapp.uat',
		appTeamId: 'ETE2973HA8',
	},
	watcherMail: 'pbbfintech@gmail.com',
	isProd: true,
};

export const useSecurityChecking = () => {
	const alertRef = useRef(false);
	const JAIL_BREAK_MESSAGE = 'This application is not supported on rooted or jail broken devices.';
	const HOOKS_MESSAGE = 'Detected Hooking frameworks.';
	const EMULATOR_MESSAGE =
		'This app is not intended to be executed on emulated environments and may not function as expected and may expose you to online security risks. Kindly refrain from using emulators to run this application.';

	useEffect(() => {
		(async () => {
			await checkJailBreak();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useFreeRasp(RASP_CONFIG, {
		privilegedAccess: () => alertExit(JAIL_BREAK_MESSAGE),
		hooks: () => alertExit(HOOKS_MESSAGE),
	});

	const alertExit = (msg) => {
		if (alertRef.current) {
			return;
		}

		alertRef.current = true;
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

	const checkJailBreak = async () => {
		if (Config.REGION === 'DEV') {
			return;
		}

		const isEmulator =
			Platform.OS === 'ios' ? await DeviceInfo.isEmulator() : EmulatorDetectionModule.isEmulator;

		if (isEmulator) {
			return alertExit(EMULATOR_MESSAGE);
		}

		if (JailMonkey.isJailBroken()) {
			return alertExit(JAIL_BREAK_MESSAGE);
		}
	};

	return null;
};
