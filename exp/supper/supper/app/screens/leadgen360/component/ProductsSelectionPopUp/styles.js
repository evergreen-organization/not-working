import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	title: { padding: 12, color: colors.secondaryFont },
	titleView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
	},
	infoIcon: {
		width: 20,
		height: 20,
		tintColor: colors.primary,
	},
	infoText: {
		color: colors.primary,
		paddingHorizontal: 10,
	},
	productListView: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemText: {
		flex: 1,
		marginLeft: 8,
	},
});
