import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: 20,
		paddingVertical: 12,
		marginBottom: 40,
		marginTop: 20,
	},
	topic: {
		fontSize: 15,
		marginBottom: 20,
	},
	title: {
		fontSize: 14,
		marginTop: 20,
		marginBottom: 8,
	},
	desc: {
		color: colors.secondaryFont,
		marginBottom: 10,
	},
	flex: { flex: 1 },
	icon: {
		width: 25,
		height: 25,
		tintColor: colors.primary,
	},
	list: { paddingHorizontal: 0 },
});
