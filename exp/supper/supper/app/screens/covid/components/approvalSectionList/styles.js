import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	notice: {
		textAlign: 'center',
		color: colors.secondaryFont,
		marginVertical: 12,
	},
	sectionHeader: {
		alignItems: 'center',
		backgroundColor: colors.background,
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	outer: {
		paddingHorizontal: 20,
		backgroundColor: colors.white,
	},
	btn: {
		flex: 1,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	desc: {
		color: colors.black,
	},
	empty: {
		backgroundColor: colors.white,
		marginTop: 10,
		paddingVertical: 20,
	},
	emptyText: {
		color: colors.medium,
		textAlign: 'center',
	},
	staffName: {
		color: colors.black,
		flex: 1,
	},
});
