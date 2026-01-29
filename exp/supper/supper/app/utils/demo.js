import CryptoJs from 'crypto-js';
import { DemoData } from 'constant';
const { user } = DemoData;

const hash = (val) => CryptoJs.SHA256(val).toString(CryptoJs.enc.Hex);

export const checkDemoLoginPassword = (username, password) => {
	const encryptedPassword = hash(password);
	return (
		username?.toUpperCase() === user.userId.toUpperCase() &&
		encryptedPassword === user.secureKey
	);
};

export const checkDemoPinLogin = (username, pin, state) =>
	username?.toUpperCase() === user.userId.toUpperCase() &&
	pin === state.pin.demoPin;

export const checkIsDemoFromState = (state) =>
	state.user.staffId === user.staffId;

export const checkIsDemoFromUserId = (userid) => userid === user.userId;

export const checkIsDemoFromStaffId = (staffId) => staffId === user.staffId;
