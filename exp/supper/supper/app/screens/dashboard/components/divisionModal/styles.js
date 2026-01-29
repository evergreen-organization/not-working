import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	title: {
		paddingHorizontal: 20,
	},
	staffView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	titleView: {
		paddingVertical: 12,
	},
});
