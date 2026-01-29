import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	addNewProductContainer: {
		backgroundColor: colors.primary,
		margin: 20,
		marginHorizontal: 30,
		paddingHorizontal: 20,
		paddingVertical: 8,
		flexDirection: 'row',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addIcon: { fontSize: 25, color: colors.white },
	addText: { color: colors.white, fontWeight: 'bold', fontSize: 13 },
	background: {
		// paddingHorizontal: 20,
		backgroundColor: colors.white,
		paddingTop: 10,
		flex: 1,
	},
	skipIcButton: {
		alignItems: 'center',
		marginTop: 20,
	},
	skipText: {
		color: colors.primary,
		textDecorationLine: 'underline',
	},
	flex: {
		flex: 1,
	},
});
