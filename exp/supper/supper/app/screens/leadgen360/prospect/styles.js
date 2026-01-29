import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	search: { backgroundColor: colors.white },
	background: { backgroundColor: colors.background, flex: 1 },
	heading: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
	},
	icon: {
		width: 35,
		height: 20,
		tintColor: colors.primary,
	},
	sortButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headingText: { marginVertical: 20 },
	sortText: { marginRight: 5 },
	view: { marginHorizontal: 20 },
});
