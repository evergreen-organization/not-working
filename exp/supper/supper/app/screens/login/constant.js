const UPDATE_SECURITY_SETTING = 'We have updated security settings. Please login again.';

const TITLE_QUICK_LOGIN_DISABLE = 'Quick Login disabled';

const MESSAGE_QUICK_LOGIN_DISABLE = 'Proceed with normal login and enable in settings.';

const TITLE_FIRST_TIME_LOGIN = 'First Time Login';

const MESSAGE_FIRST_TIME_LOGIN = 'Proceed with normal login.';

const ERROR_FAIL_REVOKE_DEVICE = 'Failed to revoke device, please try again later';

const ERROR_FAIL_BIND_DEVICE = 'Failed to bind device, please try again later';

const ERROR_INVALID_SESSION = 'Invalid session';

const ERROR_UNABLE_CONNECT_SERVER = 'Unable to connect to server';

const ERROR_INVALID_TOKEN_TRY_AGAIN = 'Invalid Token, Please try again';

const TITLE_PIN_RE_ENROLL = 'Login Failed';

const MESSAGE_PIN_RE_ENROLL = 'Please login with Password to enable Quick Login';

const ERROR_INVALID_ID_PASSWORD = 'Invalid ID or Password';

const ERROR_INVALID_TOKEN = 'Invalid Token';

const ERROR_DEVICE_NOT_VALID = 'Device not valid';

const ERROR_BIOMETRIC_ENROLLMENT = 'Biometric enrollment failed';

const ERROR_ENABLE_QUICK_LOGIN_FAIL = 'Enable quick login failed. Please Try again.';

const ERROR_LOGIN_USER_CONFLICT = 'You have logged in to different device, do you want to proceed?';

const ERROR_TITLE_LOGIN_FORCE_LOGIN = 'Warning';

const ERROR_LOGIN_FORCE_LOGIN =
	'You are bound to an AD ID.\nPlease proceed to login to activate your PB SecureSign.';

const ERROR_LOGIN_PBSS_CONFLICT =
	'Your PBSS is activated with a different AD ID. Continuing with login will destroy your PBSS token.\n\nDo you want to proceed?';

export const LOGIN_MESSAGE = {
	UPDATE_SECURITY_SETTING,
	TITLE_QUICK_LOGIN_DISABLE,
	MESSAGE_QUICK_LOGIN_DISABLE,
	TITLE_FIRST_TIME_LOGIN,
	MESSAGE_FIRST_TIME_LOGIN,
	ERROR_FAIL_REVOKE_DEVICE,
	ERROR_FAIL_BIND_DEVICE,
	ERROR_INVALID_SESSION,
	ERROR_UNABLE_CONNECT_SERVER,
	ERROR_INVALID_TOKEN_TRY_AGAIN,
	TITLE_PIN_RE_ENROLL,
	MESSAGE_PIN_RE_ENROLL,
	ERROR_INVALID_ID_PASSWORD,
	ERROR_INVALID_TOKEN,
	ERROR_DEVICE_NOT_VALID,
	ERROR_BIOMETRIC_ENROLLMENT,
	ERROR_ENABLE_QUICK_LOGIN_FAIL,
	ERROR_LOGIN_USER_CONFLICT,
	ERROR_TITLE_LOGIN_FORCE_LOGIN,
	ERROR_LOGIN_FORCE_LOGIN,
	ERROR_LOGIN_PBSS_CONFLICT,
};

export const LOGIN_STATE = {
	SPLASH: 'splash screen',
	PIN: 'pin screen',
	PASSWORD: 'password screen',
	BIND_CONFLICT: 'bind override confirm screen',
	MFA_CONFLICT: 'MFA override confirm screen',
	FORCE_LOGIN: 'Force login to activate PBSS',
};
