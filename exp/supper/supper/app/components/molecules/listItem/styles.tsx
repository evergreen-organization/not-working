import { ImageStyle, ViewStyle } from 'react-native';

const $row: ViewStyle = {
	flexDirection: 'row',
	paddingHorizontal: 20,
	paddingVertical: 10,
};

const $content: ViewStyle = {
	flex: 1,
	justifyContent: 'center',
};

const $icon: ImageStyle = {
	width: 20,
	height: 20,
	marginRight: 10,
	alignSelf: 'center',
};

export const styles = {
	$row,
	$content,
	$icon,
};
