import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentStyle: {
		padding: 24,
	},
	lblDescription: { fontSize: 14 },
	space: {
		height: 24,
	},
	dropDownView: {
		backgroundColor: colors.white,
		borderBottomWidth: 1,
		borderColor: colors.lightGrey,
		// marginBottom: 8,
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		// marginHorizontal: 8
	},
	dropDownTitle: {
		// marginTop: 5,
	},
	search: {
		borderRadius: 0,
		backgroundColor: colors.white,
	},

	icon: {
		color: colors.primary,
		fontSize: 30,
	},
	leftIcon: {
		// width: 30,
		paddingLeft: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightIcon: {
		// width: 30,
		paddingRight: 30,
	},
});
