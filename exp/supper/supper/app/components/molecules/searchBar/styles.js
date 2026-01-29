import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		height: 40,
		borderRadius: 50,
		marginVertical: 8,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
		marginTop: 24,
		marginBottom: 24,
	},

	inputContainer: {
		flex: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 20,
		flexDirection: 'row',
	},
	input: { flex: 10, fontSize: 14, fontFamily: 'Montserrat-Regular' },
	clearButton: {
		flex: 1,
		marginHorizontal: 10,
		backgroundColor: '#dbdbdb',
		borderRadius: 50,
		width: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clearButtonText: { color: colors.white },
	iconContainer: {
		backgroundColor: colors.primary,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
	},
	icon: { fontSize: 20, color: colors.white },
});
