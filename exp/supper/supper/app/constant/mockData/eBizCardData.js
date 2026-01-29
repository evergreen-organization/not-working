import TestAvatarImage from 'assets/avatar/004.png';
import TestAvatarImage2 from 'assets/avatar/003.png';
import { dateFormat } from 'configs';
import moment from 'moment';
import { fectProfilePicture } from './imageData';

const fetchEbizDataNew = {
	data: [
		{
			key: 'name',
			label: 'Name',
			isVisible: true,
			value: 'Jonathan Chong Wan Lin',
			isEditable: false,
			isRequired: false,
		},
		{
			key: 'designation',
			label: 'Designation',
			value: 'Senior Financial Executive',
			isVisible: true,
			isEditable: false,
			isRequired: false,
		},
		{
			key: 'company',
			label: 'Company',
			isVisible: true,
			value: 'Public Islamic Bank',
			isEditable: true,
			isRequired: false,
		},
		{
			key: 'branchName',
			label: 'Location',
			isVisible: true,
			value: 'KL City Main Office',
			isEditable: true,
			isRequired: false,
		},
		{
			key: 'branchAddress',
			label: 'Office Address (General)',
			isVisible: false,
			value: 'Ground Floor, Menara Public Bank, 146, Jalan Ampang, 50450 Kuala Lumpur',
			isEditable: true,
			isRequired: false,
		},
		{
			key: 'officeAddress',
			label: 'Office Address (Detailed)',
			isVisible: true,
			value:
				'Sales Admin & Support, Level 12, 146 Jln Ampang, Kampung Baru, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
			isEditable: true,
			descrption: 'ggff',
			isRequired: false,
		},
		{
			key: 'branchTel',
			label: 'Office Number (General)',
			isVisible: true,
			value: '03-2176 7888, 03-2163 8866',
			isEditable: true,
			isRequired: false,
		},
		{
			key: 'branchFax',
			label: 'Fax Number (General)',
			isVisible: true,
			value: '03-2163 9901, 03-2163 9932',
			isEditable: true,
			isRequired: true,
		},
		{
			key: 'directTelNo1',
			label: 'Direct Office Line/Extension 1',
			isVisible: true,
			value: '03-873 1234',
			isEditable: true,
			isRequired: false,
		},
		{
			key: 'directTelNo2',
			label: 'Direct Office Line/Extension 2',
			isVisible: true,
			value: '012-9876 5432',
			isEditable: true,
			isRequired: false,
		},
		{
			key: 'mobileNumber',
			label: 'Mobile Number',
			isVisible: true,
			value: '012-345 6789',
			isEditable: true,
			isRequired: true,
		},
		{
			key: 'email',
			label: 'Email',
			isVisible: true,
			value: 'jonathan.chong@publicbank.com.my',
			isEditable: true,
			isRequired: true,
		},
		{
			key: 'companyCode',
			label: 'Company Code (HIDDEN)',
			value: 'PBB',
			isVisible: true,
			description: null,
			isEditable: true,
			isRequired: false,
			isHidden: true,
		},
	],
	ok: true,
	status: 200,
};

const fetchFields = {
	data: [
		{
			key: 'name',
			label: 'Name',
			isEditable: false,
			isRequired: true,
			isVisible: true,
		},
		{
			key: 'designation',
			label: 'Designation',
			isEditable: false,
			isRequired: true,
			isVisible: true,
		},
		{
			key: 'company',
			label: 'Company',
			isEditable: true,
			isRequired: true,
			isVisible: true,
		},
		{
			key: 'branchName',
			label: 'Location',
			isEditable: true,
			isRequired: true,
			isVisible: true,
		},
		{
			key: 'branchAddress',
			label: 'Office Address (General)',
			isEditable: true,
			isRequired: true,
			isVisible: false,
		},
		{
			key: 'officeAddress',
			label: 'Office Address (Detailed)',
			isEditable: true,
			isRequired: true,
			isVisible: true,
			description:
				'Maintain your detailed office address in HCMS under the “Contact Details” portlet.',
		},

		{
			key: 'branchTel',
			label: 'Office Numbers (General)',
			isEditable: true,
			isRequired: false,
			isVisible: true,
		},
		{
			key: 'branchFax',
			label: 'Fax Number (General)',
			isEditable: true,
			isRequired: false,
			isVisible: true,
		},
		{
			key: 'directTelNo1',
			label: 'Direct Office Line/Extension 1',
			description: 'Maintain your direct line numbers in HCMS under the “Contact Details” portlet.',
			isEditable: true,
			isRequired: false,
			isVisible: true,
		},
		{
			key: 'directTelNo2',
			label: 'Direct Office Line/Extension 2',
			description: 'Maintain your direct line numbers in HCMS under the “Contact Details” portlet.',
			isEditable: true,
			isRequired: false,
			isVisible: true,
		},
		{
			key: 'mobileNumber',
			label: 'Mobile Number',
			isEditable: true,
			isRequired: false,
			isVisible: true,
		},
		{
			key: 'email',
			label: 'Email',
			isEditable: true,
			isRequired: false,
			isVisible: true,
		},

		{
			key: 'branchLat',
			label: 'Branch Latitude',
			isEditable: true,
			isRequired: true,
			isVisible: true,
		},
		{
			key: 'branchLong',
			label: 'Branch Longitude',
			isEditable: true,
			isRequired: true,
			isVisible: true,
		},

		{
			key: 'cardDesignId',
			label: 'Card Design',
			isEditable: true,
			isRequired: true,
			isVisible: true,
		},
		{
			key: 'companyCode',
			label: 'Company Code (HIDDEN)',
			description: null,
			isEditable: true,
			isRequired: false,
			isHidden: true,
		},
	],
	ok: true,
	status: 200,
};

const today = moment().toDate();
let todayDate = moment();
const fetchTags = {
	data: [
		{
			id: 1,
			isRequested: true,
			isActive: false,
			description: 'Sunway Pyramid Roadshow',
			creationDate: '2024-02-21T15:53:33.723',
			expiryDate: '2021-02-21T15:53:33.723',
		},
		{
			id: 2,
			isRequested: false,
			isActive: false,
			description: 'flex Low',
			creationDate: '2020-02-21T15:53:33.723',
			expiryDate: '2021-02-21T15:53:33.723',
		},
		{
			id: 3,
			isRequested: false,
			isActive: true,
			description: 'Calitex Sdn Bhd',
			creationDate: '2022-02-21T15:53:33.723',
			expiryDate: '2021-02-21T15:53:33.723',
		},
		{
			id: 4,
			isRequested: true,
			isActive: false,
			description: 'Darby Property Roadshow',
			creationDate: '2021-02-21T15:53:33.723',
			expiryDate: '2021-02-21T15:53:33.723',
		},
	],
	ok: true,
	status: 200,
};
const fetchDataApproval = {
	data: { status: 'idle', comments: [''], changedData: [] },
	ok: true,
	status: 200,
};

const fetchProfileImg = fectProfilePicture;

const fetchChangeRequestApproval = {
	data: [
		{
			id: '1',
			name: 'Jonathan Chong Wan Lim',

			transaction: [
				{
					tId: '1',
					transactionType: 'cardInfo',
					date: moment(today).format(dateFormat.DATE_DISPLAY),
					status: 'pending',
					unchangedData: [
						{
							key: 'email',
							label: 'Email',
							value: 'chong.jonathanwl@publicbank.com.my',
						},
						{ key: 'company', label: 'Company', value: 'Public Bank Berhad' },

						{
							key: 'branchAddress',
							label: 'Office Address',
							value:
								'Public Bank Bandar Sri Damansara Unit A10-13, Jalan Bukit Tinggi 12/4, 47500 Petaling Jaya, Selangor',
						},
					],

					changedData: [
						{
							changedValue: 'Carl',
							key: 'name',
							label: 'Name',
							value: 'Jonathan Chong Wan Lim',
						},
						{
							changedValue: '1233455677',
							key: 'mobileNumber',
							label: 'Mobile Number',
							value: '+601 2345 9876',
						},
						{
							changedValue: '123459077',
							key: 'branchTel',
							label: 'Office Number',
							value: '+603 1234 5678',
						},
					],
				},
				{
					tId: '1235',
					transactionType: 'profileImage',
					date: moment(today).format(dateFormat.DATE_DISPLAY),
					status: 'pending',
					unchangedData: [],
					changedData: [
						{
							changedValue: TestAvatarImage,
							key: 'profileImage',
							label: 'profileImage',
							value: TestAvatarImage2,
						},
					],
				},
			],
		},
		{
			id: '2',
			name: 'Ashwin Khoo Kee Ping',

			transaction: [
				{
					tId: '1111',
					transactionType: 'profileImage',
					date: moment(today).format(dateFormat.DATE_DISPLAY),
					status: 'pending',
					unchangedData: [],
					changedData: [
						{
							changedValue: TestAvatarImage,
							key: 'profileImage',
							label: 'profileImage',
							value: TestAvatarImage2,
						},
					],
				},
			],
		},
	],
	ok: true,
	status: 200,
};

export const EBizCardData = {
	fields: fetchFields,
	profileImg: fetchProfileImg,
	cardDataNew: fetchEbizDataNew,
	cardDataApproval: fetchChangeRequestApproval,
	tags: fetchTags,
	dataChanges: fetchDataApproval,
};
