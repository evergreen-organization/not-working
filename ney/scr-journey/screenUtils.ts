import { CaptureProtection } from 'react-native-capture-protection';

const enableScreenShot = () => {
  CaptureProtection.allowScreenshot().then();
};

const disableScreenShot = () => {
  CaptureProtection.preventScreenshot().then();
};

export const screenUtils = {
  enableScreenShot,
  disableScreenShot,
};
