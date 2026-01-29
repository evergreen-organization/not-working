const fetchOutstationDeclaration = {
	data: [
		{
			cityName: '',
			continent: 'Antarctica',
			country: 'Efeef',
			fromDate: '10/12/2022',
			id: 11004,
			otherRemarks: 'Fffefe',
			postcode: null,
			remarks: 'Others',
			stateName: null,
			toDate: '10/12/2022',
			travelType: 'International',
			_fromDate: '2022-10-12T00:00:00',
			_toDate: '2022-10-12T00:00:00',
		},
	],
	ok: true,
	status: 200,
};

const fetchAllStates = {
	data: [
		{
			name: 'JOHOR',
			stateId: '03',
		},
		{
			name: 'KUALA LUMPUR',
			stateId: '01',
		},
	],
	ok: true,
	status: 200,
};

const fetchCityByState = {
	data: [
		{ stateId: null, name: 'Ayer Baloi' },
		{ stateId: null, name: 'Ayer Hitam' },
		{ stateId: null, name: 'Ayer Tawar 2' },
	],
	ok: true,
	status: 200,
};

const fetchOutstationPurpose = {
	data: [
		{ desc: 'Funeral' },
		{ desc: 'Holiday/leisure' },
		{ desc: 'Medical Treatment' },
	],
	ok: true,
	status: 200,
};

const fetchContinents = {
	data: [
		{ continentName: 'Antarctica' },
		{ continentName: 'Africa' },
		{ continentName: 'Asia' },
		{ continentName: 'Europe' },
		{ continentName: 'North America' },
		{ continentName: 'South America' },
		{ continentName: 'Oceania' },
	],
	ok: true,
	status: 200,
};

const pushOutstation = {
	data: {
		id: 11006,
		message: null,
		status: true,
	},
	ok: true,
	status: 200,
};

export const InterstateData = Object.assign(
	{},
	{
		OutstationDeclaration: fetchOutstationDeclaration,
		States: fetchAllStates,
		City: fetchCityByState,
		OutstationPurpose: fetchOutstationPurpose,
		Continents: fetchContinents,
		PushOutstation: pushOutstation,
	},
);
