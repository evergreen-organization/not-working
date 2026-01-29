import { CaptureProtection } from 'react-native-capture-protection';

const allowScreenshot = () => {
	CaptureProtection.allowScreenshot();
};

const preventScreenshot = () => {
	CaptureProtection.preventScreenshot();
};

export const screenUtils = {
	allowScreenshot,
	preventScreenshot,
};
