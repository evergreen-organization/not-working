import { RSA } from 'react-native-rsa-native';
import { Config } from '../../env';
import CryptoJS from 'crypto-js';

export const encryption = async (param) => {
	return await RSA.encrypt(
		JSON.stringify({
			...param,
		}),
		Config.REGION === 'PROD' ? Config.CERT_PUBLIC_KEY_PROD : Config.CERT_PUBLIC_KEY_UAT,
	);
};

// AES Encryption
export const encryptData = (data) => {
	if (!data) {
		return '';
	}
	const ciphertext = CryptoJS.AES.encrypt(data, Config.AES_SECRET).toString();
	return ciphertext;
};

// AES Decryption
export const decryptData = (ciphertext) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, Config.AES_SECRET);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
};
