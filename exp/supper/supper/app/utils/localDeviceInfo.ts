import DeviceInfo from 'react-native-device-info';
export class DeviceInformation {
	//constructor to store the device info
	deviceId: string | null;
	deviceUniqueId: string | null;
	deviceModel: string | null;
	deviceBundleId: string | null;
	version: string | null;

	constructor() {
		this.deviceId = null;
		this.deviceUniqueId = null;
		this.deviceModel = null;
		this.deviceBundleId = null;
		this.version = null;
	}

	async init() {
		this.deviceId = DeviceInfo.getDeviceId();
		this.deviceModel = DeviceInfo.getModel();
		this.deviceUniqueId = await DeviceInfo.getUniqueId();
		this.deviceBundleId = DeviceInfo.getBundleId();
		this.version = DeviceInfo.getVersion();
	}

	getDeviceId() {
		return this.deviceId;
	}

	getModel() {
		return this.deviceModel;
	}

	getUniqueId() {
		return this.deviceUniqueId;
	}
}

export const localDeviceInfo = new DeviceInformation();
