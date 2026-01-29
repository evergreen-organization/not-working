import { routes } from 'navigations';

export const PROFILE_ITEMS = (adid) => [
	{
		testID: 'profile-item',
		heading: 'Profile',
		subheading: 'View your work info',
		route: routes.PROFILE,
	},
	{
		testID: 'settings-item',
		heading: 'Settings',
		subheading: 'Customize your app settings',
		route: routes.SETTINGS,
	},
	{
		testID: 'disclaimer-item',
		heading: 'Disclaimer',
		subheading: 'Notice to users',
		route: routes.DISCLAIMER,
	},
	{
		testID: 'self-service-item',
		heading: 'Self Service',
		subheading: 'Password Reset',
		route: routes.SELF_SERVICE,
	},
	...(adid && [
		{
			testID: 'adid-item',
			heading: 'Active Directory',
			subheading: 'FAQ',
			route: routes.ADID_INSTRUCTION,
		},
	]),
];
