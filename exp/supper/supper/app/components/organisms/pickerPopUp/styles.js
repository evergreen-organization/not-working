import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	textInput: {
		height: 45,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.medium,
		flexDirection: 'row',
		backgroundColor: colors.background,
		borderRadius: 5,
		marginTop: 10,
	},
	icon: {
		fontSize: 20,
		color: colors.primary,
		marginRight: 5,
	},
	displayAll: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	displayAllText: {
		fontSize: 14,
		color: colors.secondaryFont,
	},
	modalView: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 5,
	},
	label: {
		fontSize: 13,
		color: colors.shadow,
	},
	row: { flexDirection: 'row', alignItems: 'center' },
	searchText: { paddingHorizontal: 20, height: 50 },
	searchIcon: {
		width: 12,
		height: 12,
		tintColor: colors.shadow,
		marginHorizontal: 20,
	},
	itemButton: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
});
