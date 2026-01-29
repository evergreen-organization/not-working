import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	reasonModalContainer: {
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	inputContainer: {
		height: 120,
		backgroundColor: colors.secondary,
		borderRadius: 10,
		marginTop: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginVertical: 10,
	},
	text: { fontFamily: 'Montserrat-Regular', height: 100 },
});
