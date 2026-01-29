import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { Alert, Animated, Dimensions, Keyboard, Linking, Platform } from 'react-native';

import { fetchClinicList, fetchStateList, getClinic } from 'stores';
import dateFormat from '../../configs/dateFormat';
import { getGeoLocationPermission, getLocationCoordinates, showFailure } from 'utils';
import { routes } from 'navigations';
import { useAppState } from 'hooks';

import {
	getClinicsByArea,
	getClinicsByState,
	getFormattedDistance,
	getNearestPanelClinics,
	searchClinicsByArea,
	searchClinicsByName,
	searchClinicsByState,
} from './utils';
import PanelClinicsComp from './component';
import { CLINIC_SEARCH_TYPE, GOOGLE_MAP_SCHEME, WAZE_URL } from './constant';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { initialBottom } from 'styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
export const PanelClinics = ({ navigation }) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const dispatch = useDispatch();
	const appState = useAppState();
	const [position, setPosition] = useState({});
	const { panelClinicList, stateAreaList, cacheDate } = useSelector(getClinic);

	const map = useRef();
	const regionTimeout = useRef();
	const scrollView = useRef();
	const animation = useRef(new Animated.Value(0));
	const chosenPlace = useRef({});
	const [myCoordinate, setMyCoordinate] = useState();
	const [myRegion, setMyRegion] = useState({
		longitude: 0,
		latitude: 0,
		longitudeDelta: 0,
		latitudeDelta: 0,
	});
	const [typingTimeout, setTypingTimeout] = useState(0);
	const [focusedPanel, setFocusedPanel] = useState(0);
	const [searchOptionVisible, setSearchOptionVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [panelList, setPanelList] = useState([]);
	const [selectedPanel, setSelectedPanel] = useState([]);
	const [result, setResult] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [wazeUrl, setWazeUrl] = useState('');

	useEffect(() => {
		if (appState) {
			(async () => {
				await getPosition();
			})();
		}
	}, []);

	useEffect(() => {
		if (Object.keys(position).length !== 0) {
			configureCoordinate(position);
		}
	}, [position]);

	useEffect(() => {
		if (myCoordinate) {
			(async () => {
				await getState();
				await getPanels();
			})();
			configureRegion();
		}
	}, [myCoordinate]);

	const getPosition = async () => {
		await getGeoLocationPermission();
		const coords = await getLocationCoordinates();
		if (coords?.response) {
			return setPosition(coords.response);
		}
		return Alert.alert('Location Error', coords?.errorMsg, [
			{
				text: 'Ok',
				onPress: () => navigation.navigate(routes.HOME),
			},
		]);
	};

	const getPanels = async () => {
		const dateNow = Moment(new Date()).format(dateFormat.DATE_TIME);

		if (panelClinicList?.length > 0 && Moment(cacheDate).isSame(Moment(new Date()), 'date')) {
			return getNearestClinics(panelClinicList);
		}

		const { payload } = await dispatch(fetchClinicList({ cacheDate: dateNow }));
		if (payload.problem) {
			showFailure(payload.problem);
		}
		getNearestClinics(payload.data);
	};

	const configureRegion = () => {
		const { latitude, longitude } = myCoordinate;
		const region = {
			latitude,
			longitude,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
		};
		setMyRegion(region);
		clearTimeout(regionTimeout.current);
		regionTimeout.current = setTimeout(() => {
			if (!map.current) {
				return;
			}
			map.current.animateToRegion(region, 350);
		}, 10);
	};

	const configureCoordinate = (position) => {
		const { latitude, longitude } = position?.coords || {};
		setMyCoordinate({ latitude, longitude });
	};

	const getState = async () => {
		const { payload } = await dispatch(fetchStateList());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const handleScroll = (event) => {
		let index = Math.floor(event.nativeEvent.contentOffset.x / CARD_WIDTH + 0.5);
		index = index >= selectedPanel.length ? selectedPanel.length - 1 : index;
		index = index <= 0 ? 0 : index;
		setFocusedPanel(index);
		resetRegionTimout(selectedPanel, index);
	};

	const getNearestClinics = (list) => {
		const nearestClinics = getNearestPanelClinics(list, myCoordinate);
		setPanelList(list);
		setSelectedPanel(nearestClinics);
	};

	const handleOpenWazeModal = (url) => {
		setWazeUrl(url);
		setIsModalVisible(true);
	};

	const handleSelectNavigation = (lat, long, title) => {
		chosenPlace.current = { lat: lat, long: long, title: title };
		handleMapNavigation();
	};

	const handleActionSheet = async (option) => {
		const { lat, long } = chosenPlace.current;
		const title = chosenPlace.current.title;

		if (option === 0) {
			return;
		}
		if (option > 1) {
			return handleOpenWazeModal(WAZE_URL(lat, long));
		}

		const scheme = Platform.select({
			ios: GOOGLE_MAP_SCHEME.ios,
			android: GOOGLE_MAP_SCHEME.android,
		});

		const url = Platform.select({
			ios: `${scheme}${title}@${lat},${long}`,
			android: `${scheme}${lat},${long}(${title})`,
		});
		console.log({ url });

		await Linking.openURL(url);
	};

	const handleMapNavigation = () => {
		showActionSheetWithOptions(
			{
				title: 'Navigate by',
				options: ['Cancel', 'Google Maps', 'Waze'],
				cancelButtonIndex: 0,
				userInterfaceStyle: 'light',
				containerStyle: {
					paddingBottom: initialBottom,
				},
			},
			(index) => handleActionSheet(index),
		);
	};

	const handleSearchOnFocus = (inputText) => {
		setSearchOptionVisible(true);
		handleSearch(inputText);
	};

	const handleSearchTextChange = (input) => {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
		setUserInput(input);
		setTypingTimeout(
			setTimeout(() => {
				handleSearch(input);
			}, 1000),
		);
	};

	const handleSearch = (input) => {
		if (input === '' || input === null) {
			return setResult([]);
		}

		const formattedInput = input !== '' ? input.toUpperCase() : '';

		const filteredClinicByName = searchClinicsByName({
			panelList,
			input: formattedInput,
			currentCoordinate: myCoordinate,
		});
		const filteredClinicByArea = searchClinicsByArea(stateAreaList, formattedInput);
		const filteredClinicByState = searchClinicsByState(stateAreaList, formattedInput);

		setResult([...filteredClinicByName, ...filteredClinicByArea, ...filteredClinicByState]);
		setSearchOptionVisible(true);
	};

	const handleSearchPlacesSelected = (data) => {
		Keyboard.dismiss();

		const tempSelectedPanel =
			data.type === CLINIC_SEARCH_TYPE.AREA
				? getClinicsByArea(panelList, data.value, myCoordinate)
				: getClinicsByState(panelList, data.value, myCoordinate);

		setSelectedPanel(tempSelectedPanel);
		setSearchOptionVisible(false);

		if (tempSelectedPanel.length === 0) {
			return data.type === CLINIC_SEARCH_TYPE.AREA
				? Alert.alert('No panel found in this area')
				: Alert.alert('No panel found in this state');
		}
		setUserInput(data.value);
		resetRegionTimout(tempSelectedPanel, 0);
	};

	const handleSearchPanelSelected = (data) => {
		Keyboard.dismiss();
		setUserInput(data.name);
		const tempSelectedPanel = [
			{
				...data,
				distance: getFormattedDistance({
					panel: data,
					currentCoordinate: myCoordinate,
				}),
			},
		];
		setSelectedPanel(tempSelectedPanel);
		setSearchOptionVisible(false);
		resetRegionTimout(tempSelectedPanel, 0);
	};

	const resetRegionTimout = (selected, index = 0) => {
		clearTimeout(regionTimeout.current);
		regionTimeout.current = setTimeout(() => {
			if (!map.current) {
				return;
			}
			const { lat, long } = selected[index];
			map.current.animateToRegion(
				{
					latitude: lat,
					longitude: long,
					latitudeDelta: myRegion.latitudeDelta,
					longitudeDelta: myRegion.longitudeDelta,
				},
				350,
			);
		}, 10);
	};

	const handleMapOnPress = () => {
		Keyboard.dismiss();
		setSearchOptionVisible(false);
	};

	const handleMarkerPress = (index) =>
		scrollView.current.scrollTo({
			x: index * (width - 30),
			y: 0,
			animated: true,
		});

	const handleBackPressed = () => {
		navigation.goBack();
	};

	const handleCloseWazeModal = () => setIsModalVisible(false);

	const refs = {
		map,
		scrollView,
		animation,
	};

	const props = {
		handleSearchPanelSelected,
		handleSearchPlacesSelected,
		handleScroll,
		handleSelectNavigation,
		handleMapNavigation,
		handleSearchTextChange,
		handleSearchOnFocus,
		handleMapOnPress,
		handleMarkerPress,
		handleBackPressed,
		handleCloseWazeModal,
		myRegion,
		myCoordinate,
		selectedPanel,
		focusedPanel,
		userInput,
		searchOptionVisible,
		result,
		wazeUrl,
		isModalVisible,
	};

	return <PanelClinicsComp {...props} ref={refs} />;
};
