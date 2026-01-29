import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from 'configs';

const $container: ViewStyle = {
	marginHorizontal: 20,
	alignItems: 'center',
	marginVertical: 20,
	flex: 1,
};

const $profileIcon: ImageStyle = {
	width: 50,
	height: 50,
	marginBottom: 10,
};

const $profileContainer: ViewStyle = {
	marginVertical: 20,
};

const $row: ViewStyle = {
	flexDirection: 'row',
	padding: 10,
};

const $avatar: ViewStyle = {
	backgroundColor: colors.lightGrey,
};

const $text: TextStyle = {
	textAlign: 'center',
	marginVertical: 10,
};

const $remainingText: TextStyle = {
	color: colors.primary,
};

export const styles = {
	$container,
	$profileIcon,
	$profileContainer,
	$row,
	$avatar,
	$text,
	$remainingText,
};
