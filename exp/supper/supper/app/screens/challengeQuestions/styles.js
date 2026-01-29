import { colors } from 'configs';
import { StyleSheet } from 'react-native';

export const stepIndicatorStyles = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 2,
	currentStepStrokeWidth: 3,
	stepStrokeCurrentColor: colors.primary, //'#fe7013',
	stepStrokeWidth: 3,
	stepStrokeFinishedColor: colors.primary, //'#fe7013',
	stepStrokeUnFinishedColor: '#aaaaaa',
	separatorFinishedColor: colors.primary,
	separatorUnFinishedColor: '#aaaaaa',
	stepIndicatorFinishedColor: colors.primary,
	stepIndicatorUnFinishedColor: '#ffffff',
	stepIndicatorCurrentColor: '#ffffff',
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 13,
	stepIndicatorLabelCurrentColor: colors.primary,
	stepIndicatorLabelFinishedColor: '#ffffff',
	stepIndicatorLabelUnFinishedColor: '#aaaaaa',
	labelColor: '#999999',
	labelSize: 13,
	currentStepLabelColor: colors.primary,
};

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'center',
	},
	stepIndicator: {
		marginVertical: 20,
	},
	formContainer: {
		justifyContent: 'center',
	},
	labelQuestion: {
		fontSize: 14,
	},
	formField: {
		fontSize: 12,
		paddingHorizontal: 5,
		marginHorizontal: 5,
	},
	formView: {
		flex: 1,
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
});
