const fetchPromoList = {
	data: [
		{
			category: null,
			categoryName: 'Shopping & Lifestyle',
			count: 0,
			description: '20% OFF on room charge only',
			descriptions: null,
			iconUrl:
				'https://xperience.pbebank.com:4430/pbexperience/Promotion/358/Icon/1/Red%20Box%20Logo%20PNG-01.png',
			id: 48,
			images: null,
			others: null,
			promoEndPeriod: null,
			promoStartPeriod: null,
			title: 'PB Staff Privileges @ Red Box Karaoke',
		},
		{
			category: null,
			categoryName: 'Health & Beauty',
			count: 0,
			description: 'RM180 on treatment package + 10% OFF on treatment(s)',
			descriptions: null,
			iconUrl:
				'https://xperience.pbebank.com:4430/pbexperience/Promotion/364/Icon/1/KLIDC%20Logo%20-%202000.jpg',
			id: 51,
			images: null,
			others: null,
			promoEndPeriod: null,
			promoStartPeriod: null,
			title:
				'PB Staff Privileges @ KLIDC (Kuala Lumpur International Dental Centre)',
		},
	],
	ok: true,
	status: 200,
};

const fetchPromoDetails = {
	data: {
		category: null,
		categoryName: null,
		count: 0,
		description: '20% OFF on room charge only',
		descriptions: [
			'PB Staff: 20% OFF on room charge only',
			'Promotion valid for all day long, includes weekends and Public Holidays',
			'https://www.google.com/',
		],
		iconUrl:
			'https://xperience.pbebank.com:4430/pbexperience/Promotion/358/Icon/1/Red%20Box%20Logo%20PNG-01.png',
		id: 358,
		images: [
			{
				uri: 'https://xperience.pbebank.com:4430/pbexperience/Promotion/358/Main/1/RED%20BOX%20-%20STAFF.jpg',
			},
			{
				uri: 'https://play-lh.googleusercontent.com/UwuPrnCObiHVoDQfRXNsTbzEDHsACxJ772HjnF9GDYdzqGW2W8pYKFtZC_84_FAINZ0=w1052-h592-rw',
			},
			{
				uri: 'https://play-lh.googleusercontent.com/nKkzfL3z_lJnRSnBI-PiHdir-DjMuI50L74PgPh9RwOE5Es9GOYEw8MC24zcnOQNiQ=w1052-h592-rw',
			},
		],
		others: [
			{
				docUrl:
					'https://xperience.pbebank.com:4430/pbexperience/Promotion/358/Additional/1/STAFF%20T&C%20-%20RED%20BOX%20KARAOKE.pdf',
				title: 'T&C',
			},
		],
		promoEndPeriod: '2022-12-31T00:00:00',
		promoStartPeriod: '2022-07-08T00:00:00',
		title: 'PB Staff Privileges @ Red Box Karaoke',
	},
	ok: true,
	status: 200,
};

export const PromotionData = Object.assign(
	{},
	{
		PromoList: fetchPromoList,
		PromoDetails: fetchPromoDetails,
	},
);
