import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllActions,
	getAllActivitiesData,
	getCardImage,
	getEbizData,
	getModulesAvailable,
	getPhotoWall,
	getUser,
	getMFAStatus,
	getHardTokenStatus,
	submitDataCollectionLogs,
	submitUserAnalyticLogs,
	getTNC,
	acceptEBCTOUUpdated,
	getCampaignId,
	getGame,
} from 'stores';
import { showEcardsQuickLink, showFestive, showSurveyQuickLink, USER_ANALYTICS } from 'constant';
import { useHandleDeeplink, usePBSSNotification } from 'hooks';
import { QUICK_LINKS, SURVEY_URL } from './constant';
import HomeNewView from './component';
import FestiveHomeView from './componentFestive';
import { addAnalyticCheckpoint, formatAnalyticsLogs } from 'utils';
import { handleShare } from 'screens/eBizCard/utils/utils';
import { BackHandler, Linking, Platform } from 'react-native';
import NewYearPdf from 'assets/home/new-year-message.pdf';
import { routes } from 'navigations';
import moment from 'moment';

const NewYearPdfAndroid = 'bundle-assets://new-year-message.pdf';

export const HomeNew = ({ navigation }) => {
	usePBSSNotification(navigation);
	const viewRef = useRef();
	const dispatch = useDispatch();
	const modulesAvailable = useSelector(getModulesAvailable);
	const user = useSelector(getUser);
	const { showCarousel } = useSelector(getPhotoWall);
	const { acceptEBCTOU } = useSelector(getTNC);
	const [showMore, setShowMore] = useState(false);
	const [showECardCarousel, setShowECardCarousel] = useState(showCarousel);
	const [quickLinkList, setQuickLinkList] = useState([]);
	const [moreLinkList, setMoreLinkList] = useState([]);
	const [isBgmMute, setIsBgmMute] = useState(false);
	const smartQuestionData = useSelector(getAllActivitiesData);
	const userAnalyticsData = useSelector(getAllActions);
	const formattedUserAnalyticsData = formatAnalyticsLogs(userAnalyticsData);
	const { eBizData } = useSelector(getEbizData);
	const cardImage = useSelector(getCardImage);
	const [showPDFModal, setShowPDFModal] = useState(false);
	const [pdfSource, setPdfSource] = useState({});
	const [isEBizCardSharePopUpVisible, setIsEBizCardSharePopUpVisible] = useState(false);
	const isActivatedMFA = useSelector(getMFAStatus);
	const hasHardToken = useSelector(getHardTokenStatus);
	const [isEBCTOUVisible, setIsEBCTOUVisible] = useState(false);
	const isEBizDeeplink = useRef(false);
	const { viewEndDate } = useSelector(getGame);
	const parsedDate = moment(viewEndDate, ['MM/DD/YYYY', 'M/D/YYYY'], true);
	const formattedDate = parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;

	const showCampaign = formattedDate ? moment().isSameOrBefore(formattedDate, 'day') : false;

	// need to keep the reference of state to make sure deeplink callback function always use the latest values
	const refValues = useRef({
		isActivatedMFA,
		acceptEBCTOU,
		eBizData,
		cardImage,
	});

	useEffect(() => {
		refValues.current.acceptEBCTOU = acceptEBCTOU;
		refValues.current.isActivatedMFA = isActivatedMFA;
		refValues.current.eBizData = eBizData;
		refValues.current.cardImage = cardImage;
	}, [acceptEBCTOU, isActivatedMFA, eBizData, cardImage]);

	//for analytics
	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.HOME,
		view: viewRef,
	};

	const handleBasicShare = (e) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.MODULES.HOME,
			buttonEvent: e?.nativeEvent,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.SHARE_BAISC_CARD,
		}).then();
		handleShare(eBizData, cardImage);
	};

	useEffect(() => {
		dispatch(getCampaignId());
	}, []);

	useEffect(() => {
		//* Conditions for hiding modules *//
		const checkVisible = (data, conditions = false) => (conditions ? [data] : []);
		const dashboardDisabled = Number(user?.gradeCode) > 300010;
		const reliefDisabled = !(user?.jobCode[0] === 'R');

		//* Create full list of module links *//
		const moduleList = [
			// ...checkVisible(QUICK_LINKS.LADDER_DASH, showCampaign),
			...checkVisible(QUICK_LINKS.MFA, true),
			...checkVisible(QUICK_LINKS.SURVEY, showSurveyQuickLink),
			...checkVisible(QUICK_LINKS.EBIZ_CARD, modulesAvailable.eBizCard),
			...checkVisible(QUICK_LINKS.eCARDS, showEcardsQuickLink),
			...checkVisible(QUICK_LINKS.LEAVE, true),
			...checkVisible(QUICK_LINKS.LEADGEN_360, modulesAvailable.leadGen),
			...checkVisible(QUICK_LINKS.LIBRARY, true),
			...checkVisible(QUICK_LINKS.REGULATION, true),
			...checkVisible(QUICK_LINKS.SELF_TEST, modulesAvailable.covidTestResult),
			...checkVisible(QUICK_LINKS.CLINIC, true),
			...checkVisible(QUICK_LINKS.TRAVEL_DECLARATION, true),
			...checkVisible(QUICK_LINKS.DASHBOARD, !dashboardDisabled),
			QUICK_LINKS.NEWS,
			...checkVisible(QUICK_LINKS.RELIEF, !reliefDisabled),
			QUICK_LINKS.WATER_TRACKER,
			QUICK_LINKS.PB_JOURNEY,
			// QUICK_LINKS.ANALYTICS,
		];

		///* To Cater for 8 items in quick link and remainder to more *///
		setQuickLinkList(
			moduleList.length > 8 ? [...moduleList.slice(0, 7), QUICK_LINKS.MORE] : moduleList,
		);

		setMoreLinkList(moduleList.length > 8 ? moduleList.slice(7, moduleList.length) : []);
	}, [user, modulesAvailable, showCampaign]);

	const { homeInitialDeeplink } = useHandleDeeplink({
		ignoreInitialUrl: true,
		eventActions: {
			token: () => {
				onNavigate(null, routes.MFA_PIN);
			},
			otp: () => {
				onNavigate(null, routes.MFA_PIN, { isFromDeeplink: true });
			},
			quickLinks: () => {
				navigation.navigate(routes.QUICK_LINKS);
			},
			miniQuickLinks: () => {
				navigation.navigate(routes.QUICK_LINKS, { isMini: true });
			},
			clinic: () => {
				onNavigate(null, routes.PANEL_CLINICS);
			},
			dashboard: () => {
				onNavigate(null, routes.DASHBOARD);
			},
			ebizCard: () => {
				isEBizDeeplink.current = true;
				onNavigate(null, routes.EBIZ_HOME);
			},
			eFestiveCard: () => {
				if (showFestive) {
					onNavigate(null, routes.PHOTO_WALL_GALLERY_VIEW);
				}
			},
			leadGen: () => {
				onNavigate(null, routes.LG360_PROSPECT);
			},
			leave: () => {
				onNavigate(null, routes.LEAVE);
			},
			library: () => {
				onNavigate(null, routes.LIBRARY);
			},
			news: () => {
				onNavigate(null, routes.NEWS);
			},
			regulation: () => {
				onNavigate(null, routes.REGULATION);
			},
			relief: () => {
				onNavigate(null, routes.RELIEF_ASSIGNMENT);
			},
			selfService: () => {
				onNavigate(null, routes.SELF_SERVICE);
			},
			selfTest: () => {
				onNavigate(null, routes.COVID_TEST_HISTORY);
			},
			travel: () => {
				onNavigate(null, routes.INTERSTATE);
			},
			water: () => {
				onNavigate(null, routes.WATER_TRACKER);
			},
			pbJourney: () => {
				onNavigate(null, routes.PB_JOURNEY);
			},
			shareBasicEbiz: () => {
				if (refValues.current.acceptEBCTOU) {
					setTimeout(() => {
						handleShare(refValues.current.eBizData, refValues.current.cardImage);
					}, 1000);
				} else {
					handleOpenEBizSharePopUp();
				}
			},
		},
	});

	const handleOpenEBizSharePopUp = () => {
		if (!acceptEBCTOU) {
			setIsEBCTOUVisible(true);
			return;
		}

		setIsEBizCardSharePopUpVisible(!isEBizCardSharePopUpVisible);
	};

	// Check MFA activation status
	useEffect(() => {
		if (!isActivatedMFA && !hasHardToken && !homeInitialDeeplink) {
			setTimeout(() => navigation.navigate(routes.MFA_INTRO), 300);
		}

		dispatch(submitUserAnalyticLogs(formattedUserAnalyticsData));
		dispatch(submitDataCollectionLogs(smartQuestionData));
	}, []);

	const onCloseMoreModal = (_) => setShowMore(false);
	const handleCloseECardCarousel = (_) => setShowECardCarousel(false);

	const onNavigate = (e, path, params) => {
		const quickLinksConfig = {
			screen: USER_ANALYTICS.HOME_SCREEN,
			buttonEvent: e?.nativeEvent,
			action: `quick-link-${path}`,
		};
		addAnalyticCheckpoint({ ...analyticConfig, ...quickLinksConfig }).then();

		if (path === 'MORE') {
			setShowMore(true);
			return;
		}
		setShowMore(false);

		if (path === 'SURVEY') {
			Linking.openURL(SURVEY_URL);
			return;
		}

		if (checkRequireMFA(path)) {
			if (hasHardToken) {
				navigation.navigate(routes.MFA_HAS_HARD_TOKEN);
				return;
			}
			navigation.navigate(routes.MFA_INTRO);
			return;
		}

		if (path === routes.EBIZ_HOME) {
			if (!refValues.current.acceptEBCTOU) {
				setIsEBCTOUVisible(true);
				return;
			}
		}
		navigation.navigate(path, params);
	};

	const checkRequireMFA = (route) => {
		if (refValues.current.isActivatedMFA) {
			return false;
		}

		return route === routes.MFA_PIN;
	};

	const handleVolumePress = (_) => setIsBgmMute(!isBgmMute);

	const onBannerPress = () => {
		if (showFestive) {
			setShowPDFModal(true);
			if (Platform.OS === 'ios') {
				setPdfSource(NewYearPdf);
				return;
			}
			setPdfSource({ uri: NewYearPdfAndroid });
			return;
		}
		return navigation.navigate(routes.ADID_FAQ);
	};

	const closePdfModal = () => setShowPDFModal(false);

	const handleEBizShareClosedPopUp = () => {
		setIsEBizCardSharePopUpVisible(false);
	};

	const handleAcceptEBCTOU = (e) => {
		const quickLinksConfig = {
			screen: USER_ANALYTICS.HOME_SCREEN,
			buttonEvent: e?.nativeEvent,
			action: 'ebiz-card-accept-tou',
		};
		addAnalyticCheckpoint({ ...analyticConfig, ...quickLinksConfig }).then();
		dispatch(acceptEBCTOUUpdated());
		setIsEBCTOUVisible(false);
		navigation.navigate(routes.EBIZ_HOME);

		if (isEBizDeeplink.current) {
			BackHandler.exitApp();
		}
	};

	const handleDeclineEBCTOU = () => {
		setIsEBCTOUVisible(false);
	};

	const handleCloseEBCTOU = () => {
		setIsEBCTOUVisible(false);
	};

	const handlePromotion = (e, promoId) => onNavigate(e, routes.PROMOTION_DETAILS, { promoId });

	const eBizCardProps = {
		isEBCTOUVisible,
		setIsEBCTOUVisible,
		handleAcceptEBCTOU,
		handleDeclineEBCTOU,
		handleCloseEBCTOU,
	};

	const props = {
		onNavigate,
		onCloseMoreModal,
		handleCloseECardCarousel,
		handleVolumePress,
		onBannerPress,
		closePdfModal,
		handleOpenEBizSharePopUp,
		handleBasicShare,
		showMore,
		quickLinkList,
		moreLinkList,
		showECardCarousel,
		isBgmMute,
		showPDFModal,
		pdfSource,
		isEBizCardSharePopUpVisible,
		setIsEBizCardSharePopUpVisible,
		handleEBizShareClosedPopUp,
		modulesAvailable,
		handlePromotion,
		...eBizCardProps,
	};

	if (showFestive) {
		return <FestiveHomeView {...props} ref={viewRef} />;
	}
	return <HomeNewView {...props} ref={viewRef} />;
};
