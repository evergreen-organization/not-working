import { logout } from './reducer';
import { showInfo } from 'utils';

export const logger = (store) => (next) => (action) => {
	console.group(action.type);
	console.info('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	console.log('result', result);
	console.groupEnd();
	return result;
};

const WHITELIST_API = [
	'fetchPinLogin/rejected',
	'fetchGetToken/rejected',
	'fetchLogin/rejected',
	'SoftTokenValidateId/rejected',
	'SoftTokenRegisterDevice/rejected',
	'validatePBSSSecurePIN/rejected',
	'fetchLogout/rejected',
	'userAnalytics/submit/rejected',
	'dataCollection/submit/rejected',
	'fetchUnbindDevice/rejected',
	'getServerUtcTime/rejected',
];

export const forceLogout = (store) => (next) => (action) => {
	let result = next(action);

	if (action.payload?.status === 401 && !WHITELIST_API.includes(action.type)) {
		store.dispatch(logout());
		showInfo('Logged out', 'Invalid Session');
		return;
	}
	return result;
};
