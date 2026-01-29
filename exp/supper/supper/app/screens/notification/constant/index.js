import * as Yup from 'yup';

export const NOTIFICATION_CATEGORY_LIST = [
	{
		id: 2,
		name: 'Announcement',
	},
	{
		id: 3,
		name: 'System',
	},
	{ id: 4, name: 'Leave' },
	{
		id: 5,
		name: 'Clinic',
	},
	{
		id: 6,
		name: 'Meeting',
	},
	{
		id: 7,
		name: 'Event',
	},
	{
		id: 8,
		name: 'Promotion',
	},
];

export const NOTIFICATION_COMPANIES = {
	PBB: { name: 'Public Bank Berhad', code: 'PBB' },
	PIV: { name: 'Public Investment Bank Bhd', code: 'PIV' },
};

export const NOTIFICATION_COMPANY_LIST = [
	NOTIFICATION_COMPANIES.PBB,
	NOTIFICATION_COMPANIES.PIV,
];

export const NOTIFICATION_CATEGORY_IMAGE = {
	2: 'https://img.icons8.com/clouds/2x/commercial.png',
	3: 'https://img.icons8.com/clouds/2x/support.png',
	4: 'https://img.icons8.com/clouds/2x/today.png',
	5: 'https://img.icons8.com/clouds/2x/hospital.png',
	6: 'https://img.icons8.com/clouds/2x/meeting-room.png',
	7: 'https://img.icons8.com/clouds/2x/important-event.png',
	8: 'https://img.icons8.com/clouds/2x/gift.png',
};

export const submitNewAnnouncementValidationSchema = Yup.object().shape({
	company: Yup.string().required('Company is required'),
	category: Yup.string().required('Category is required'),
	title: Yup.string().required('Title is required'),
	body: Yup.string().required('Subtitle is required'),
	description: Yup.string().required('Message is required'),
	validDuration: Yup.string().required('Validation Date is required'),
});
