import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from 'configs';

const $headerRightView: ViewStyle = {
	flexDirection: 'row',
	minWidth: 12,

	borderRadius: 5,
	justifyContent: 'center',
};

const $mailIcon: TextStyle = {
	backgroundColor: 'transparent',

	fontSize: 23,

	color: colors.primary,
};

const $infoIcon: ImageStyle = {
	width: 30,
	height: 30,
};

const $cardSection: ViewStyle = {
	marginTop: 10,
	alignSelf: 'center',
};

const $eCardSection: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'center',
	marginTop: 20,
};
const $shadowIos: ViewStyle = {
	shadowOffset: { width: -2, height: 4 },
	shadowColor: '#171717',
	shadowOpacity: 0.2,
	shadowRadius: 3,
};
const $shadowAndroid: ViewStyle = {
	shadowColor: '#171717',
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.065,
	shadowRadius: 10,
	elevation: 1,
};

const $shareSectionHeader: ViewStyle = {
	flexDirection: 'row',

	alignItems: 'center',
};

const $shareTitle: TextStyle = {
	marginTop: 12,
	marginLeft: 20,
};

const $shareIcon: TextStyle = {
	fontSize: 20,
	color: colors.primary,
	marginLeft: 8,
	marginTop: 8,
};

const $shareContainer: ViewStyle = {
	flexDirection: 'row',
	margin: 20,
};

const $settingSection: ViewStyle = {
	marginHorizontal: 20,
	marginVertical: 10,
};

const $settingHeaderSection: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	marginBottom: 20,
};

const $settingTitle: TextStyle = {
	marginTop: 12,
};

const $settingsIcon: TextStyle = {
	backgroundColor: 'transparent',

	fontSize: 25,
	width: 100,

	color: colors.primary,
};

const $listContainer: ViewStyle = {
	backgroundColor: colors.white,
	borderRadius: 10,
	paddingVertical: 20,
	marginVertical: 5,
};

const $icon: ImageStyle = {
	width: 20,
	height: 20,
	marginRight: 10,
};

const $arrowRightIcon: TextStyle = {
	fontSize: 20,
	color: colors.primary,
};

const $input: ViewStyle = {
	width: '100%',
	height: 40,

	paddingHorizontal: 12,
	borderRadius: 4,
	borderWidth: 0.5,
};

const $badgeContainer: ViewStyle = {
	position: 'absolute',
	zIndex: 1,
	top: -5,
	right: 3,
	backgroundColor: colors.black,
	alignSelf: 'flex-end',
	paddingHorizontal: 4,
	overflow: 'hidden',
	minHeight: 20,
	minWidth: 20,
	borderRadius: 10,
	alignItems: 'center',
	justifyContent: 'center',
};
const $commentBadge: ViewStyle = {
	position: 'absolute',
	zIndex: 10,
	top: 8,
	right: 57,
	backgroundColor: colors.black,
};

const $badgeText: TextStyle = {
	color: 'white', // Badge text color
	fontSize: 12,
	fontWeight: 'bold',
	textAlign: 'center',
};
export const styles = {
	$commentBadge,

	$badgeContainer,
	$badgeText,
	$headerRightView,
	$mailIcon,
	$infoIcon,
	$cardSection,
	$eCardSection,
	$shareSectionHeader,
	$shareTitle,
	$shareIcon,
	$shareContainer,
	$settingSection,
	$settingHeaderSection,
	$settingTitle,
	$settingsIcon,
	$listContainer,
	$icon,
	$arrowRightIcon,
	$input,
	$shadowIos,
	$shadowAndroid,
};
