import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	iconContainer: {
		width: 45,
		height: 45,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 80,
	},
	icon: { resizeMode: 'contain', width: 40, height: 40 },
	text: { color: colors.secondaryFont, marginTop: 8 },
	heading: { marginHorizontal: 30 },
	genresSection: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 10,
		marginBottom: 20,
		marginHorizontal: 30,
		backgroundColor: colors.white,
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
});
