import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerContainer: {
		paddingHorizontal: 10,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.white,
		paddingVertical: 10,
		justifyContent: 'space-between',
	},
	sectionName: { flex: 1 },
	productDetailContainer: {
		backgroundColor: colors.white,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		marginTop: -2,
	},
	addNewProductContainer: {
		paddingVertical: 5,
	},
	addButton: {
		marginHorizontal: 50,
		marginVertical: 20,
	},
	addIcon: { color: colors.white, width: 20, height: 20, tintColor: colors.white },
	addText: { color: colors.white, fontSize: 12 },
	borderLine: {
		borderBottomWidth: 2,
		borderRadius: 2,
		borderBottomColor: colors.primary,
		marginBottom: 10,
		marginHorizontal: 10,
	},
	emptyView: { alignItems: 'center', justifyContent: 'center' },
	emptyLottie: { height: 200, width: 200, alignSelf: 'center' },
	sectionNickname: { color: colors.secondaryFont, marginTop: 5 },
	footer: { height: 150 },
	arrow: { fontSize: 25 },
	emptyText: { textAlign: 'center' },
});
