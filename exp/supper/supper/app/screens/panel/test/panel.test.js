import {
	getClinicsByArea, getClinicsByState,
	getFormattedDistance,
	getNearestPanelClinics,
	searchClinicsByArea,
	searchClinicsByName,
	searchClinicsByState,
} from "../utils";
import {
	CLINICS_LIST,
	SEARCHED_BY_AREA,
	FILTERED_PANEL_LIST_BY_NAME,
	MOCK_CURRENT_COORDINATES,
	NEAREST_CLINICS,
	STATE_LIST,
	SEARCHED_BY_STATE,
	FILTERED_CLINICS_BY_AREA, FILTERED_CLINICS_BY_STATE,
} from "./testData";

test('Panel Clinics- Get Top 5 Nearest Panel Clinics', () => {
	expect(
		getNearestPanelClinics(CLINICS_LIST, MOCK_CURRENT_COORDINATES),
	).toEqual(NEAREST_CLINICS);
});

test('Panel Clinics- Calculate the Distance from Current Coordinate to Panel Clinic', () => {
	const panel = {
		lat: 2.94496,
		long: 101.723,
	};
	expect(
		getFormattedDistance({
			panel,
			currentCoordinate: MOCK_CURRENT_COORDINATES,
		}),
	).toBe('2.9');
});

test('Panel Clinics- Search Clinics by Name', () => {
	expect(
		searchClinicsByName({
			panelList: CLINICS_LIST,
			input: 'Panel A',
			currentCoordinate: MOCK_CURRENT_COORDINATES,
		}),
	).toEqual(FILTERED_PANEL_LIST_BY_NAME);
});

test('Panel Clinics- Search Clinics by Area', () => {
	expect(searchClinicsByArea(STATE_LIST, 'AMPANG')).toEqual(SEARCHED_BY_AREA);
});

test('Panel Clinics- Search Clinics by State', () => {
	expect(searchClinicsByState(STATE_LIST, 'SELANGOR')).toEqual(
		SEARCHED_BY_STATE,
	);
});

test('Panel Clinics- Filter Panel List by Area', () => {
	expect(
		getClinicsByArea(CLINICS_LIST, 'AMPANG', MOCK_CURRENT_COORDINATES),
	).toEqual(FILTERED_CLINICS_BY_AREA);
});

test('Panel Clinics- Filter Panel List by State', () => {
	expect(
		getClinicsByState(CLINICS_LIST, 'SELANGOR', MOCK_CURRENT_COORDINATES),
	).toEqual(FILTERED_CLINICS_BY_STATE);
});
