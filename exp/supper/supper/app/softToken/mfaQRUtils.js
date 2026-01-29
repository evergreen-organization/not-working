import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';

const { SoftTokenModule } = NativeModules;

export const mfaQRScan = (isDemo) =>
	new Promise((resolve, reject) => {
		const emitter =
			Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(SoftTokenModule);
		const qrListener = emitter.addListener('QRemitter', function (e) {
			resolve({
				status: e?.status,
				errorCode: e?.errorCode,
				data: e?.data,
				format: e?.format,
				errorMessage: e?.errorMessage,
			});
			qrListener.remove();
		});
		SoftTokenModule.openQRScanner();
	});
