import { parseInt } from 'lodash';
import { Alert, Linking, Platform } from 'react-native';

import Package from '../../package.json';

const currentVer = Package.version;
const url =
	Platform.OS === 'ios'
		? 'https://apps.apple.com/my/app/pbexperience/id1492984631'
		: 'https://play.google.com/store/apps/details?id=com.reacttutorialapp&hl=en';

const alertUpdateAppVersion = () => {
	Alert.alert(
		'New version',
		'Please update to continue',
		[
			{
				text: 'Update Now',
				onPress: () => {
					Linking.openURL(url);
				},
			},
		],
		{ cancelable: false },
	);
};

const validateUpdatable = (minVersion) => {
	if (!!minVersion && !!currentVer) {
		const currentVerArr = currentVer.split('.');
		const minVersionArr = minVersion.split('.');
		// Only check until 2nd segment of version to force update, last segment update is optional
		if (parseInt(currentVerArr[0]) < parseInt(minVersionArr[0])) {
			return true;
		}
		return parseInt(currentVerArr[1]) < parseInt(minVersionArr[1]);
	}
};

export const appVersionUtils = {
	alertUpdateAppVersion,
	validateUpdatable,
};
