import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	cancelBtn: {
		padding: 15,
		position: 'absolute',
		right: 0,
		zIndex: 1,
		top: 0,
	},
	cancelIcon: {
		width: 14,
		height: 14,
		tintColor: colors.primary,
	},
	errorText: {
		fontSize: 14,
		color: colors.red,
		marginBottom: 8,
		marginHorizontal: 20,
	},
	titleView: { paddingHorizontal: 20, paddingVertical: 10 },
	pacView: {
		backgroundColor: colors.primary,
		padding: 10,
		alignSelf: 'flex-start',
		marginTop: 15,
	},
	pacText: { color: colors.white },
	inputView: { marginHorizontal: 20, marginBottom: 20 },
	input: { flex: 0, fontSize: 25, height: 55 },
});
