import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderTopColor: colors.medium,
		marginHorizontal: 20,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		paddingVertical: 12,
	},
	icon: {
		fontSize: 10,
		color: colors.primary,
		marginTop: 5,
	},
	pathView: {
		paddingBottom: 12,
	},
});
