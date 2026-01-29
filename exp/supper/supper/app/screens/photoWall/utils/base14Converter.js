import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export const convertToBase64 = async (filepath) => {
	if (Platform.OS === 'ios') {
		return await RNFS.readFile(RNFS.MainBundlePath + filepath, 'base64').then((result) => {
			return result;
		});
	}

	return await RNFS.readFileAssets('video' + filepath, 'base64').then((result) => {
		return result;
	});
};
