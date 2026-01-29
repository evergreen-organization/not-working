import moment from 'moment';
import { Dimensions, Platform } from 'react-native';
import { Config } from '../../env';
import EPP from 'assets/home/EPP.pdf';
import NY from 'assets/home/new-year-message.pdf';
export const BiometricType = {
	FACE_ID: 'Face ID',
	TOUCH_ID: 'Touch ID',
};

export const ApiRetryCount = 3;

export const AuthType = {
	AUTH_LOGIN: 0,
	QUICK_LOGIN: 1,
	PIN_LOGIN: 2,
};

export const DOMAIN_TYPE = {
	0: {
		id: '0',
		key: 'PBB',
	},
	1: {
		id: '1',
		key: 'PIV',
	},
};

export const RAYA_DATE = '2024-03-27';
export const showFestive = moment().isSameOrBefore('2026-03-03', 'day');
export const showPBBAnniBanner = moment().isBetween('2026-02-02', '2026-12-31', 'day', '[]');
export const showNewYearMessage = moment().isBetween('2026-01-01', '2026-01-26', 'day', '[]');
export const showCorporateBanner = moment().isBetween('2025-09-01', '2025-09-10', 'day', '[]');
export const showEPPBanner = moment().isBetween('2025-10-30', '2025-12-31', 'day', '[]');
export const showEcardsQuickLink = showFestive;
export const EPP_PDF = EPP;
export const EPP_PDF_ANDROID_LOCAL = 'bundle-assets://EPP.pdf';
// export const NEW_YEAR_PDF_NAME = 'actual_nym.pdf';
export const NEW_YEAR_PDF = NY;
export const LOCAL_ANDROID_NEW_YEAR_PDF = 'bundle-assets://NYM.pdf';

export const showVideoBanner = true;

export const showSurveyQuickLink = moment().isSameOrBefore('2023-10-06');

export const CONNECTION_TIMEOUT = 'CONNECTION_TIMEOUT';
export const CONNECTION_TIMEOUT_MSG = 'Connection Timeout';

export const SERVER_UNAVAILABLE = 'E00011';

export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCESS = 'succeeded';
export const FAIL = 'failed';

export const DateTimeFormat = 'M/D/yyyy HH:mm:ss';

export const DEMO_ACCOUNT_NOT_AVAILABLE = 'Feature not available for Demo Account';

export const INVALID_DEVICE_NAME = 'noname';
export const E_FESTIVE_CARD_OPACTITY = 0.93;
export const MODAL_BACKDROP_OPACITY = 0.7;
export const isIos = Platform.OS === 'ios';
export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const WATER_TRACKER_NOTIFICATION_CHANNEL = 'WATER_TRACKER_NOTIFICATION_CHANNEL';
export const PBX_NOTIFICATION_CHANNEL = 'PBeXperience';

export const DEEP_LINK_PREFIX = 'pbexperience:/';
export const LOAN_PAC_URL =
	'https://www.lonpac.com/staff/pbb?utm_source=App&utm_medium=Banner&utm_campaign=PBB-Staff_202501_Insurance+&utm_id=PBB+Staff';

export const WIDGET_SHARED_STORAGE_KEY = {
	otp: 'otp',
	quickLinks: 'quickLinks',
	miniQuickLinks: 'miniQuickLinks',
	eBizCard: 'eBizCard',
};

export const IS_PRODUCTION = Config.REGION === 'PROD';
export const WIDGET_APP_GROUP = IS_PRODUCTION
	? 'group.com.pbb.pbexperiencemy'
	: 'group.pbexperience';

export const DEEP_LINKS = {
	otp: 'otp',
	token: 'token',
	clinic: 'clinic',
	dashboard: 'dashboard',
	ebizCard: 'ebizCard',
	pbJourney: 'pbJourney',
	eFestiveCard: 'eFestiveCard',
	leadGen: 'leadGen',
	leave: 'leave',
	library: 'library',
	news: 'news',
	regulation: 'regulation',
	relief: 'relief',
	selfService: 'selfService',
	selfTest: 'selfTest',
	travel: 'travel',
	water: 'water',
	shareBasicEbiz: 'shareBasicEbiz',
	shareQrEbiz: 'shareQrEbiz',
	quickLinks: 'quickLinks',
	miniQuickLinks: 'miniQuickLinks',
};

export const QUICK_LINKS: Record<
	string,
	{
		id: string;
		label: string;
		icon: string;
		deeplink: string;
		pathName: string;
	}
> = {
	[DEEP_LINKS.clinic]: {
		id: 'clinic',
		label: 'Clinic',
		icon: 'clinic',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.clinic}`,
		pathName: DEEP_LINKS.clinic,
	},
	[DEEP_LINKS.dashboard]: {
		id: 'dashboard',
		label: 'Dashboard',
		icon: 'dashboard',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.dashboard}`,
		pathName: DEEP_LINKS.dashboard,
	},
	[DEEP_LINKS.ebizCard]: {
		id: 'ebiz',
		label: 'eBiz Card',
		icon: 'ebiz',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.ebizCard}`,
		pathName: DEEP_LINKS.ebizCard,
	},
	[DEEP_LINKS.pbJourney]: {
		id: 'pbJourney',
		label: 'PB Journey',
		icon: 'pb_journey',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.pbJourney}`,
		pathName: DEEP_LINKS.pbJourney,
	},
	...(showFestive && {
		[DEEP_LINKS.eFestiveCard]: {
			id: 'ecard',
			label: 'eCards!',
			icon: 'ecard',
			deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.eFestiveCard}`,
			pathName: DEEP_LINKS.eFestiveCard,
		},
	}),
	[DEEP_LINKS.leadGen]: {
		id: 'lead_gen',
		label: 'LeadGen 360',
		icon: 'lead_gen',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.leadGen}`,
		pathName: DEEP_LINKS.leadGen,
	},
	[DEEP_LINKS.leave]: {
		id: 'leave',
		label: 'Leave',
		icon: 'leave',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.leave}`,
		pathName: DEEP_LINKS.leave,
	},
	[DEEP_LINKS.library]: {
		id: 'library',
		label: 'Library',
		icon: 'library',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.library}`,
		pathName: DEEP_LINKS.library,
	},
	[DEEP_LINKS.news]: {
		id: 'news',
		label: 'News',
		icon: 'news',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.news}`,
		pathName: DEEP_LINKS.news,
	},
	[DEEP_LINKS.regulation]: {
		id: 'regulation',
		label: 'Regulation',
		icon: 'regulation',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.regulation}`,
		pathName: DEEP_LINKS.regulation,
	},
	[DEEP_LINKS.relief]: {
		id: 'relief',
		label: 'Relief',
		icon: 'relief',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.relief}`,
		pathName: DEEP_LINKS.relief,
	},
	[DEEP_LINKS.selfService]: {
		id: 'self_service',
		label: 'AD ID Self Service',
		icon: 'self_service',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.selfService}`,
		pathName: DEEP_LINKS.selfService,
	},
	[DEEP_LINKS.selfTest]: {
		id: 'self_test',
		label: 'Self Test',
		icon: 'self_test',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.selfTest}`,
		pathName: DEEP_LINKS.selfTest,
	},
	[DEEP_LINKS.travel]: {
		id: 'travel',
		label: 'Travel Declaration',
		icon: 'travel',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.travel}`,
		pathName: DEEP_LINKS.travel,
	},
	[DEEP_LINKS.water]: {
		id: 'water',
		label: 'Water',
		icon: 'water',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.water}`,
		pathName: DEEP_LINKS.water,
	},
};

export const COMPLETE_DEEP_LINKS = {
	[DEEP_LINKS.token]: {
		id: 'token',
		label: 'Token',
		icon: 'token',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.token}`,
		pathName: DEEP_LINKS.token,
	},
	[DEEP_LINKS.otp]: {
		id: 'otp',
		label: 'Otp',
		icon: 'otp',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.otp}`,
		pathName: DEEP_LINKS.otp,
	},
	[DEEP_LINKS.shareBasicEbiz]: {
		id: 'shareBasicEbiz',
		label: 'ShareBasishareBasicEbiz',
		icon: 'shareBasicEbiz',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.shareBasicEbiz}`,
		pathName: DEEP_LINKS.shareBasicEbiz,
	},
	[DEEP_LINKS.shareQrEbiz]: {
		id: 'shareQrEbiz',
		label: 'ShareBasishareQrEbiz',
		icon: 'shareQrEbiz',
		deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.shareQrEbiz}`,
		pathName: DEEP_LINKS.shareQrEbiz,
	},
	...QUICK_LINKS,
};

export const HOME_DEEP_LINKS = [
	...Object.values(COMPLETE_DEEP_LINKS)
		.map((quickLink) => quickLink.pathName)
		.filter((pathName) => pathName !== DEEP_LINKS.token && pathName !== DEEP_LINKS.otp),
];
