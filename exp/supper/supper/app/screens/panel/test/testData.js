export const MOCK_CURRENT_COORDINATES = {
	latitude: 2.9684837,
	longitude: 101.7339237,
};

export const CLINICS_LIST = [
	{
		lat: 2.94496,
		long: 101.723,
		name: 'Panel A',
		area: 'AMPANG',
		state: 'SELANGOR',
	},
	{
		lat: 2.94367,
		long: 101.764,
		name: 'Panel B',
		area: 'BANGSAR',
		state: 'SELANGOR',
	},
	{
		lat: 2.94522,
		long: 101.766,
		name: 'Panel C',
		area: 'AREA',
		state: 'STATE',
	},
	{
		lat: 2.9901,
		long: 101.777,
		name: 'Panel D',
		area: 'AREA',
		state: 'STATE',
	},
	{
		lat: 2.97477,
		long: 101.786,
		name: 'Panel E',
		area: 'AREA',
		state: 'STATE',
	},
];

export const NEAREST_CLINICS = [
	{
		distance: '2.9',
		latitude: 2.94496,
		longitude: 101.723,
		lat: 2.94496,
		long: 101.723,
		name: 'Panel A',
		area: 'AMPANG',
		state: 'SELANGOR',
	},
	{
		distance: '4.3',
		latitude: 2.94367,
		longitude: 101.764,
		lat: 2.94367,
		long: 101.764,
		name: 'Panel B',
		area: 'BANGSAR',
		state: 'SELANGOR',
	},
	{
		distance: '4.4',
		latitude: 2.94522,
		longitude: 101.766,
		lat: 2.94522,
		long: 101.766,
		name: 'Panel C',
		area: 'AREA',
		state: 'STATE',
	},
	{
		distance: '5.4',
		latitude: 2.9901,
		longitude: 101.777,
		lat: 2.9901,
		long: 101.777,
		name: 'Panel D',
		area: 'AREA',
		state: 'STATE',
	},
	{
		distance: '5.8',
		latitude: 2.97477,
		longitude: 101.786,
		lat: 2.97477,
		long: 101.786,
		name: 'Panel E',
		area: 'AREA',
		state: 'STATE',
	},
];

export const FILTERED_PANEL_LIST_BY_NAME = [
	{
		distance: '2.9',
		lat: 2.94496,
		long: 101.723,
		name: 'Panel A',
		type: 'N',
		area: 'AMPANG',
		state: 'SELANGOR',
	},
];

export const STATE_LIST = [
	{ state: 'SELANGOR', area: ['AMPANG', 'BANDAR SUNWAY', 'BANGI', 'BANTING'] },
	{ state: 'KUALA LUMPUR ', area: ['BANGSAR', 'BANGSAR'] },
];

export const SEARCHED_BY_AREA = [
	{ type: 'A', value: 'AMPANG', subValue: 'SELANGOR', key: 'AMPANG-SELANGOR' },
];

export const SEARCHED_BY_STATE = [{ type: 'S', value: 'SELANGOR' }];

export const FILTERED_CLINICS_BY_AREA = [
	{
		distance: '2.9',
		lat: 2.94496,
		long: 101.723,
		name: 'Panel A',
		area: 'AMPANG',
		state: 'SELANGOR',
	},
];

export const FILTERED_CLINICS_BY_STATE = [
	{
		distance: '2.9',
		lat: 2.94496,
		long: 101.723,
		name: 'Panel A',
		area: 'AMPANG',
		state: 'SELANGOR',
	},
	{
		distance: '4.3',
		lat: 2.94367,
		long: 101.764,
		name: 'Panel B',
		area: 'BANGSAR',
		state: 'SELANGOR',
	},
];
