import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	background: {
		backgroundColor: colors.background,
		flex: 1,
		paddingHorizontal: 12,
	},
	chipView: {
		flexDirection: 'row',
		// marginTop: 10,
		flexWrap: 'wrap',
	},
	prospectsListView: {
		marginTop: 20,
	},
	chip: {
		marginTop: 10,
		marginHorizontal: 5,
	},
	chipSubtitle: { fontWeight: 'bold' },
});
