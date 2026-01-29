import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from 'navigations';

import { dateFormat } from 'components';
import {
	getInterstate,
	fetchAllStates,
	fetchCityByState,
	fetchOutstationPurpose,
	fetchContinents,
	cityListReset,
	addOutstation,
} from 'stores';
import { showFailure, showSuccess } from 'utils';

import { TravelDeclarationFormComp } from './component';
import { getStateNameById } from '../utils';

export const TravelDeclarationForm = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { continentList, stateList, purposeList, cityList, outstationList } =
		useSelector(getInterstate);

	const today = Moment().toDate();
	const [selectedState, setSelectedState] = useState({});
	const [selectedTravelType, setSelectedTravelType] = useState('');
	const [selectedFromDate, setSelectedFromDate] = useState(today);

	useEffect(() => {
		(async () => await initialize())();
	}, []);

	const getAllStates = async () => {
		const { payload } = await dispatch(fetchAllStates());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const getOutStationPurpose = async () => {
		const { payload } = await dispatch(fetchOutstationPurpose());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const getContinents = async () => {
		const { payload } = await dispatch(fetchContinents());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const getCityByState = async (item) => {
		const { payload } = await dispatch(fetchCityByState({ StateId: item }));
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const initialize = async () => {
		if (stateList.length === 0) {
			await getAllStates();
		}
		if (purposeList.length === 0) {
			await getOutStationPurpose();
		}
		if (continentList.length === 0) {
			await getContinents();
		}
	};

	const handleTravelTypeSelection = (item) => {
		if (item !== selectedTravelType) {
			setSelectedTravelType(item);
			setSelectedState('');
			dispatch(cityListReset());
		}
	};

	const handleFromDatePress = (dateString) => {
		setSelectedFromDate(dateString);
	};

	const initialValues = {
		id: '',
		fromDate: today,
		toDate: today,
		remarks: '',
		stateId: '',
		cityName: '',
		otherRemarks: '',
		travelType: '',
		continent: '',
		country: '',
	};

	const handleStateSelection = async (item) => {
		if (item !== selectedState) {
			setSelectedState(item);
			dispatch(cityListReset);

			await getCityByState(item);
		}
	};

	const dupCheck = ({
		travelType,
		fromDate,
		toDate,
		remarks,
		stateName,
		cityName,
		continent,
		country,
	}) => {
		let dupRecord = outstationList.find((item) => {
			if (
				item.fromDate === Moment(fromDate).format('M/D/YYYY') &&
				item.toDate === Moment(toDate).format('M/D/YYYY') &&
				item.remarks === remarks &&
				item.stateName === stateName &&
				item.cityName === cityName &&
				item.travelType === travelType &&
				item.continent === continent &&
				item.country === country.trim()
			) {
				return item;
			}
		});
		return dupRecord !== undefined;
	};

	const handleFormSubmission = async ({
		travelType,
		fromDate,
		toDate,
		stateId,
		cityName,
		remarks,
		otherRemarks,
		continent,
		country,
	}) => {
		const stateName = getStateNameById(stateId, stateList);

		if (
			dupCheck({
				travelType,
				fromDate,
				toDate,
				remarks,
				stateName,
				cityName,
				continent,
				country,
			})
		) {
			Alert.alert('Duplicate Records', 'You have declared the same record previously.', [
				{
					text: 'OK',
					onPress: () => {},
				},
			]);
		} else {
			const { payload } = await dispatch(
				addOutstation({
					fromDate: Moment(fromDate).format(dateFormat.BACKEND_DATE),
					toDate: Moment(toDate).format(dateFormat.BACKEND_DATE),
					remarks,
					stateName: selectedTravelType === 'Domestic' ? stateName : '',
					cityName: selectedTravelType === 'Domestic' ? cityName : '',
					otherRemarks: otherRemarks.trim(),
					travelType,
					continent: selectedTravelType === 'International' ? continent : '',
					country: selectedTravelType === 'International' ? country.trim() : '',
				}),
			);

			if (payload.problem) {
				return showFailure(payload.problem);
			}
			showSuccess('Record Added', 'Thanks for your update');

			navigation.navigate(routes.INTERSTATE);
		}
	};

	const props = {
		handleFormSubmission,
		handleStateSelection,
		handleTravelTypeSelection,
		handleFromDatePress,
		initialValues,
		stateList,
		cityList,
		purposeList,
		continentList,
		selectedTravelType,
		selectedFromDate,
		isDisabledDateFields: selectedTravelType.length === 0,
		isDisabledCityField: Object.keys(selectedState).length === 0,
	};

	return <TravelDeclarationFormComp {...props} />;
};
