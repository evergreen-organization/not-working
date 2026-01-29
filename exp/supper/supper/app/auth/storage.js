import SInfo from 'react-native-sensitive-info';
import logger from '../configs/logger';

const secretKey = 'secret';
const secretConfig = {
	sharedPreferencesName: 'secretStorage',
	keychainService: 'secretStorage',
};

const storeSecret = async (secret) => {
	try {
		await SInfo.setItem(secretKey, JSON.stringify(secret), secretConfig);
	} catch (error) {
		console.log('Error storing the secret');
	}
};

const getSecret = async () => {
	try {
		const secret = await SInfo.getItem(secretKey, secretConfig);
		if (secret) {
			return JSON.parse(secret);
		}
		throw new Error('invalid profile');
	} catch (error) {
		logger.log('Error getting the secret');
	}
};

const removeSecret = async () => {
	try {
		await SInfo.deleteItem(secretKey, secretConfig);
	} catch (error) {
		logger.log('Error removing the secret', error);
	}
};

const removeToken = async () => {
	try {
		const secret = await getSecret();
		if (secret) {
			delete secret.token;
			await storeSecret(secret);
		}
	} catch (error) {
		logger.log('Error removing the token', error);
	}
};

export default {
	storeSecret,
	getSecret,
	removeSecret,
	removeToken,
};
