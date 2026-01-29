import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	date: {
		borderWidth: 1,
		backgroundColor: colors.background,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	textContainer: {
		backgroundColor: colors.background,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
	},
	text: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingVertical: 12,
		color: colors.secondaryFont,
	},
	mandatoryText: {
		color: colors.red,
		marginLeft: 5,
	},
	remarkTextInput: {
		height: 100,
		textAlignVertical: 'top',
	},
});
