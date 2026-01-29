import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	resultContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 10,
		maxHeight: 240,
		marginHorizontal: 10,
	},
	resultButton: {
		flexDirection: 'row',
		height: 55,
		paddingLeft: 8,
	},
	resultIcon: {
		fontSize: 22,
		color: colors.primaryFont,
	},
	searchTextView: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 8,
		paddingRight: 10,
	},
	searchDistanceView: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 10,
	},
	searchData: {
		color: colors.primaryFont,
	},
	searchDescription: {
		color: colors.secondaryFont,
		paddingTop: 5,
	},
	noResultView: {
		height: 44,
		justifyContent: 'center',
	},
	noResult: {
		color: colors.oldLavender,
		paddingHorizontal: 10,
	},
	distance: {
		color: colors.primaryFont,
	},
	kmAway: {
		color: colors.secondaryFont,
	},
});
