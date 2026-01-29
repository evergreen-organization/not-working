import ReactNativeBlobUtil from 'react-native-blob-util';
import storage from '../auth/storage';
import CryptoJS from 'crypto-js';
import { showFailure } from 'utils';

export const fetchPDF = async (url) => {
	const secret = await storage.getSecret();
	return new Promise((resolve, reject) => {
		ReactNativeBlobUtil.fetch('GET', url, {
			Authorization: 'Bearer ' + secret.token,
		})
			.then((res) => {
				resolve({ ok: true, data: res.data });
			})
			.catch((errorMessage, statusCode) => {
				resolve({ ok: false });
			});
	});
};

export const generatePDFUri = async (docUrl) => {
	const response = await fetchPDF(docUrl);
	if (response.ok) {
		return {
			uri: 'data:application/pdf;base64,' + response.data,
			cache: true,
			cacheFileName: CryptoJS.SHA256(response.data).toString(),
		};
	}
	showFailure('Failed to fetch PDF. Please try again later.');
	return { uri: '' };
};
