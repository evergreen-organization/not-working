import {
	EPP_PDF,
	EPP_PDF_ANDROID_LOCAL,
	LOCAL_ANDROID_NEW_YEAR_PDF,
	NEW_YEAR_PDF,
	showCorporateBanner,
	showEPPBanner,
	showFestive,
	showNewYearMessage,
	showPBBAnniBanner,
} from 'constant';
import { routes } from 'navigations';

import LibraryIcon from 'assets/icon/book.png';
import ChartIcon from 'assets/icon/chart.png';
import CardIcon from 'assets/icon/ebizCard.png';
import ClinicIcon from 'assets/icon/hospital.png';
import InterStateIcon from 'assets/icon/interstate.png';
import PBJourneyIcon from 'assets/icon/journey-icon.png';
import LeadGenIcon from 'assets/icon/leadgen.png';
import LeaveIcon from 'assets/icon/leave.png';
import MFAIcon from 'assets/icon/mfa-link.png';
import MoreIcon from 'assets/icon/more.png';
import NewsIcon from 'assets/icon/news.png';
import RegulationIcon from 'assets/icon/regulations.png';
import ReliefIcon from 'assets/icon/relief.png';
import SurveyIcon from 'assets/icon/survey-2.png';
import SwabTestIcon from 'assets/icon/swab.png';
import WaterIcon from 'assets/icon/water.png';
// import BingoIcon from 'assets/icon/bingo.png';
import PBDashIcon from 'assets/icon/pbdash.png';

// festive icon
import {
	EBookIcon,
	EChartIcon,
	EClinicIcon,
	EECardIcon,
	EInterstateIcon,
	EJourneyIcon,
	ELeadgenIcon,
	ELeaveIcon,
	EMfaIcon,
	EMoreIcon,
	ENewsIcon,
	ERegulationsIcon,
	EReliefIcon,
	ESwabIcon,
	EWaterIcon,
} from 'assets/festive/icon';

//Banners
import { BannerVideo } from 'assets/festive/banner';
import lonPacBanner from 'assets/home/lonpac.png';
import sustainabilityBanner from 'assets/home/sustainability_banner.png';
// import newYearBannerVideo from 'assets/home/new-year.mp4';
import widgetBanner from 'assets/widget/widget-banner.png';
import eppBanner from 'assets/home/epp-banner.png';
import newYearBanner from 'assets/home/newyear.png';
import pbbAnniBanner from 'assets/home/pb-60th.png';
// import { Config } from '../../../env';

const QuickLinkIcons = ({
	eCards = EECardIcon,
	leave = LeaveIcon,
	clinic = ClinicIcon,
	selfTest = SwabTestIcon,
	waterTracker = WaterIcon,
	pbJourney = PBJourneyIcon,
	regulation = RegulationIcon,
	news = NewsIcon,
	library = LibraryIcon,
	dashboard = ChartIcon,
	relief = ReliefIcon,
	travelDeclaration = InterStateIcon,
	survey = SurveyIcon,
	more = MoreIcon,
	leadGen = LeadGenIcon,
	ebizCard = CardIcon,
	mfa = MFAIcon,
}) => {
	return {
		mfa,
		eCards,
		leave,
		clinic,
		selfTest,
		waterTracker,
		pbJourney,
		regulation,
		news,
		library,
		dashboard,
		relief,
		travelDeclaration,
		survey,
		leadGen,
		ebizCard,
		more,
	};
};

const quickLinkIconsFestive = QuickLinkIcons({
	leave: ELeaveIcon,
	clinic: EClinicIcon,
	selfTest: ESwabIcon,
	regulation: ERegulationsIcon,
	news: ENewsIcon,
	waterTracker: EWaterIcon,
	pbJourney: EJourneyIcon,
	library: EBookIcon,
	dashboard: EChartIcon,
	relief: EReliefIcon,
	travelDeclaration: EInterstateIcon,
	more: EMoreIcon,
	leadGen: ELeadgenIcon,
	mfa: EMfaIcon,
});

const quickLinkIconsDefault = QuickLinkIcons({});

const renderQuickLinksIcons = () => {
	if (showFestive) {
		return quickLinkIconsFestive;
	}
	return quickLinkIconsDefault;
};

const quickLinkIcons = renderQuickLinksIcons();

const eCARDS = {
	testID: 'quick-link-e-card',
	icon: quickLinkIcons.eCards,
	label: 'eCards!',
	path: routes.PHOTO_WALL_GALLERY_VIEW,
};

const LEAVE = {
	testID: 'quick-link-leave',
	icon: quickLinkIcons.leave,
	label: 'Leave',
	path: routes.LEAVE,
};

const CLINIC = {
	testID: 'quick-link-clinic',
	icon: quickLinkIcons.clinic,
	label: 'Clinic',
	path: routes.PANEL_CLINICS,
};

const SELF_TEST = {
	testID: 'quick-link-self-test',
	icon: quickLinkIcons.selfTest,
	label: 'Self Test',
	path: routes.COVID_TEST_HISTORY,
};

const WATER_TRACKER = {
	testID: 'quick-link-water-tracker',
	icon: quickLinkIcons.waterTracker,
	label: 'Water Tracker',
	path: routes.WATER_TRACKER,
};

const PB_JOURNEY = {
	testID: 'quick-link-pb-journey',
	icon: quickLinkIcons.pbJourney,
	label: 'PB Journey',
	path: routes.PB_JOURNEY,
};

const REGULATION = {
	testID: 'quick-link-regulation',
	icon: quickLinkIcons.regulation,
	label: 'Regulations',
	path: routes.REGULATION,
};

const NEWS = {
	testID: 'quick-link-news',
	icon: quickLinkIcons.news,
	label: 'News',
	path: routes.NEWS,
};

const LIBRARY = {
	testID: 'quick-link-library',
	icon: quickLinkIcons.library,
	label: 'Library',
	path: routes.LIBRARY,
};

const DASHBOARD = {
	testID: 'quick-link-dashboard',
	icon: quickLinkIcons.dashboard,
	label: 'Dashboard',
	path: routes.DASHBOARD,
};

const RELIEF = {
	testID: 'quick-link-relief',
	icon: quickLinkIcons.relief,
	label: 'Relief',
	path: routes.RELIEF_ASSIGNMENT,
};

const TRAVEL_DECLARATION = {
	testID: 'quick-link-travel-declaration',
	icon: quickLinkIcons.travelDeclaration,
	label: 'Travel Declaration',
	path: routes.INTERSTATE,
};

const LEADGEN_360 = {
	testID: 'quick-link-leadgen',
	icon: quickLinkIcons.leadGen,
	label: 'LeadGen 360',
	path: routes.LG360_PROSPECT,
};

const ANALYTICS = {
	testID: 'quick-link-analytics',
	icon: quickLinkIcons.library,
	label: 'Analytics',
	path: routes.ANALYTICS,
};

const SURVEY = {
	testID: 'quick-link-survey',
	icon: quickLinkIcons.survey,
	label: 'Survey',
	path: 'SURVEY',
};

const EBIZ_CARD = {
	testID: 'quick-link-eBizCard',
	icon: quickLinkIcons.ebizCard,
	label: 'eBiz Card',
	path: routes.EBIZ_HOME,
};

const MORE = {
	testID: 'quick-link-more',
	icon: quickLinkIcons.more,
	label: 'More',
	path: 'MORE',
};

const MFA = {
	testID: 'quick-link-mfa',
	icon: quickLinkIcons.mfa,
	label: 'Token',
	path: routes.MFA_PIN,
};

const LADDER_DASH = {
	testID: 'quick-link-ladderDash',
	icon: PBDashIcon,
	label: 'PB Dash',
	path: routes.LADDER_DASH,
};

export const QUICK_LINKS = {
	MFA,
	eCARDS,
	LEAVE,
	CLINIC,
	WATER_TRACKER,
	SELF_TEST,
	PB_JOURNEY,
	REGULATION,
	NEWS,
	LIBRARY,
	DASHBOARD,
	RELIEF,
	TRAVEL_DECLARATION,
	LEADGEN_360,
	ANALYTICS,
	MORE,
	EBIZ_CARD,
	SURVEY,
	LADDER_DASH,
};

export const WIDGET_BANNER = {
	id: '4',
	banner: widgetBanner,
};

export const NEW_YEAR_MESSAGE_BANNER = {
	id: '1',
	type: 'pdf',
	banner: newYearBanner,
	pdfUrl: { ios: NEW_YEAR_PDF, android: LOCAL_ANDROID_NEW_YEAR_PDF },
};

export const EPP_BANNER = {
	id: '5',
	type: 'pdf',
	banner: eppBanner,
	pdfUrl: { ios: EPP_PDF, android: EPP_PDF_ANDROID_LOCAL },
};

export const VIDEO_BANNER = {
	id: '3',
	type: 'video',
	banner: BannerVideo,
};

export const LONPAC_BANNER = {
	id: '2',
	banner: lonPacBanner,
};

export const PBB_ANNI_BANNER = {
	id: '6',
	banner: pbbAnniBanner,
};

export const CORPORATE_BANNER = {
	id: '5',
	banner: sustainabilityBanner,
};

export const BANNER_LIST = [
	// LONPAC_BANNER,
	// ...(showFestive ? [] : [LONPAC_BANNER]),
	...(showFestive ? [VIDEO_BANNER] : []),
	...(showPBBAnniBanner || showNewYearMessage ? [NEW_YEAR_MESSAGE_BANNER] : []),
	...(showPBBAnniBanner ? [PBB_ANNI_BANNER] : []),
	...(showEPPBanner ? [EPP_BANNER] : []),
	...(showCorporateBanner ? [CORPORATE_BANNER] : []),

	LONPAC_BANNER,
	WIDGET_BANNER,
];

export const SURVEY_URL = 'https://www.surveymonkey.com/r/PBWorkplacePulseSurvey';
// export const NEW_YEAR_PDF_URL = `https://${Config.API}/pbexperience/${NEW_YEAR_PDF_NAME}`;
