import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
	},
	formContainer: {
		marginVertical: 10,
		marginHorizontal: 20,
	},
	iconView: { paddingHorizontal: 5 },
	icon: {
		fontSize: 22,
		color: colors.primary,
	},
	input: { flexDirection: 'row', alignItems: 'center' },
});
