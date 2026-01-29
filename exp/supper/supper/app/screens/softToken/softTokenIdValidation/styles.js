import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 25,
	},
	btn: {
		alignSelf: 'flex-start',
		paddingVertical: 5,
		marginTop: -5,
	},
	helpText: {
		fontSize: 14,
		color: colors.medium,
		marginBottom: 5,
	},
	radioBtn: {
		flexDirection: 'row',
		paddingVertical: 10,
	},
	buttonSubmit: {
		marginHorizontal: -20,
	},
	inputIC: {
		fontSize: 20,
		height: 55,
	},
	labelMoreInfo: {
		fontSize: 13,
		color: colors.primary,
	},
});
