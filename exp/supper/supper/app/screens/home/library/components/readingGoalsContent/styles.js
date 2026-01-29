import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	loadingLottie: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 5,
		aspectRatio: 1,
	},
	unavailableContainer: { alignItems: 'center', marginTop: 40 },
	unavailableSubtext: {
		color: colors.secondaryFont,
		marginTop: 3,
	},
	container: {
		backgroundColor: colors.white,
		paddingHorizontal: 30,
		paddingBottom: 20,
	},
	itemTitle: { fontSize: 12, marginRight: 80 },
	itemAuthor: { fontFamily: 'Montserrat-Italic', fontSize: 11, marginTop: 3 },
	checkbox: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		height: 22,
		width: 22,
		borderRadius: 100,
		borderColor: colors.primary,
	},
	checkboxContainer: { justifyContent: 'center' },
	checkboxIcon: { fontSize: 14, color: colors.tertiary },
	deleteButton: {
		backgroundColor: colors.error,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	deleteIcon: { fontSize: 22, color: colors.babyPowder },
	itemContainer: {
		backgroundColor: colors.white,
		flexDirection: 'row',
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	hiddenItemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		minWidth: 70,
	},
	deleteButtonContainer: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 50,
		borderRadius: 10,
		marginVertical: 10,
		backgroundColor: colors.error,
		right: 0,
	},
});
