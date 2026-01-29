import { RSA } from 'react-native-rsa-native';
import { useSelector } from 'react-redux';
import { getBiometric, getPin, getPublicKey } from 'stores';
import { Config } from '../../env';
import useApi from './useApi';
import { checkIsDemoFromUserId } from 'utils';

export const useRSA = () => {
	const { userid, domain } = useSelector(getBiometric) || {};
	const isDemo = checkIsDemoFromUserId(userid);
	const { publicKey } = useSelector(getPin) || {};
	const getPublicKeyApi = useApi(getPublicKey);

	const encryptIAM = async (param) => {
		if (isDemo) {
			return param;
		}
		const encrypted = await RSA.encrypt(
			JSON.stringify({
				adid: userid,
				domain: domain ? 'PIV' : 'PBB',
				...param,
			}),
			Config.REGION === 'PROD'
				? Config.CERT_PUBLIC_KEY_PROD
				: Config.CERT_PUBLIC_KEY_UAT,
		);
		return encrypted;
	};

	const encryptPin = async (param) => {
		if (isDemo) {
			return param;
		}
		const key = await getPinPublicKey();
		if (key) {
			const encrypted = await RSA.encrypt(param, key);
			return encrypted;
		}

		return false;
	};

	const getPinPublicKey = async () => {
		if (publicKey) {
			return publicKey;
		}

		const publicKeyResult = await getPublicKeyApi.request();
		if (publicKeyResult.data?.key) {
			return publicKeyResult.data?.key;
		}
		return false;
	};

	return { encryptIAM, encryptPin };
};
