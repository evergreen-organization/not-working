import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	listItem: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	modalTitleView: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 5,
	},
	modalTitle: {
		color: colors.shadow,
	},
	searchView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchText: {
		paddingHorizontal: 20,
		height: 50,
	},
	searchIconView: {
		position: 'absolute',
		right: 0,
	},
	searchIcon: {
		width: 12,
		height: 12,
		tintColor: colors.shadow,
		marginHorizontal: 20,
	},
});
