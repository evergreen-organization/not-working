import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	widgetContainer: {
		marginHorizontal: 30,
		marginTop: 15,
		marginBottom: 30,
	},
	contentHeaderContainer: {
		marginBottom: 15,
		marginHorizontal: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	addButtonContainer: { flexDirection: 'row' },
	modalContainer: {
		paddingHorizontal: 25,
		paddingVertical: 20,
	},
	contentSubHeading: {
		color: colors.primary,
	},
	contentContainer: { flex: 1 },
	addIcon: {
		fontSize: 16,
		color: colors.primary,
	},
	inputContainer: {
		backgroundColor: colors.lightGrey,
		borderRadius: 10,
		height: 40,
		justifyContent: 'center',
		paddingHorizontal: 15,
		marginTop: 5,
		marginBottom: 10,
	},
	input: { fontFamily: 'Montserrat-Regular' },
	inputLabel: { fontSize: 13 },
	addReadingGoalButton: {
		marginHorizontal: 0,
		marginTop: 15,
	},
});
