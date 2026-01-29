import { showFestive } from 'constant';

const ThemeColors = ({
	primary = '#C43A40',
	secondary = '#FDACA7',
	tertiary = '#FDF8CD',
	primaryGradient = ['#C43A40', '#C43A40'],
	secondaryGradient = ['#FDACA7', '#FDACA7'],
	tertiaryGradient = ['#C43A40', '#C43A40'],
	tabBarActiveTint = '#C43A40',
	tabBarInactiveTint = '#AAA',
	tabBarBg = '#FFFFFF',
	eCardPrimary = '#F0B700',
	eCardSecondary = '#3756C6',
	paginator = '#C43A40',
	headerBackIcon = '#991C1C',
}) => {
	return {
		primary,
		secondary,
		tertiary,
		primaryGradient,
		secondaryGradient,
		tertiaryGradient,
		tabBarActiveTint,
		tabBarInactiveTint,
		tabBarBg,
		eCardPrimary,
		eCardSecondary,
		paginator,
		headerBackIcon,
	};
};

const themeFestive = ThemeColors({
	primary: '#B90E27',
	secondary: '#C43A40', //'#0C613A'/* Hijau*/,
	tertiary: '#D0BCAC',
	primaryGradient: ['#C43A40', '#C43A40'],
	secondaryGradient: ['#BF9A75', '#BF9A75'],
	tertiaryGradient: ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)'],
	tabBarActiveTint: '#F0B700',
	tabBarInactiveTint: '#FFFFFF',
	tabBarBg: '#A51C30',
	eCardPrimary: '#F0B700',
	eCardSecondary: '#F0B700',
	paginator: '#F0B700',
});

const themeDefault = ThemeColors({});

const colorConstructor = () => {
	if (showFestive) {
		return themeFestive;
	}
	return themeDefault;
};

const themeColor = colorConstructor();

export const colors = {
	babyPowder: '#FFFFFC',
	babyBlueEyes: '#A0C4FF',
	oldLavender: '#6D6875',
	eerieBlack: '#242423',
	primary: themeColor.primary,
	secondary: themeColor.secondary,
	tertiary: themeColor.tertiary,
	success: '#CDFDD4',
	error: '#aa3a3a',
	errorBackground: '#F2D6CD',
	white: '#FFFFFF',
	black: '#333333',
	dark: '#000000',
	pbxAlt: '#607196',
	pbxAltFaded: '#DCE6F2',
	pbxAltGrad1: '#274C77',
	pbxAltGrad2: '#6096BA',
	red: '#C43A40',

	primaryFont: '#333333',
	secondaryFont: '#777777',
	tertiaryFont: '#FFFFFF',
	shadow: '#828282',
	medium: '#E3E3E3',
	background: '#F5F5F5',
	border: '#F1F1F1',
	green: '#27B05E',
	yellow: '#FFCC00',
	pink: '#FDEBE7',
	blue: '#2779CA',
	festiveColor: '#257097',
	transparent: '#FFFFFF00',
	festiveLinear: ['#2C8BB7', '#257097'],
	whiteLinear: ['#FFFFFF', '#FFFFFF'],
	lightGreen: '#EDFBE7',
	lightYellow: '#FFFACD',
	lightRed: '#FFF0EB',
	lightBlue: '#DDF3FF',
	brightGreen: '#32ba7c',
	brightBlue: '#4193d2',
	brightYellow: '#ffc048',
	brightRed: '#dd4247',
	lightGrey: '#D3D3D3',
	semiWhiteTransparent: 'rgba(255, 255, 255, 0.9)',
	tabBarActiveTint: themeColor.tabBarActiveTint,
	tabBarInactiveTint: themeColor.tabBarInactiveTint,
	tabBarBg: themeColor.tabBarBg,
	iconBackground: '#FFFFFFC0',
	eCardPrimary: themeColor.eCardPrimary,
	eCardSecondary: themeColor.eCardSecondary,
	modalBackdrop: '#00000080',
	paginator: themeColor.paginator,
	headerBackIcon: '#CC0000',
	paginatorInactive: '#CACACA',
};

export const skeletonColors = {
	bone: '#EEE',
	highlight: '#F9F9F9',
};

export const blueGradient = ['#274C77', '#6096BA'];

export const gradientColors = {
	primary: themeColor.primaryGradient,
	secondary: themeColor.secondaryGradient,
	tertiary: themeColor.tertiaryGradient,
	white: ['#FFFFFF', '#FFFFFF'],
	black: ['#00000008', '#000000'],
	yellowish_red: ['#F4B000', '#DA3529'],
};

export const tagColors = {
	default: {
		primary: colors.primary,
		secondary: colors.medium,
	},
	yellow: {
		primary: '#E48D2A',
		secondary: '#FFFFF7',
	},
	red: {
		primary: '#C43A40',
		secondary: '#FFF7F7',
	},
	grey: {
		primary: '#666',
		secondary: '#F7F7F7',
	},
	green: {
		primary: '#27B05E',
		secondary: '#F7FFF7',
	},
	blue: {
		primary: '#2779CA',
		secondary: '#F7FBFF',
	},
};
