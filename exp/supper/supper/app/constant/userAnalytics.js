const MODULES = {
	LEADGEN360: 'Leadgen',
	PROFILE: 'Profile',
	SELF_SERVICES: 'SelfServices',
	HOME: 'home',
	LOGIN: 'login',
	E_CARDS: 'eCards',
	EMOJI_RAYA: 'emojiRaya',
	EBIZCARD: 'eBizCard',
};

const BACK_ACTION = 'header-back-button';

const HOME_SCREEN = 'quickLinks';

const ECARD_SCREENS = {
	CARD_MESSAGE_FORM: 'cardTextForm',
	GALLERY_VIEW: 'galleryView',
	CAROUSEL: 'Carousel',
};

const ECARD_ACTIONS = {
	EDIT_GREETINGS: 'tfTouchGreeting',
	EDIT_MAIN_MESSAGE: 'tfTouchMainMsg',
	EDIT_FOOTER: 'tfTouchFooter',
	VIEW: 'eCards-gallery-view-item-',
	CAROUSEL_VIEW: 'carousel-view-',
};

const LOGIN_SCREENS = {
	SPLASH: 'loginSplashScreen',
	PASSWORD_FORM: 'loginPasswordScreen',
	PIN_SCREEN: 'loginPinScreen',
};

const LOGIN_ACTIONS = {
	NAVIGATE_LOGIN: 'navigate-login-btn',
	PASSWORD_LOGIN: 'login-password-btn',
	BIOMETRIC_LOGIN: 'login-biometric-btn',
	PIN_LOGIN: 'login-pin-btn',
};

const LEADGEN360_SCREENS = {
	PROSPECT: 'Prospects',
	ADD_PROSPECT_FORM: 'AddProspectForm',
};

const LEADGEN360_ACTIONS = {
	CREATE_NEW_LEAD: 'CreateNewLead',
	CHECK_REFERRAL: 'CheckReferral',
};

const PROFILE_SCREENS = {
	USER: 'User',
	PROFILE: 'Profile',
	SELF_SERVICES: 'SelfService',
	SETTINGS: 'Setting',
	DISCLAIMER: 'Disclaimer',
	ACTIVE_DIRECTORY: 'ActiveDirectory',
};

const SELF_SERVICE_ACTIONS = {
	UNLOCK_ADID: 'unlockADID',
	RESET_PASSWORD: 'resetADIDPassword',
	SCAN_QR_CAS: 'scanQRCAS',
	SHOW_MANUAL_CAS: 'showManualCAS',
};

const EMOJI_RAYA_SCREENS = {
	QUIZ: 'emojiRayaQuiz',
	MAIN_BOARD: 'emojiRayaMainBoard',
};

const EMOJI_RAYA_ACTIONS = {
	ANSWER_WRONG: 'answerWrong',
	ANSWER_CORRECT: 'answerCorrect',
	UNLOCK_EMOJI: 'unlockEmoji',
};
const EBIZCARD_SCREENS = {
	HOME: 'eBCHome',
	SETTINGS: 'eBCSettings',
	DYNAMIC_REQUEST_LIST: 'Dynamic eBC View Request',
	EBC_HELP_CENTRE: 'eBC Help Centre',
	EBC_SHARING_PREFERENCE: 'eBC Sharing Preferences',
};
const EBIZCARD_ACTIONS = {
	SHARE_BAISC_CARD: 'Share Basic eBizCard',
	SHARE_DYNAMIC_CARD: 'Share Dynaymic eBizCard-New Tag Generated',
	SHARE_CARD_IMAGE: 'Share Card Image',
	SHARE_DYNAMIC_EXISTING_TAG: 'Share Dynamic eBizCard-Existing Tag',
	UNIQUE_QR_TAG: 'Unique QR generated',
	RENEW_TAG: 'Renew Dynamic eBC Tags',
	UPDATE_PREFERENCES: 'Update Preferences-',
};
export const USER_ANALYTICS = {
	MODULES,
	HOME_SCREEN,
	LEADGEN360_SCREENS,
	LEADGEN360_ACTIONS,
	PROFILE_SCREENS,
	SELF_SERVICE_ACTIONS,
	LOGIN_SCREENS,
	LOGIN_ACTIONS,
	ECARD_ACTIONS,
	ECARD_SCREENS,
	BACK_ACTION,
	EMOJI_RAYA_ACTIONS,
	EMOJI_RAYA_SCREENS,
	EBIZCARD_SCREENS,
	EBIZCARD_ACTIONS,
};
