export default Object.freeze({
	// navigators
	AUTH_NAVIGATOR: 'AuthNavigator',
	TAB_NAVIGATOR: 'TabNavigator',
	HOME_NAVIGATOR: 'HomeNavigator',
	NOTIFICATION_NAVIGATOR: 'NotificationNavigator',
	USER_NAVIGATOR: 'UserNavigator',

	// authentication
	LOGIN: 'Login',
	PIN_LOGIN: 'PinLogin',
	ENROLL_PIN: 'EnrollPin',

	// main
	HOME: 'Home',
	NOTIFICATION: 'Notification',
	USER: 'User',
	LOGOUT: 'LogOut',

	// home tab
	MEETING: 'Meeting',
	MEETING_DETAILS: 'MeetingDetails',
	REGULATION: 'Regulation',
	LEAVE: 'Leave',
	TRAINING: 'Training',
	LIBRARY: 'Library',
	INVITATIONS: 'Invitations',
	DASHBOARD: 'Dashboard',
	PANEL_CLINICS: 'PanelClinics',
	WATER_TRACKER: 'WaterTracker',
	PROMOTIONS: 'Promotions',
	NEWS: 'News',
	INTERSTATE: 'Interstate',
	INTERSTATE_FORM: 'InterstateForm',
	RELIEF_ASSIGNMENT: 'ReliefAssignment',
	PB_JOURNEY: 'PBJourney',

	// notification tab
	NOTIFICATION_DETAILS: 'Info',
	NEW_NOTIFICATION: 'NewNotification',
	NEW_NOTIFICATION_PREVIEW: 'Preview',
	NOTIFICATION_PERSONAL: 'personalNotification',
	NOTIFICATION_ANNOUNCEMENT: 'announcement',

	// user tab
	PROFILE: 'Profile',
	SETTINGS: 'Settings',
	DISCLAIMER: 'Disclaimer',
	SELF_SERVICE: 'Self Service',
	PIN: 'Pin',
	INPUT_PASSWORD: 'Password',
	CHALLENGE_QUESTIONS: 'Challenge Questions',
	CHANGE_PIN: 'Change Pin',

	// leave module
	APPLY_LEAVE: 'ApplyLeave',
	APPROVE_LEAVE: 'ApproveLeave',
	PENDING_LEAVE: 'PendingLeave',

	// training module
	PB_START_HERE: 'PBStartHere',

	// library module
	LIBRARY_LIST: 'LibraryList',
	E_LIBRARY: 'ELibrary',
	READING_GOALS: 'ReadingGoals',

	// promotion module
	PROMOTION_DETAILS: 'PromotionDetails',

	// Regulation module
	REGULATION_LANDING_PAGE: 'RegulationLandingPage',
	REGULATION_DETAILS: 'RegulationDetails',

	// library module

	// water tracker
	WATER_TRACKER_FORM: 'WaterTrackerForm',

	// TODO : REMOVE THIS WHEN CNY IS DONE
	LOGOUTSPECIAL_HOLIDAY: 'LogoutSpecialHoliday',

	// Covid
	COVID_UPLOAD_RESULT: 'CovidUploadResult',
	COVID_TEST_HISTORY: 'CovidTestHistory',
	COVID_APPROVE_RESULT: 'CovidApproveResult',
	COVID_PENDING_TAB: 'CovidPendingTab',
	COVID_COMPLETE_TAB: 'CovidCompleteTab',
	COVID_APPROVE_DETAIL: 'CovidApproveDetail',
	COVID_HISTORY_DETAIL: 'CovidHistoryDetail',

	//Soft Token
	SOFT_TOKEN_CHECKIC: 'SoftTokenCheckIC',
	SOFT_TOKEN_ACTIVATION: 'SoftTokenActivation',
	SOFT_TOKEN_VALIDATEPAC: 'SoftTokenValidatePAC',
	VALIDATE_PIN: 'ValidatePin',

	INIT_LOADING: 'InitLoading',

	//Photo Wall
	PHOTO_WALL: 'PhotoWall',
	PHOTO_WALL_GALLERY_VIEW: 'PhotoWallGalleryView',
	CARD_TEXT_FORM: 'CardTextForm',
	ECARD_CHALLENGE: 'ECardChallenge',

	//Adid Awareness
	ADID_INSTRUCTION: 'adidInstruction',
	ADID_FAQ: 'adidFaq',
	ADID_FAQ_RESULT: 'adidFaqResult',

	//LeadGen 360
	LG360_PROSPECT: 'LG360Prospect',
	LG360_NEW_LEAD: 'LG360NewLead',
	LG360_NEW_LEAD_DETAILS_FORM: 'LG360NewLeadDetailsForm',
	LG360_ACKNOWLEDGEMENT: 'LG360Acknowledgement',
	LG360_SUMMARY_STATUS: 'LG360SummaryStatus',

	//Analytics
	ANALYTICS: 'Analytics',

	//Preview Video
	PREVIEW_VIDEO: 'PreviewVideo',

	//EBiz Card
	EBIZ_HOME: 'EBizHome',
	EBIZ_CARD_INFO: 'EBizCardInfo',
	EDIT_EBIZ_CARD: 'EditEBizCard',

	CUSTOMIZE_EBIZ_FIELD: 'CustomizeEBIZField',

	CHANGE_PROFILE_EBIZ_PROFILE: 'ChangeProfileEBIZProfile',

	EBIZ_GUID: 'EbizGuide',

	EBIZ_CHANGE_REQUESTS: 'ChangeRequest',
	EBIZ_DYNAMIC_REQUESTS: 'DynamicRequestList',

	EBIZ_NOTFICATION_LIST: 'EbizNotificationList',
	EBIZ_SYSTEM_SETTINGS: 'EbizCardSettings',

	WEBVIEW_PRIVIEW: 'WebViewPriview',
	EBIZ_TUTORIAL: 'EbizTutorial',
	EBIZ_TUTORIAL_DETAILS: 'EbizTutorialDetails',
	EBIZ_TUTORIAL_WEBVIEW: 'EbizTutorialWebview',
	EBIZ_REWARDS: 'Rewards',

	FORTUNE_COOKIES_START: 'fortuneCookiesStart',
	FORTUNE_COOKIES_WISHES: 'fortuneCookiesWishes',

	//Emoji Raya
	EMOJI_RAYA_MAIN_BOARD: 'emojiRayaMainBoard',
	EMOJI_RAYA_QUIZ: 'emojiRayaQuiz',

	//MFA
	MFA_INTRO: 'mfaIntro',
	MFA_HAS_HARD_TOKEN: 'mfaHasHardToken',
	MFA_INFO_CONFLICT: 'mfaInfoConflict',
	MFA_QR_SCAN: 'mfaQrScan',
	MFA_PIN: 'mfaPin',
	MFA_ADID_FORM: 'mfaAdidForm',
	MFA_ENROLL_PIN: 'mfaEnrollPin',
	MFA_SUCCESS: 'mfaSuccess',
	MFA_ENROLL_BIOMETRIC: 'mfaEnrollBiometric',
	MFA_OTP: 'mfaOTP',
	MFA_ADID_PASSWORD_FORM: 'mfaAdidPasswordForm',
	MFA_TNC: 'mfaTnc',
	IMAGE_VIEW: 'imageView',
	MFA_RE_ENROLL_BIOMETRIC: 'mfaReEnrollBiometric',

	//Common screens
	QUICK_LINKS: 'quickLinks',

	//Bingo Game
	BINGO: 'Bingo',
	BINGO_UNLOCK: 'BingoUnlock',
	BINGO_GAME_INSTRUCTION: 'BingoGameInstruction',
	BINGO_INSUFFICIENT_COIN: 'BingoInsufficientCoins',
	BINGO_LOADING: 'BingoLoading',
	BINGO_MAIN: 'BingoMain',
	PIRATE_PERIL: 'PiratePeril',
	JUMBLE_RUMPLE: 'jumbleRumple',
	BOMB_DIFFUSER: 'bombDiffuser',
	BOMB_DIFFUSER_INIT: 'bombDiffuserInit',
	BALLOON_POP: 'BallonPop',
	REFERRAL_CHALLENGE: 'referralChallenge',
	LEADERBOARD: 'leaderboard',
	BINGO_CAMPAIGN_UNAVAILABLE: 'BingoCampaignUnavailable',
	BINGO_CAMPAIGN_END: 'BingoCampaignEnd',

	BINGO_MOVIE_QUESTION: 'BingoMovieQuestion',
	BINGO_MOVIE_LEAVE: 'BingoMovieLeave',
	BINGO_MOVIE_WIN: 'BingoMovieWin',
	BINGO_MOVIE_LOSE: 'BingoMovieLose',

	BINGO_READING_QUESTION: 'BingoReadingQuestion',
	BINGO_READING_LEAVE: 'BingoReadingLeave',
	BINGO_READING_WIN: 'BingoReadingWin',
	BINGO_READING_LOSE: 'BingoReadingLose',
	HANGMAN: 'Hangman',

	SNAKE_AND_LADDER: 'SnakeAndLadder',
	BALL_GAME: 'BallGame',
	FLAPPY_BIRD: 'FlappyBird',
	MEMORY_MATCH: 'MemoryMatch',
	BOSS_GAME: 'BossGame',

	LADDER_DASH: 'LadderDash',
	LADDER_TUTORIAL: 'LadderTutorial',
	AVATAR: 'Avatar',
	STORY_LINE: 'StoryLine',

	SPACE_SHOOTER: 'SpaceShooter',

	TRUE_TRAPPED: 'TrueTrapped',
	WHACK_AMOLE: 'WhackAMole',
	MISSION: 'Mission',
	MISSION_INSTRUCTION: 'MissionInstruction',
	DY_KNOW: 'DidYouKnow',
	ENDING_SCREEN: 'EndingScreen',
	FINAL_LEADERBOARD: 'FinalLeaderBoard',
});
