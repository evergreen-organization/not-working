import CreditCard from '../../assets/icon/card.png';

const getProspects = {
	data: [
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
			customerAliasId: 2,
			name: 'Maggie Mee',
			nickname: 'maggie',
			contactNo: '+06123456789',
			products: [
				{
					name: 'Car Loan',
					dateInterested: '2022/09/16',
					dateCreated: '2022/09/16',
					branch: 'branch2',
					salesPersonnel: 'Sales Rep2',
					status: 'A',
					statusDesc: 'Pending eConsent Form',
					statusDate: '2022/09/16',
				},
				{
					name: 'Car Loan',
					dateInterested: '2022/09/16',
					dateCreated: '2022/09/16',
					branch: 'branch2',
					salesPersonnel: 'Sales Rep2',
					status: 'I',
					statusDesc: 'Inactive',
					statusDate: '2022/09/16',
				},
			],
		},
	],
	ok: true,
	status: 200,
};

const getBranch = {
	data: [
		{ brDeptName: 'Bandar Sri Damansara', brDeptCode: 'BSD' },
		{ brDeptName: 'Damansara Jaya', brDeptCode: 'DJA' },
		{ brDeptName: 'Damansara Utama', brDeptCode: 'DUA' },
		{ brDeptName: 'Kota Damansara', brDeptCode: 'KDA' },
		{ brDeptName: 'Kuala Selangor', brDeptCode: 'KS' },
	],
	ok: true,
	status: 200,
};

const getProducts = {
	data: [
		{ productName: 'Credit Card', productCode: '111', icon: CreditCard },
		{ productName: 'Car Loan', productCode: '222', icon: CreditCard },
		{ productName: 'House Loan', productCode: '333', icon: CreditCard },
		{ productName: 'Others', productCode: '444', icon: CreditCard },
	],
	ok: true,
	status: 200,
};

const getCustomer = {
	data: {
		name: 'Choo Chong Fun',
		contactNo: '06123456789',
	},
	ok: true,
	status: 200,
};

const verifyCustomerProduct = {
	data: {
		exist: false,
	},
	ok: true,
	status: 200,
};

const getSalesPersonnel = {
	data: [
		{ name: 'yang Bibi', staffNo: '54321' },
		{ name: 'Low Sze Yang', staffNo: '43689' },
		{ name: 'Ling Ling', staffNo: '11223' },
	],
	ok: true,
	status: 200,
};

const searchStaff = {
	data: { name: 'UAT11045', staffNo: 'klc39940' },
	ok: true,
	status: 200,
};

const getReferral = {
	data: {
		staffNo: '39940',
		name: 'UAT39940',
		regBrDeptCode: 'BR001',
		regBrDeptName: 'Branch 001',
		designation: 'Manager',
	},
	ok: true,
	status: 200,
};

const addProspect = {
	data: {
		referralCode: '2121221',
	},
	ok: true,
	status: 200,
};

export const LeadgenData = Object.assign(
	{},
	{
		Prospect: getProspects,
		Branch: getBranch,
		Products: getProducts,
		Customer: getCustomer,
		VerifyProduct: verifyCustomerProduct,
		SalesPersonnel: getSalesPersonnel,
		Referral: getReferral,
		AddProspect: addProspect,
		SearchStaff: searchStaff,
	},
);
