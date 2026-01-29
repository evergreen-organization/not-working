import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerFont: {
		fontSize: 15,
		color: colors.eerieBlack,
	},
	headerContainer: {
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerDivider: {
		borderColor: colors.primary,
		flex: 1,
		borderWidth: 2,
		margin: 10,
	},
	container: {
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	menuContainer: {
		padding: 10,
		borderRadius: 10,
	},
	menuRowContainer: {
		flexDirection: 'row',
	},
	menuItemContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
		backgroundColor: colors.white,
		borderRadius: 15,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	icon: {
		width: 35,
		height: 35,
		tintColor: colors.primary,
	},
	text: {
		paddingTop: 10,
		textAlign: 'center',
		color: colors.secondaryFont,
	},
});
