import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	cancelBtn: {
		alignSelf: 'flex-end',
		padding: 15,
	},
	icon: {
		width: 14,
		height: 14,
		tintColor: colors.primary,
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: 25,
	},
	title: {
		fontSize: 14,
	},
	pinContainer: {
		width: '60%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	errorText: {
		fontSize: 14,
		color: colors.red,
		marginBottom: 8,
		marginHorizontal: 20,
	},
	pin: {
		width: 12,
		height: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: colors.medium,
	},
	filledPin: {
		backgroundColor: colors.medium,
	},
	pinView: { marginBottom: 15, alignItems: 'center' },
});
