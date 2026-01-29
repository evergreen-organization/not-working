import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
	},
	titleContainer: {
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		marginBottom: 20,
	},
	pinContainer: {
		width: '60%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	errorText: {
		color: colors.red,
		textAlign: 'center',
		marginBottom: 20,
		marginHorizontal: 20,
	},
	pin: {
		borderWidth: 2,
		borderColor: '#555',
	},
	filledPin: {
		backgroundColor: '#555',
	},
});
