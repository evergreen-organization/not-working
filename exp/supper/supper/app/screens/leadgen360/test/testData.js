import Moment from 'moment/moment';

const today = Moment();
export const prospectList = [
	{ name: 'Peter Su', nickName: 'peter' },
	{ name: 'Jolin', nickName: 'jolin99' },
];
export const filteredProspectList = [{ name: 'Peter Su', nickName: 'peter' }];
export const searchText = 'peter';
export const createdProductList = [
	{ dateCreated: '3/5/2023', product: 'product 1' },
	{ dateCreated: '3/4/2023', product: 'product 2' },
	{ dateCreated: '3/30/2023', product: 'product 2' },
];
export const latestDate = '2023-03-30T00:00:00+08:00';
export const JSONString = '{"name":"John", "age":30, "car":null}';
export const JSONStringNull = 'null';
export const formattedJSONObject = { name: 'John', age: 30 };
export const formattedJSONObjectNull = null;
export const prospect = [
	{
		customerAliasId: 1,
		name: 'Choo Chong Fun',
		nickname: 'nickname',
		contactNo: '+06123456789',
		products: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'R',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: Moment(today).format('M/D/YYYY HH:mm:ss'),
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Pending eConsent Form',
			},
		],
	},
	{
		customerAliasId: 1,
		name: 'Jack',
		nickname: 'nickname',
		contactNo: '+06123456789',
		products: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'C',
				statusDesc: 'Pending eConsent Form',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
		],
	},
];

export const statusCountSummary = {
	'A<20': 1,
	'A>20': 1,
	R: 1,
	C: 1,
};
export const filteredProspectListByStatusList = [
	{
		customerAliasId: 1,
		name: 'Choo Chong Fun',
		nickname: 'nickname',
		contactNo: '+06123456789',
		products: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'R',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: Moment(today).format('M/D/YYYY HH:mm:ss'),
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Pending eConsent Form',
			},
		],
		data: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: Moment(today).format('M/D/YYYY HH:mm:ss'),
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Pending eConsent Form',
			},
		],
	},
];
export const formattedProspectSectionList = [
	{
		customerAliasId: 1,
		name: 'Choo Chong Fun',
		nickname: 'nickname',
		contactNo: '+06123456789',
		latestDateCreated: Moment(today).format(),
		products: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'R',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: Moment(today).format('M/D/YYYY HH:mm:ss'),
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Pending eConsent Form',
			},
		],
		data: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: Moment(today).format('M/D/YYYY HH:mm:ss'),
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Pending eConsent Form',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'R',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
		],
	},
	{
		customerAliasId: 1,
		name: 'Jack',
		nickname: 'nickname',
		contactNo: '+06123456789',
		latestDateCreated: '2022-09-16T00:00:00+08:00',
		products: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'C',
				statusDesc: 'Pending eConsent Form',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
		],
		data: [
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'C',
				statusDesc: 'Pending eConsent Form',
			},
			{
				name: 'Car Loan',
				dateInterested: '2022/09/16',
				dateCreated: '2022/09/16',
				branch: 'branch2',
				salesPersonnel: 'Sales Rep2',
				status: 'A',
				statusDesc: 'Rejected',
				statusDate: '2022/09/16',
			},
		],
	},
];

export const emptyFilteredProspectListByStatus = [];

export const productList = [
	{
		productCode: '1',
		productName: 'BANCASSURANCE ',
	},
	{
		productCode: '2',
		productName: 'COMMERCIAL CARD',
	},
];

export const prospectListWithRandomNameNickname = [
	{ name: null, nickName: 'Apple' },
	{ name: 'Amy', nickName: 'Cat' },
	{ name: 'John', nickName: 'Car' },
];

export const sortedProspectListByNameNickname = [
	{ name: 'Amy', nickName: 'Cat' },
	{ name: null, nickName: 'Apple' },
	{ name: 'John', nickName: 'Car' },
];

export const prospectListWithRandomDateCreated = [
	{ latestDateCreated: '2023-01-01T00:00:00+08:00' },
	{ latestDateCreated: '2023-03-01T00:00:00+08:00' },
	{ latestDateCreated: '2022-12-16T00:00:00+08:00' },
];

export const sortedProspectListWithDateCreated = [
	{ latestDateCreated: '2023-03-01T00:00:00+08:00' },
	{ latestDateCreated: '2023-01-01T00:00:00+08:00' },
	{ latestDateCreated: '2022-12-16T00:00:00+08:00' },
];
