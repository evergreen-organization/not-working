import { ImageStyle, ViewStyle } from 'react-native';

const $headerItemsContainer: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'space-between',
	margin: 10,
};

const $bottomContainer: ViewStyle = {
	flex: 1,
	justifyContent: 'flex-end',
};

const $bottomItemsContainer: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'space-between',
	margin: 30,
};

const $contentContainer: ViewStyle = {
	flex: 1,
};

const $bgImageStyle: ImageStyle = {
	opacity: 0.5,
};

export const styles = {
	$headerItemsContainer,
	$bottomContainer,
	$bottomItemsContainer,
	$contentContainer,
	$bgImageStyle,
};
