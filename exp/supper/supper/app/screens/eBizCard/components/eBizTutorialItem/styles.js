import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		backgroundColor: colors.white,
		borderRadius: 6,
		marginTop: 24,
	},
	icon: {
		width: 24,
		height: 24,
		tintColor: colors.primary,
	},
	vwLabels: {
		flex: 1,
		marginHorizontal: 12,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	description: {
		fontSize: 12,
	},
	image: {
		width: 24,
		height: 24,
		marginLeft: 12,
		tintColor: colors.primary,
	},
});
