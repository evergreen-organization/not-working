import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

export const colorOrange = '#fe7013';
export const colorGreen = '#8ae7b6';
export const colorRed = '#E36B6B';
export const colorBlue = '#87cefa';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	carouselContainer: {
		flex: 1,
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	pathContainer: {
		backgroundColor: colors.white,
	},
	pdf: {
		height: '100%',
		backgroundColor: colors.white,
	},
	favourite: {
		width: 40,
		height: 40,
		backgroundColor: '#F5F5F5',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 10,
		justifyContent: 'center',
		padding: 10,
	},
	favIcon: {
		width: 25,
		height: 25,
		padding: 10,
		tintColor: colors.primary,
	},
	stepIndicator: { flex: 1, marginLeft: -8 },
	step: {
		stepIndicatorSize: 10,
		currentStepIndicatorSize: 30,
		separatorStrokeWidth: 2,
		currentStepStrokeWidth: 3,
		stepStrokeWidth: 2,
		stepStrokeFinishedColor: colorGreen,
		stepStrokeUnFinishedColor: '#D8D8D8',
		separatorFinishedColor: colorGreen,
		separatorUnFinishedColor: '#D8D8D8',
		stepIndicatorFinishedColor: colorGreen,
		stepIndicatorUnFinishedColor: colors.white,
		stepIndicatorCurrentColor: colors.white,
		stepIndicatorLabelFontSize: 13,
		currentStepIndicatorLabelFontSize: 13,
		stepIndicatorLabelCurrentColor: colorOrange,
		stepIndicatorLabelFinishedColor: colors.white,
		stepIndicatorLabelUnFinishedColor: '#D8D8D8',
		labelColor: '#999999',
		labelSize: 13,
		currentStepLabelColor: colorOrange,
	},
	dialogView: {
		flex: 1,
		width: width,
	},
});
