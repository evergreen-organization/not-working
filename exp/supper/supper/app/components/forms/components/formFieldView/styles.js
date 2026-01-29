import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
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
	text: {
		flex: 1,
		paddingHorizontal: 5,
	},
});
