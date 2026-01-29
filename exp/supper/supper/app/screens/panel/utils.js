import { getDistance, orderByDistance } from 'geolib';
import { CLINIC_SEARCH_TYPE } from './constant';

export const getNearestPanelClinics = (list, currentCoordinate) => {
	const { latitude, longitude } = currentCoordinate;

	const formattedList = list.map((item) => ({
		latitude: item.lat,
		longitude: item.long,
		...item,
	}));
	const nearest = orderByDistance({ latitude, longitude }, formattedList).slice(
		0,
		5,
	);

	return nearest.map((item) => ({
		...item,
		distance: getFormattedDistance({ panel: item, currentCoordinate }),
	}));
};

export const getFormattedDistance = ({ panel, currentCoordinate }) => {
	if (!currentCoordinate) {
		return '100';
	}
	const { latitude, longitude } = currentCoordinate;
	const distance =
		getDistance(
			{ longitude, latitude },
			{ latitude: panel.lat, longitude: panel.long },
		) / 1000; //Convert meters to kilometers
	return distance.toFixed(distance <= 10 ? 1 : 0);
};

export const searchClinicsByName = ({
	panelList,
	input,
	currentCoordinate,
}) => {
	const filteredList = panelList.filter((panel) => panel?.name.includes(input));
	return filteredList.map((item) => ({
		...item,
		type: CLINIC_SEARCH_TYPE.NAME,
		distance: getFormattedDistance({ panel: item, currentCoordinate }),
	}));
};

export const searchClinicsByArea = (stateList, input) =>
	stateList.flatMap((state) => {
		return state.area
			.filter((area) => area.includes(input))
			.flatMap((area) => ({
				type: CLINIC_SEARCH_TYPE.AREA,
				value: area,
				subValue: state.state,
				key: `${area}-${state.state}`,
			}));
	});

export const searchClinicsByState = (stateList, input) =>
	stateList.flatMap((state) => {
		return state.state.includes(input)
			? [{ type: CLINIC_SEARCH_TYPE.STATE, value: state.state }]
			: [];
	});

export const getClinicsByArea = (panelList, area, currentCoordinate) => {
	const filteredList = panelList.filter((panel) => panel.area === area);
	return filteredList.map((item) => ({
		...item,
		distance: getFormattedDistance({ panel: item, currentCoordinate }),
	}));
};

export const getClinicsByState = (panelList, state, currentCoordinate) => {
	const filteredList = panelList.filter((panel) => panel.state === state);
	return filteredList.map((item) => ({
		...item,
		distance: getFormattedDistance({ panel: item, currentCoordinate }),
	}));
};
