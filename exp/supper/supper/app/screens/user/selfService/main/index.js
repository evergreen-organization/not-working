import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

import routes from 'navigations/routes';
import { useAppState, useChallenge } from 'hooks';
import { useIAMModal } from 'contexts';
import {
	getHardTokenStatus,
	getMFAStatus,
	getModulesAvailable,
	getUser,
	requestCASOtp,
} from 'stores';
import { DEMO_ACCOUNT_NOT_AVAILABLE, tranApiType, USER_ANALYTICS } from 'constant';
import {
	addAnalyticCheckpoint,
	checkIsDemoFromStaffId,
	getGeoLocationPermission,
	getLocationCoordinates,
	requestPushNotificationPermission,
	showInfo,
} from 'utils';

import { handleIAMModalNoChallengeQuestion } from 'screens/adidAwareness/utils';
import SelfServiceView from './component';

export const SelfService = ({ navigation }) => {
	const dispatch = useDispatch();
	const viewRef = useRef();
	const appState = useAppState();
	const [position, setPosition] = useState();
	const [positionError, setPositionError] = useState();
	const challenge = useChallenge();
	const { adid } = useSelector(getModulesAvailable) || {};
	const { staffId } = useSelector(getUser);
	const isDemo = checkIsDemoFromStaffId(staffId);
	const { setIsIAMModalVisible, setIAMModalSlides } = useIAMModal();
	const [ticketId, setTicketId] = useState('');
	const [loading, setLoading] = useState(false);
	const [showQRModal, setShowQRModal] = useState(false);
	const [showManualModal, setShowManualModal] = useState(false);
	const isActivatedMFA = useSelector(getMFAStatus);
	const hasHardToken = useSelector(getHardTokenStatus);

	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.SELF_SERVICES,
		view: viewRef,
	};

	useEffect(() => {
		(async () => {
			if (appState) {
				await getPosition();
			}
			await requestPushNotificationPermission();
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getPosition = async () => {
		await getGeoLocationPermission();
		const coords = await getLocationCoordinates();
		if (coords?.response) {
			return setPosition(coords.response);
		}
		if (coords.errorMsg) {
			setPositionError(coords.errorMsg);
		}
	};

	const requestOTP = async (id) => {
		const { payload } = await dispatch(
			requestCASOtp({
				ticketId: id,
				latitude: position?.coords.latitude,
				longitude: position?.coords.longitude,
			}),
		);
		setLoading(false);
		if (payload.problem) {
			showMessage({
				message: 'OTP Request Failed', // result.problem,
				description: payload.problem,
				type: 'danger',
				icon: 'danger',
			});
		}
	};

	const promptAlert = (text1, text2) => {
		setLoading(false);
		Alert.alert(text1, text2, [{ text: 'OK' }]);
	};

	const validate = async (id) => {
		setLoading(true);
		setShowManualModal(false);
		setShowQRModal(false);

		const special = /[^A-Za-z0-9]/g;
		if (id.length === 0) {
			return promptAlert('Invalid Ticket ID', 'Ticket ID is empty');
		}
		if (special.test(id)) {
			return promptAlert('Invalid Ticket ID', 'Special characters is not allowed');
		}
		await requestOTP(id);
	};

	const handleShowQRModal = (value) => {
		if (isDemo) {
			return showInfo(DEMO_ACCOUNT_NOT_AVAILABLE);
		}
		setShowQRModal(value);
	};

	const handleShowManualModal = (value) => {
		if (isDemo) {
			return showInfo(DEMO_ACCOUNT_NOT_AVAILABLE);
		}
		setShowManualModal(value);
	};

	const preCheckAD = async (path, param) => {
		if (hasHardToken) {
			navigation.navigate(routes.MFA_HAS_HARD_TOKEN);
			return;
		}
		if (!isActivatedMFA) {
			navigation.navigate(routes.MFA_INTRO);
			return;
		}

		setLoading(true);
		const questionExist = await challenge.getQuestions({});
		if (!questionExist) {
			setLoading(false);
			return handleIAMModalNoChallengeQuestion({
				setIAMModalSlides,
				setIsIAMModalVisible,
			});
		}

		setLoading(false);
		return navigation.navigate(path, param);
	};
	const resetADPassword = async (event) => {
		const resetADIDConfig = {
			screen: USER_ANALYTICS.PROFILE_SCREENS.SELF_SERVICES,
			buttonEvent: event.nativeEvent,
			action: USER_ANALYTICS.SELF_SERVICE_ACTIONS.RESET_PASSWORD,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...resetADIDConfig });
		await preCheckAD(routes.INPUT_PASSWORD);
	};

	const unlockAD = async (event) => {
		const unlockADIDConfig = {
			screen: USER_ANALYTICS.PROFILE_SCREENS.SELF_SERVICES,
			buttonEvent: event.nativeEvent,
			action: USER_ANALYTICS.SELF_SERVICE_ACTIONS.UNLOCK_ADID,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...unlockADIDConfig });
		await preCheckAD(routes.CHALLENGE_QUESTIONS, {
			tranType: 'UNLOCK_ADID',
			tranApiType: tranApiType.UNLOCK_ADID,
		});
	};

	const handleHeaderLeftBtn = () => {
		navigation.goBack();
	};

	const onScanPress = async (event) => {
		const scanCASConfig = {
			screen: USER_ANALYTICS.PROFILE_SCREENS.SELF_SERVICES,
			buttonEvent: event.nativeEvent,
			action: USER_ANALYTICS.SELF_SERVICE_ACTIONS.SCAN_QR_CAS,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...scanCASConfig });
		handleShowQRModal(true);
	};

	const onManualPress = async (event) => {
		const manualCASConfig = {
			screen: USER_ANALYTICS.PROFILE_SCREENS.SELF_SERVICES,
			buttonEvent: event.nativeEvent,
			action: USER_ANALYTICS.SELF_SERVICE_ACTIONS.SHOW_MANUAL_CAS,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...manualCASConfig });

		if (!position) {
			return Alert.alert('Location Error', positionError, [
				{
					text: 'Ok',
					onPress: () => navigation.goBack(),
				},
			]);
		}
		handleShowManualModal(true);
	};

	const onScanClose = () => setShowQRModal(false);
	const onManualClose = () => setShowManualModal(false);

	const props = {
		handleHeaderLeftBtn,
		onScanPress,
		onManualPress,
		adid,
		resetADPassword,
		showQRModal,
		showManualModal,
		ticketId,
		setTicketId,
		validate,
		loading,
		onScanClose,
		onManualClose,
		unlockAD,
	};

	return <SelfServiceView {...props} ref={viewRef} />;
};
