export const CLINIC_SEARCH_TYPE = {
	NAME: 'N',
	STATE: 'S',
	AREA: 'A',
};

export const WAZE_URL = (lat, long) =>
	`https://www.waze.com/en-GB/live-map/directions?navigate=yes&to=${lat}%2C${long}&navigate=yes`;

export const GOOGLE_MAP_SCHEME = {
	ios: 'maps://0,0?q=',
	android: 'geo:0,0?q=',
};
