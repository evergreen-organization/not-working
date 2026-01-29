import { colors } from 'configs';
import { FONT_FAMILY_BOLD } from 'styles/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		marginTop: 8,
		// padding: 12,
		// paddingTop: 10,
		// backgroundColor: 'red',
	},
	title: {
		fontFamily: FONT_FAMILY_BOLD,
	},
	icon: {
		color: colors.primary,
		fontSize: 24,
		marginRight: 10,
	},
	editButton: {
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.primary,
		backgroundColor: colors.white,
		borderRadius: 10,
		marginHorizontal: 10,
		marginTop: 20,
	},
	dropdown: {
		borderRadius: 6,

		backgroundColor: colors.white,

		padding: 18,
	},
	detailView: {
		// backgroundColor: colors.green,
		gap: 8,
		marginTop: 20,
		// padding: 5,
	},
	detailValue: {
		color: colors.green,
		// margin: 5,
	},
	arrowRightIcon: {
		fontSize: 10,
		color: colors.primary,
	},
});
