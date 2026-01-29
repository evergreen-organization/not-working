import { Dimensions, TextStyle, ViewStyle } from 'react-native';
import { colors } from 'configs';
const windowWidth = Dimensions.get('window').width * 0.85;
const windowHeight = Dimensions.get('window').height * 0.5;

const $popupContent: ViewStyle = {
	minHeight: windowHeight,
	width: windowWidth,

	backgroundColor: colors.white,
	borderRadius: 12,
	paddingHorizontal: 24,
	gap: 30,
};
const $popUpHeader: ViewStyle = {
	paddingTop: 29,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-start',
};

const $button: ViewStyle = {
	borderRadius: 6,
	alignItems: 'center',
	justifyContent: 'center',
	height: 50,
};

const $input: ViewStyle = {
	width: '100%',
	height: 40,
	marginVertical: 10,
	paddingHorizontal: 12,
	borderRadius: 4,
	borderWidth: 0.5,
};
const $crossIconContainer: ViewStyle = {
	position: 'absolute',
	right: 0,
	top: 20,
};
const $crossIcon: TextStyle = {
	fontSize: 32,
	color: colors.primary,
	borderRadius: 6,
};
const $tagView: ViewStyle = {
	flexDirection: 'row',
	flexWrap: 'wrap',
	gap: 10,
};
const $tagContainer: ViewStyle = {
	backgroundColor: colors.background,
	borderRadius: 4,
	padding: 6,
};
const $tagText: TextStyle = {
	fontWeight: '400',
	fontSize: 12,
	color: '#000',
};
const $tagDate: TextStyle = {
	fontStyle: 'italic',
	fontSize: 12,
	fontWeight: '400',
	color: colors.black,
	marginVertical: 15,
	marginBottom: 30,
};

const $buttonText: TextStyle = {
	color: colors.white,
	fontSize: 14,
	fontFamily: 'Montserrat-Bold',
};
const $popUpText: TextStyle = {
	color: '#000',
	fontSize: 14,
	fontWeight: '400',
	textAlign: 'left',
	marginBottom: 10,
};
const $tagDescription: TextStyle = {
	color: colors.primary,
	fontSize: 16,
	fontFamily: 'Montserrat-Bold',
	textAlign: 'left',
};
const $qrText: TextStyle = {
	color: '#000',
	fontSize: 14,
	fontWeight: '400',
	textAlign: 'center',
};
export const styles = {
	$popupContent,
	$qrText,
	$button,
	$crossIcon,
	$input,
	$popUpHeader,
	$buttonText,
	$crossIconContainer,
	$popUpText,
	$tagDescription,
	$tagContainer,
	$tagView,
	$tagText,
	$tagDate,
};
