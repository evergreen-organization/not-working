import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	textInput: {
		height: 45,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.medium,
		flexDirection: 'row',
		backgroundColor: colors.background,
		borderRadius: 5,
		marginTop: 10,
	},
	icon: {
		fontSize: 20,
		color: colors.primary,
		marginRight: 5,
	},
	selectionButtonView: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	mandatoryText: { color: colors.red, marginLeft: 5 },
	fieldText: {
		flex: 1,
		paddingHorizontal: 5,
		fontSize: 14,
	},
	selectionButtonModalView: { paddingHorizontal: 20 },
});
