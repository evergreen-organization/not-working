import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 24,
		paddingHorizontal: 12,
		backgroundColor: colors.white,
	},
	icon: {
		width: 24,
		height: 24,
		tintColor: colors.primary,
	},
	title: {
		fontSize: 14,
		marginLeft: 12,
	},
});
