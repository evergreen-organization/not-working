import { create } from 'apisauce';
import storage from '../auth/storage';
import { Config } from '../../env';
import {
	CONNECTION_TIMEOUT,
	CONNECTION_TIMEOUT_MSG,
	SERVER_UNAVAILABLE,
} from 'constant';

const requestTimeout = (promise, axiosConfig, customConfig) => {
	const duration = customConfig?.timeout || axiosConfig?.timeout;
	const timeoutPromise = new Promise((resolve, reject) =>
		setTimeout(
			() =>
				resolve({
					ok: false,
					problem: CONNECTION_TIMEOUT_MSG,
					originalError: null,
					data: null,
					status: CONNECTION_TIMEOUT,
					headers: null,
					config: null,
					duration,
				}),
			duration,
		),
	);
	return Promise.race([timeoutPromise, promise]);
};

const client = () => {
	const api = create({
		baseURL: `https://${Config.API}`,
		timeout: 15000,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const {
		axiosInstance: { defaults },
		get,
		delete: del,
		head,
		post,
		put,
		patch,
		link,
		unlink,
	} = api;

	api.get = (...args) => requestTimeout(get(...args), defaults, args[2]);
	api.delete = (...args) => requestTimeout(del(...args), defaults, args[2]);
	api.head = (...args) => requestTimeout(head(...args), defaults, args[2]);
	api.post = (...args) => requestTimeout(post(...args), defaults, args[2]);
	api.put = (...args) => requestTimeout(put(...args), defaults, args[2]);
	api.patch = (...args) => requestTimeout(patch(...args), defaults, args[2]);
	api.link = (...args) => requestTimeout(link(...args), defaults, args[2]);
	api.unlink = (...args) => requestTimeout(unlink(...args), defaults, args[2]);

	api.addAsyncResponseTransform(async (response) => {
		response.originalError = null;
		response.config = null;

		/* handle eSec blocking api call */
		if (
			typeof response.data === 'string' &&
			response.data?.includes('<!DOCTYPE html')
		) {
			response.ok = false;
			response.status = SERVER_UNAVAILABLE;
		}
	});

	api.axiosInstance.interceptors.request.use(async (request) => {
		const secret = await storage.getSecret();
		// If data is undefined, content-type in header will gone, then request will blocked by security
		// For method get, data should not contain any value, otherwise will blocked by security as well
		if (
			!request.data &&
			(request.method === 'POST' || request.method === 'post')
		) {
			request.data = {};
		}

		if (secret) {
			request.headers.Authorization = `Bearer ${secret.token}`;
			request.headers.DevId = secret.deviceId;
		}
		return request;
	});

	api.axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		async function (error) {
			return Promise.reject(error);
		},
	);

	return api;
};

export default client();
