import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	eLibrarySection: {
		flexDirection: 'row',
		marginHorizontal: 30,
		marginTop: 10,
		marginBottom: 20,
	},
	eLibraryTitle: {
		color: colors.secondaryFont,
		textAlign: 'center',
	},
	eLibraryLeftItemContainer: { flex: 1, marginRight: 8 },
	eLibraryRightItemContainer: { flex: 1, marginLeft: 8 },
	eLibraryItemView: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		alignItems: 'center',
	},
	heading: { marginHorizontal: 30 },
	icon: {
		resizeMode: 'contain',
		width: 35,
		height: 35,
		marginBottom: 12,
	},
});
