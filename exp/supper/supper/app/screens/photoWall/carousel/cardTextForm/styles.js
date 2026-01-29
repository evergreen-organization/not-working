import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	input: {
		backgroundColor: colors.border,
		borderRadius: 8,
		height: 100,
		fontSize: 14,
		fontFamily: 'Montserrat-Regular',
		marginTop: 10,
		borderBottomWidth: 0,
		padding: 5,
		textAlignVertical: 'top',
	},
	background: {
		backgroundColor: colors.white,
		flex: 1,
		paddingHorizontal: 20,
	},
});
