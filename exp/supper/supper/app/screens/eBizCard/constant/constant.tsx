import { routes } from 'navigations';

import { CardCustomizeSelectionType } from '../eBizCardFields/types';

import { colors } from 'configs';
const CustomizeIcon = require('./../../../assets/eBizCard/Fields.png');
const ProfileIcon = require('./../../../assets/eBizCard/ProfilePic.png');
const PreviewCard = require('./../../../assets/eBizCard/PreviewCard.png');
const RequestTag = require('./../../../assets/eBizCard/requestTag.png');
const EditInfo = require('./../../../assets/eBizCard/EditInfo.png');
const EditIcon = require('./../../../assets/eBizCard/EditInfo.png');
const ChangeRequestIcon = require('./../../../assets/eBizCard/ChangeRequest.png');
const InfoIcon = require('./../../../assets/eBizCard/FAQ.png');
const Rewards = require('assets/eBizCard/rewards.png');
const LogoWhite = require('assets/eBizCard/pbb_logo_white.png');

export const CUSTOMIZE_SETTINGS_OPTIONS = [
	{
		id: 2,
		icon: RequestTag,
		title: 'Dynamic eBC View Requests',
		subHeading: 'Review and approve requests to view your dynamic eBiz Card profile',
		route: routes.EBIZ_DYNAMIC_REQUESTS,
		badgeCount: true,
	},
	{
		id: 5,
		icon: CustomizeIcon,
		title: 'eBC Sharing Preferences',
		subHeading: 'Review and select the information you would like to share in your eBiz Card',
		route: routes.CUSTOMIZE_EBIZ_FIELD,
	},
	{
		id: 4,
		icon: PreviewCard,
		title: 'Preview Dynamic eBC Profile',
		subHeading: 'Review your public eBiz Card profile page',
		route: routes.WEBVIEW_PRIVIEW,
	},
	{
		id: 3,
		icon: EditInfo,
		title: 'Edit eBC Information',
		subHeading: 'Customize the information in your eBiz Card',
		route: routes.EDIT_EBIZ_CARD,
		isComing: true,
	},
	{
		id: 7,
		icon: ProfileIcon,
		title: 'Customize eBC Profile Picture',
		subHeading: 'Upload and select your preferred profile picture for your eBiz Card',
		route: routes.CHANGE_PROFILE_EBIZ_PROFILE,
		isComing: true,
	},
	{
		id: 1,
		icon: ChangeRequestIcon,
		title: 'Change Request Approvals',
		subHeading: 'Review and approve staff eBiz Card change requests (Managers Only)',
		route: routes.EBIZ_CHANGE_REQUESTS,
		isComing: true,
	},
	{
		id: 8,
		icon: Rewards,
		title: 'Rewards & Challenges',
		subHeading: 'Unlock unique and special eBiz Card features by completing specific challenges!',
		route: routes.EBIZ_REWARDS,
		isComing: true,
	},
	{
		id: 9,
		icon: InfoIcon,
		title: 'eBiz Card Help Centre',
		subHeading: 'Need help? Easily and convenient search for the answers you need here.',
		route: routes.EBIZ_GUID,
	},
];
const greenGradient = ['#095252', '#058a8a', '#00C2C2'];
const blueGradient = ['#C32C2C', '#c22e27', '#0008C2'];
export const CARD_VARIANT = [
	{
		type: 'type1',
		isGradients: false,
		bgColor: colors.white,
		textColor: colors.black,
		iconColor: colors.red,
		pbLogo: LogoWhite,
	},
	{
		type: 'type2',
		isGradients: false,
		bgColor: '#000000',
		textColor: colors.white,
		iconColor: colors.red,
		pbLogo: LogoWhite,
	},
	{
		type: 'type3',
		isGradients: false,
		bgColor: '#C32C2C',
		textColor: colors.white,
		iconColor: colors.white,
		pbLogo: LogoWhite,
	},
	{
		type: 'type4',
		isGradients: true,
		bgColor: greenGradient,
		textColor: colors.white,
		iconColor: colors.white,
		pbLogo: LogoWhite,
	},
	{
		type: 'type5',
		isGradients: true,
		bgColor: blueGradient,
		textColor: colors.white,
		iconColor: colors.white,
		pbLogo: LogoWhite,
	},
];

export const EBIZ_CARD_CUSTOMIZE_BACK_SELECTION: CardCustomizeSelectionType[] = [
	{
		id: 1,
		label: 'Profile QR',
		value: 'profileQR',
		isBack: true,
	},
	{
		id: 2,
		label: 'MyPB Link',
		value: 'myPBLink',
		isBack: true,
	},
	{
		id: 3,
		label: 'PB Engage Link',
		value: 'pbEngageLink',
		isBack: true,
	},
	{
		id: 4,
		label: 'PB Share Link',
		value: 'pbShareLink',
		isBack: true,
	},
	{
		id: 5,
		label: 'PBe QR Link',
		value: 'pbeQR',
		isBack: true,
	},
];

export const EBIZ_NOTIFICATION_LIST = {
	changes: {
		id: 1,
		icon: EditIcon,
		title: 'Change Requests',
		route: routes.EBIZ_CHANGE_REQUESTS,
	},
	dynamic: {
		id: 2,
		icon: EditIcon,
		title: 'Dynamic eBiz Card Request',
		route: routes.EBIZ_DYNAMIC_REQUESTS,
	},
};

export const HIDDEN_FIELDS = ['cardDesignId', 'branchLong', 'branchLat', 'companyCode'];
export const preTags = [
	'General Purpose',
	'Prospect',
	'Property Launch',
	'Branch Roadshow',
	'Networking Event',
	'Acquaintance',
	'Vendor',
	'Family / Relatives',
];
