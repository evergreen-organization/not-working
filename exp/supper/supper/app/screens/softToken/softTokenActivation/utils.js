import { getDeviceName } from 'react-native-device-info';
import { INVALID_DEVICE_NAME } from 'constant';

export const getFormattedDeviceName = async () => {
	const name = await getDeviceName();
	const specialCharactersRegex = /[^0-9A-Za-z]/g;
	const dName = name?.replace(specialCharactersRegex, '');
	return dName || INVALID_DEVICE_NAME;
};
