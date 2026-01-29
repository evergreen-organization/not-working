const fetchLogin = {
	data: {
		token: 'demo',
		expiresIn: 1800,
		validateDevice: {
			isDeviceBinded: true,
			isValidDevice: true,
			allowNoOfDevices: 5,
			isAllowBindNewDevice: true,
			bindedDevices: [
				{
					deviceId: '41A6E803-3465-4E8E-A483-790D0CD65DFC',
					deviceModel: 'iPhone14,5',
				},
			],
		},
	},
	ok: true,
	status: 200,
};

const fetchGetToken = {
	data: {
		token: 'demo',
		expiresIn: 1800,
		validateDevice: {
			isDeviceBinded: true,
			isValidDevice: true,
			allowNoOfDevices: 5,
			isAllowBindNewDevice: true,
			bindedDevices: [
				{
					deviceId: '41A6E803-3465-4E8E-A483-790D0CD65DFC',
					deviceModel: 'iPhone14,5',
				},
			],
		},
	},
	ok: true,
	status: 200,
};

const getVersion = { data: { version: '3.2.0', ok: true, status: 200 } };

const fetchStaffInfo = {
	data: {
		name: 'Demo Account',
		gradeCode: '200070',
		gradeName: 'B4',
		jobCode: 'R020',
		designation: 'SENIOR MANAGER',
		location: null,
		locationShortName: null,
		costCenter: 'BDS',
		division: 'ITD-INFORMATION TECHNOLOGY DIVISION',

		regionName: 'HEAD OFFICE',
		branchName: '146, JALAN AMPANG, AMPANG, AMPANG, 50450, KUALA LUMPUR',
		homeAddress:
			'*******************************************************************************************************',
		phoneNo: '***********',
		emergencyNo: '***********',
		isRelief: 'N',
		isPnAdmin: 1,
		staffNoList: null,
		personId: '00000',
		companyCode: null,
		noOfDays: 0,
		staffNo: null,
		code: null,
		divisionCode: '220000',
		divisionGrpCode: null,
		requesterStaffNo: null,
		maxGradeCode: null,
		status: null,
		stYmth: null,
		edYmth: null,
		startDate: null,
	},
	ok: true,
	status: 200,
	headers: {
		ispnadmin: '1',
	},
};

const fetchModuleAvailable = {
	data: {
		adid: true,
		covidTestResult: true,
		workFromHome: true,
		leadGen: true,
		eBizCard: true,
	},
	ok: true,
	status: 200,
};

const fetchPinLogin = {
	data: {
		pinRemainingAttempts: null,
		token: 'demo',
		expiresIn: 1800,
		validateDevice: {
			isDeviceBinded: true,
			isValidDevice: true,
			allowNoOfDevices: 5,
			isAllowBindNewDevice: true,
			bindedDevices: [
				{
					deviceId: '41A6E803-3465-4E8E-A483-790D0CD65DFC',
					deviceModel: 'iPhone14,5',
				},
			],
		},
	},
	ok: true,
	status: 200,
};

const fetchEnrollBiometric = {
	data: {
		enrollmentDetails: {
			deviceModel: 'davinci',
			fpToken:
				'5d57f3eff9d36b84d8ddfd16c1f0e6ce9d74aa2234a56178943bb0f11c22b5abf69fab7d485b92dbc2e3b7efe710e8c05255e3d768af6c569fa7de983e836385',
		},
		exception: null,
	},
	ok: true,
	status: 200,
};

const fetchRevokeDevice = {
	data: {
		result: 'Success',
	},
	ok: true,
	status: 200,
};

const fetchBindDevice = {
	data: {
		result: 'Success',
	},
	ok: true,
	status: 200,
};

const fetchUnbindDevice = {
	data: {
		result: 'Success',
	},
	ok: true,
	status: 200,
};
const fetchLogout = {
	data: {
		result: 'Success',
	},
	ok: true,
	status: 200,
};

export const LoginData = Object.assign(
	{},
	{
		Login: fetchLogin,
		StaffInfo: fetchStaffInfo,
		ModuleAvailable: fetchModuleAvailable,
		PinLogin: fetchPinLogin,
		BiometricLogin: fetchGetToken,
		Version: getVersion,
		Biometric: fetchEnrollBiometric,
		RevokeDevice: fetchRevokeDevice,
		BindDevice: fetchBindDevice,
		UnbindDevice: fetchUnbindDevice,
		logout: fetchLogout,
	},
);
