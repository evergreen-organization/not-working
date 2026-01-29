import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	subheading: { color: colors.secondaryFont },
	recommendedSection: { marginTop: 15 },
	headerContainer: { flexDirection: 'row', marginHorizontal: 30 },
	headerTextContainer: { flex: 8 },
	headerIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	headerIcon: { fontSize: 18, color: colors.primary },
	bookShelf: { paddingBottom: 20, paddingTop: 15, paddingHorizontal: 25 },
	bookCoverContainer: {
		marginHorizontal: 10,
		height: 150,
		width: 105,
		borderRadius: 20,
	},
	bookCover: { width: '100%', height: '100%', borderRadius: 20 },
	seeMoreButtonContainer: {
		marginHorizontal: 10,
		height: 170,
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
	},
	seeMoreIcon: { fontSize: 18, color: colors.primary, marginBottom: 3 },
	seeMoreText: { color: colors.primary, marginTop: 5 },
});
