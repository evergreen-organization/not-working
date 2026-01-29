import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from 'configs';

const $selectionButton: ViewStyle = {
	backgroundColor: colors.white,
	padding: 12,
	borderRadius: 5,
	flexDirection: 'row',
	alignItems: 'flex-start',
	marginVertical: 8,
};

const $selectionLabel: TextStyle = {
	marginLeft: 10,
};

const $frontButtonIcon: ImageStyle = {
	transform: [{ rotate: '180deg' }],
};

const $frontButtonView: ViewStyle = {
	paddingHorizontal: 5,
};

const $container: ViewStyle = {
	flex: 1,
	paddingHorizontal: 20,
};

const $sectionContainer: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
};

const $header: ViewStyle = {
	flexDirection: 'row',
};

const $selectionSection: ViewStyle = {
	paddingVertical: 20,
};

const $descText: TextStyle = {
	fontSize: 11,
	fontStyle: 'italic',
	color: '#717171',
};

const $touchableAddress: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'flex-start',
	marginVertical: 5,
};

const $columnAddress: ViewStyle = {
	flexDirection: 'column',
	marginLeft: 10,
};
const $labelAddress: TextStyle = {
	fontSize: 14,
};

export const styles = {
	$selectionButton,
	$selectionLabel,
	$frontButtonIcon,
	$frontButtonView,
	$container,
	$sectionContainer,
	$header,
	$selectionSection,
	$descText,
	$touchableAddress,
	$columnAddress,
	$labelAddress,
};
