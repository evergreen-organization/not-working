import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	view: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	cancelButton: {
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 10,
		minHeight: 50,
		maxHeight: 60,
		marginHorizontal: 8,
	},
	cancelText: {
		color: colors.black,
		backgroundColor: colors.white,
		fontSize: 13,
	},
	submitButton: {
		flex: 1,
		backgroundColor: colors.secondary,
		borderRadius: 10,
		flexWrap: 'wrap',
		minHeight: 50,
		maxHeight: 60,
	},
	submitText: {
		color: colors.black,
		backgroundColor: colors.secondary,
		fontSize: 13,
	},
});
