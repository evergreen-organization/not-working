import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	background: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
	},
	image: {
		width: '100%',
		height: 200,
		alignSelf: 'center',
	},
	title: {
		marginTop: 30,
		fontSize: 16,
		lineHeight: 22,
		color: colors.primary,
	},
	instructionText: {
		fontSize: 14,
		paddingVertical: 10,
		lineHeight: 20,
	},
	buttonView: {
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.primary,
	},
	buttonViewFAQ: {
		backgroundColor: colors.primary,
		borderWidth: 1,
		borderColor: colors.primary,
	},
	buttonTitle: {
		flex: 2,
		textAlign: 'left',
		color: colors.primary,
	},
	buttonTitleFAQ: {
		flex: 2,
		textAlign: 'left',
		color: colors.white,
	},
	buttonIcon: {
		flex: 0.1,
		tintColor: colors.primary,
	},
});
