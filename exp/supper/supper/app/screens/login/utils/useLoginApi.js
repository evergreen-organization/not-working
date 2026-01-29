import { useDispatch } from 'react-redux';
import {
	enrollNotification as enrollNotificationApi,
	fetchBindDevice,
	fetchGetToken,
	fetchLogin,
	fetchModuleAvailable,
	fetchOTPLogin,
	fetchPinLogin,
	fetchRevokeDevice,
	fetchStaffInfo,
	forcePasswordLogin,
	getVersion,
	requestVerifyActivation,
	softTokenReset,
} from 'stores';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthType } from 'constant';
import { routes } from 'navigations';
import { storage } from 'auth';
import { appVersionUtils } from 'utils';

import { LOGIN_MESSAGE, LOGIN_STATE } from '../constant';
import { loginUtils } from './utils';
import { destroyPBSSToken } from 'softToken';

export const useLoginApi = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const revokeDevice = async (revokeDeviceId) => {
		if (!revokeDeviceId) {
			return { ok: true };
		}

		const { payload } = await dispatch(fetchRevokeDevice({ revokeDeviceId }));
		if (payload.data?.result === 'Success') {
			dispatch(softTokenReset());
			return { ok: true };
		} else {
			return {
				ok: false,
				error: LOGIN_MESSAGE.ERROR_FAIL_REVOKE_DEVICE,
			};
		}
	};

	const bindDevice = async ({ deviceId: deviceModel, deviceName }) => {
		const { payload } = await dispatch(fetchBindDevice({ deviceModel, deviceName }));
		if (payload.data?.result === 'Success') {
			return { ok: true };
		}

		return {
			ok: false,
			error: LOGIN_MESSAGE.ERROR_FAIL_BIND_DEVICE,
		};
	};

	const getAvailableModules = async () => {
		await dispatch(fetchModuleAvailable());
	};

	const verifyOASActivation = async ({ username, domain }) => {
		// only get flag to check if user have hard token. Handling will be done at home screen
		const result = await dispatch(requestVerifyActivation({ username, domain }));
		return result;
	};

	const enrollNotification = async ({ platform }) => {
		await dispatch(enrollNotificationApi({ platform }));
	};

	const getStaffInfo = async () => {
		const { payload } = await dispatch(fetchStaffInfo());
		if (payload.status !== 200) {
			return { ok: false, error: LOGIN_MESSAGE.ERROR_INVALID_SESSION };
		}

		return { ok: true, ...payload };
	};

	const pinLogin = async ({ username, pin, enteredPin, recaptchaToken, deviceModel, deviceId }) => {
		const { payload } = await dispatch(
			fetchPinLogin({
				username,
				pin,
				enteredPin,
				recaptchaToken,
				deviceModel,
			}),
		);

		return handleResponse(payload, AuthType.PIN_LOGIN, deviceId);
	};

	const otpLogin = async ({ username, domain, otp, recaptchaToken, deviceId }) => {
		const { payload } = await dispatch(
			fetchOTPLogin({
				username,
				domain,
				otp,
				recaptchaToken,
			}),
		);
		return handleResponse(payload, AuthType.PIN_LOGIN, deviceId);
	};

	const quickLogin = async ({ fpToken, username, deviceModel, deviceId }) => {
		const { payload } = await dispatch(
			fetchGetToken({
				fpToken,
				username,
				deviceModel,
			}),
		);
		return handleResponse(payload, AuthType.QUICK_LOGIN, deviceId);
	};

	const passwordLogin = async ({
		username,
		password,
		recaptchaToken,
		domain,
		deviceModel,
		deviceId,
	}) => {
		const { payload } = await dispatch(
			fetchLogin({
				username,
				password,
				deviceId,
				recaptchaToken,
				domain,
				deviceModel,
			}),
		);

		return handleResponse(payload, AuthType.AUTH_LOGIN, deviceId);
	};

	const handleResponse = async (payload, loginType, deviceId) => {
		const { data, status } = payload || {};
		if (!data) {
			return { ok: false, error: LOGIN_MESSAGE.ERROR_UNABLE_CONNECT_SERVER };
		}

		const { error, token, expiresIn, validateDevice, pinRemainingAttempts } = data;
		if (!loginUtils.isRecaptchaSessionValid({ status, error })) {
			return { ok: false, error: LOGIN_MESSAGE.ERROR_INVALID_TOKEN_TRY_AGAIN };
		}

		if (loginType === AuthType.PIN_LOGIN) {
			// Generic Error
			if (status === 400) {
				Alert.alert('Error', 'Invalid pin, please try again', [
					{ text: 'Ok', onPress: () => navigation.navigate(routes.LOGIN) },
				]);
				return { ok: false };
			}

			// Recaptcha Error, refresh recaptcha token
			if (status === 401) {
				dispatch(forcePasswordLogin());
				return { ok: false, screenStatus: LOGIN_STATE.SPLASH };
			}
			// User have activated PBSS at another device, delete PBSS token
			if (status === 412) {
				await destroyPBSSToken(dispatch);
				Alert.alert(LOGIN_MESSAGE.TITLE_PIN_RE_ENROLL, LOGIN_MESSAGE.MESSAGE_PIN_RE_ENROLL, [
					{ text: 'Ok', onPress: () => navigation.navigate(routes.LOGIN) },
				]);
				return { ok: false, screenStatus: LOGIN_STATE.SPLASH };
			}
		}

		if (!loginUtils.isPinLoginValid({ pinRemainingAttempts })) {
			return { ok: false }; // no error code, error is shown on pin screen
		}

		if (!token) {
			return {
				ok: false,
				error:
					loginType === AuthType.AUTH_LOGIN
						? LOGIN_MESSAGE.ERROR_INVALID_ID_PASSWORD
						: LOGIN_MESSAGE.ERROR_INVALID_TOKEN,
			};
		}

		await storage.storeSecret({
			token,
			expiresIn,
			deviceId,
		});

		if (loginType !== AuthType.PIN_LOGIN && !validateDevice) {
			return { ok: false, error: LOGIN_MESSAGE.ERROR_DEVICE_NOT_VALID };
		}

		const newVersionAvailable = await isAppVersionUpdatable();
		if (newVersionAvailable) {
			return { ok: false }; // no error code, error code is handle by another alert
		}

		return { ok: true, ...payload };
	};

	const isAppVersionUpdatable = async () => {
		const { payload } = await dispatch(getVersion());
		if (payload?.status === 200) {
			const isRequireUpdate = appVersionUtils.validateUpdatable(payload?.data.version);
			if (isRequireUpdate) {
				appVersionUtils.alertUpdateAppVersion();
				return true;
			}
		}
		return false;
	};

	return {
		revokeDevice,
		getAvailableModules,
		enrollNotification,
		getStaffInfo,
		bindDevice,
		quickLogin,
		pinLogin,
		otpLogin,
		passwordLogin,
		verifyOASActivation,
	};
};
