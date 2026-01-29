const verifyActivation = {
	data: {
		hasSoftToken: false,
		hasHardToken: false,
		message: null,
		status: 'S',
	},
	ok: true,
	status: 200,
};

const validateId = {
	data: {
		isLicenseAvailable: true,
		message: null,
		status: 'S',
	},
	ok: true,
	status: 200,
};

const initSoftTokenActivation = {
	data: {
		message: null,
		pacSeqNo: 'DKNG',
		phoneNo: null,
		status: 'S',
	},
	ok: true,
	status: 200,
};

const getSecfa = {
	data: {
		message: null,
		secfaMethod: 'NOT_REQUIRED',
		status: 'S',
	},
	ok: true,
	status: 200,
};

const validateSignature = {
	data: {
		message: null,
		status: 'S',
	},
	ok: true,
	status: 200,
};

const submitTransaction = {
	data: {
		messasge: null,
		status: 'S',
	},
	ok: true,
	status: 200,
};

const activateTokenInstance = {
	data: {
		status: 'S',
	},
	ok: true,
	status: 200,
};

const registerDSApp = {
	data: {
		salt: '',
	},
	ok: true,
	status: 200,
};

const requestServerUtcTime = {
	data: 1710381887,
	ok: true,
	status: 200,
};

const requestTimeSync = {
	ok: true,
	status: 204,
};

export const SoftTokenData = Object.assign(
	{},
	{
		VerifyActivation: verifyActivation,
		ValidateId: validateId,
		Activate: activateTokenInstance,
		SubmitTransaction: submitTransaction,
		Secfa: getSecfa,
		InitSoftTokenActivation: initSoftTokenActivation,
		RegisterDSApp: registerDSApp,
		RequestServerUtcTime: requestServerUtcTime,
		RequestTimeSync: requestTimeSync,
	},
);
