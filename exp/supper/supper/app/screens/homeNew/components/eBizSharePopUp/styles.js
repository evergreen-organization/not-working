import { colors } from 'configs';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	shareContainer: {
		flexDirection: 'row',
	},

	popUpHeader: {
		paddingTop: 29,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		borderRadius: 6,
	},
	crossIcon: {
		fontSize: 32,
		color: colors.primary,
		borderRadius: 6,
	},
	popUpContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	crossIconContainer: {
		position: 'absolute',
		right: 0,
		top: 20,
	},
	buttonContent: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
	},
	buttonText: {
		color: colors.white,
		fontSize: 14,
		fontFamily: 'Montserrat-Bold',
	},
});
