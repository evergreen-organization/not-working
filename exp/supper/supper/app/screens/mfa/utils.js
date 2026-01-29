import { DIGIPASS_ERROR, PBSS_DEACTIVATED } from './constants';
import { destroyPBSSToken } from 'softToken';
import { pinErrorCountIncreased, pinErrorCountReset } from 'stores';

export const validateQRFull = ({ regID, actPwd, userId }) => {
	return !!regID && !!actPwd && !!userId;
};

export const validateQRID = ({ qrId, urName }) => {
	if (!urName || urName.length < 4) {
		return null;
	}
	let upperCaseName = urName.toUpperCase();
	let upperQrName = qrId.toUpperCase();
	let getUrName = upperQrName.slice(0, qrId.length - 4);
	return getUrName === upperCaseName;
};

export const mergeQRData = ({ firstQR, secondQR }) => {
	const { regID, actPwd, userId } = firstQR;
	const { regID: secondRegID, actPwd: secondActPwd, userId: secondUserId } = secondQR;
	return {
		regID: regID || secondRegID,
		actPwd: actPwd || secondActPwd,
		userId: userId || secondUserId,
	};
};

export const pinErrorHandler = async ({ status, dispatch, pinErrorCount, errorMessage }) => {
	// Wrong password will have counter of 3
	if (status === DIGIPASS_ERROR.PASSWORD_WRONG) {
		if (parseInt(pinErrorCount) <= 0) {
			await destroyPBSSToken(dispatch);
			dispatch(pinErrorCountReset());
			return {
				isDeactivated: true,
				errorMessage: PBSS_DEACTIVATED,
			};
		}

		await dispatch(pinErrorCountIncreased());
		return {
			isDeactivated: false,
			errorMessage: `Incorrect PIN. ${pinErrorCount} attempt(s) left`,
		};
	}

	// INVALID and LOCK should destroy PBSSToken
	if (status === DIGIPASS_ERROR.PASSWORD_LOCK || status === DIGIPASS_ERROR.STATUS_INVALID) {
		await destroyPBSSToken(dispatch);
		return {
			isDeactivated: true,
			errorMessage: PBSS_DEACTIVATED,
		};
	}

	return {
		isDeactivated: false,
		errorMessage: errorMessage || 'Invalid PIN',
	};
};
