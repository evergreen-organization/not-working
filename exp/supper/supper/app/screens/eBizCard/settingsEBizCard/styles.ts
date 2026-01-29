import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from 'configs';

const $settingSection: ViewStyle = {
	marginHorizontal: 24,
	marginTop: 16,
};

const $listContainer: ViewStyle = {
	minHeight: 90,
	backgroundColor: colors.white,
	borderRadius: 6,
	paddingVertical: 20,
	paddingHorizontal: 14,
	marginBottom: 12,
};

const $icon: ImageStyle = {
	marginRight: 0,
	tintColor: colors.primary,
	justifyContent: 'center',
	alignItems: 'center',
	width: 30,
	height: 30,
};

const $arrowRightIcon: TextStyle = {
	fontSize: 40,
	color: colors.primary,
};
const $centerStyle: ViewStyle = {
	rowGap: 4,
	marginHorizontal: 12,
};
const $descriptionStyle: TextStyle = {
	fontSize: 12,
	fontWeight: '400',
};
const $titleStyle: TextStyle = {
	fontSize: 14,
	fontFamily: 'Montserrat-Bold',
};

const $imgComingSoon: ImageStyle = {
	width: 100,
	height: 100 / 7,
	resizeMode: 'stretch',
};

const $comingSoonContainer: ViewStyle = {
	position: 'absolute',
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
	zIndex: 99,
};

const $shadowIosView: ViewStyle = {
	shadowOffset: { width: -2, height: 4 },
	shadowColor: '#171717',
	shadowOpacity: 0.2,
	shadowRadius: 3,
};

const $shadowAndroidView: ViewStyle = {
	shadowColor: '#171717',
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.065,
	shadowRadius: 10,
	elevation: 1,
};

const $badgeContainer: ViewStyle = {
	marginHorizontal: 5,
	height: 30,
	minWidth: 30,
	padding: 5,
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 30,
	backgroundColor: colors.primary,
};

const $centerContainer: ViewStyle = {
	justifyContent: 'center',
	minWidth: 40,
};
export const styles = {
	$settingSection,
	$listContainer,
	$icon,
	$arrowRightIcon,
	$centerStyle,
	$titleStyle,
	$descriptionStyle,
	$imgComingSoon,
	$comingSoonContainer,
	$shadowIosView,
	$shadowAndroidView,
	$badgeContainer,
	$centerContainer,
};
