import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: { flexDirection: 'row', paddingVertical: 12 },
	iconContainer: { marginRight: 20, marginTop: 3 },
	icon: { color: colors.primary, fontSize: 20 },
	extraIconContainer: {
		marginLeft: 15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 10,
		width: 40,
		height: 40,
	},
	extraIcon: {
		width: 22,
		height: 22,
		tintColor: colors.primary,
	},
	flex: { flex: 1 },
	title: { marginBottom: 5 },
	subtitle: { color: colors.secondaryFont },
	reload: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	reloadIcon: { color: colors.primary, fontSize: 25 },
});
