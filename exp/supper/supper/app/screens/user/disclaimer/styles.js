import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	content: {
		backgroundColor: colors.white,
		paddingBottom: 12,
	},
	sectionContainer: {
		borderBottomWidth: 1,
		borderColor: colors.medium,
		marginHorizontal: 20,
		paddingVertical: 12,
	},
	paragraph: {
		marginTop: 10,
		color: colors.primaryFont,
	},
	icon: {
		width: 40,
		height: 40,
		tintColor: colors.primary,
		alignSelf: 'center',
		marginVertical: 12,
	},
	header: {
		color: colors.eerieBlack,
	},
});
