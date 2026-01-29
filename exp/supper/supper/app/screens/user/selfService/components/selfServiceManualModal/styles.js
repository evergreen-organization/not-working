import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	inputLabel: {
		fontSize: 13,
		color: colors.black,
	},
	inputContainer: {
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
		marginBottom: 12,
		height: 40,
	},
	input: {
		fontFamily: 'Montserrat-Regular',
		fontSize: 13,
		height: '100%',
		paddingHorizontal: 10,
	},
	button: {
		marginVertical: 10,
		marginBottom: 20,
		alignItems: 'flex-end',
	},
});
