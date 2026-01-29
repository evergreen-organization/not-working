import { NativeModules } from 'react-native';
import {
	decrypt,
	genSecretKey,
	getNumbersFromHash,
	getSHA512hash,
} from './softTokenActivationUtils';
import {
	requestPBSSInitTransaction,
	requestPBSSSecfa,
	validatePBSSSignature,
} from 'stores';
import { PBSS_NO_SECFA } from './constants';

const { SoftTokenSigner } = NativeModules;

/** Transaction Signing Functions **/
/** Initiate Transaction Authentication and Retrieve Transaction **/
export const initTransactionAuthentication = async ({ dispatch }) => {
	const { payload } = await dispatch(requestPBSSInitTransaction());
	console.log({ path: 'init trans auth', payload });
	return retrieveSecuredTransaction(payload?.data);
};

export const retrieveSecuredTransaction = async ({
	transactionId,
	transactionSecureChannelMessage,
	encryptedTransactionObject,
}) => {
	const retrievalResult = await SoftTokenSigner.retrieveDeviceBindingEssentials(
		transactionSecureChannelMessage,
	);
	console.log({ path: 'retrieveTransactionAuthentication', retrievalResult });
	if (!retrievalResult) {
		return { transactionStr: null, transactionId };
	}
	const { password, salt, iv, txnHash, refKey } = JSON.parse(
		retrievalResult.jsonString,
	);
	const secretKey = genSecretKey(password, salt);
	const transactionStr = decrypt(encryptedTransactionObject, secretKey, iv);
	const hashedTransactionStr = getSHA512hash(transactionStr);
	if (
		hashedTransactionStr === txnHash.toUpperCase() &&
		getNumbersFromHash(hashedTransactionStr).substr(0, 8) ===
			refKey.toUpperCase()
	) {
		//Valid match
		return { transactionStr, transactionId };
	} else {
		return { transactionStr: null, transactionId };
	}
};

export const decodeTransactionStr = (transactionStr) => {
	if (!transactionStr) {
		return [];
	}
	const data = JSON.parse(decodeURIComponent(transactionStr));
	console.log({ path: 'decode transaction', data });
	return data;
};

export const retrievePendingTransaction = async (tran) => {
	const { transactionStr } = await retrieveSecuredTransaction(tran);
	if (!transactionStr) {
		return;
	}
	const transaction = JSON.parse(transactionStr);
	console.log({
		path: 'retrievePendingTransaction',
		transaction,
		transactionStr,
	});
	return decodeTransactionStr(transaction.transactionDetails);
};

/** Sign and Validate Transaction **/
export const signTransaction = async ({
	randomPasswordDerivator,
	serverUTCTime,
}) => {
	const signTranResult = await SoftTokenSigner.signTransaction(
		randomPasswordDerivator,
		serverUTCTime?.toString(),
	);
	console.log({ path: 'sign tran', signTranResult });
	return signTranResult?.secureChannelMessageSignature;
};

export const validateTransactionSignature = async ({
	isPublic = true,
	transactionId,
	signature,
	state,
	dispatch,
}) => {
	const request = {
		isPublic,
		transactionId,
		signature,
	};
	const { payload: response } = await dispatch(validatePBSSSignature(request));
	console.log({ path: 'submit trans validation', response });
	if (response.problem) {
		if (response.status === 'E00039') {
			return { authenticationExpired: true, problem: response.problem };
		}
		return {
			errorMsg: response.problem?.replace(
				'${count}',
				response.data?.secfaAttempts,
			),
		};
	}

	return response;
};

/** Retrieving Secfa for Identifying Authentication Method **/

export const identifyAuthenticationMethod = async ({ secfaInfo, dispatch }) => {
	const { payload } = await dispatch(requestPBSSSecfa({ secfaInfo }));
	const { data, problem } = payload || {};
	const { availableSecfa, secfaMethod } = data || {};

	console.log({ path: 'identifyAuthenticationMethod', payload });

	if (problem) {
		return {
			isFailure: true,
			message: `${
				problem ??
				"We've encountered an unexpected error. Please try again later."
			}`,
		};
	}

	if (secfaMethod === PBSS_NO_SECFA) {
		return { isSecfaNotRequired: true };
	}
	if (availableSecfa) {
		return { showPac: true };
	}
	if (availableSecfa?.length > 1) {
		return { showSecfaModal: true };
	}

	/* Pin Only need extra api handling */
	const authenticatedTrx = await initTransactionAuthentication({ dispatch });
	const { transactionStr, transactionId } = authenticatedTrx || {};
	if (transactionStr) {
		return { showPinModal: true, transactionId };
	}
	return { transactionId };
};
