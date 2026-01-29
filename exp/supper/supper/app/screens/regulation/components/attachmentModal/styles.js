import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	icon: {
		fontSize: 30,
		color: colors.primary,
	},
	button: {
		marginBottom: 20,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
	},
	list: {
		marginBottom: 10,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 0,
		paddingVertical: 0,
		backgroundColor: 'red',
	},
	buttonText: {
		marginHorizontal: 20,
		textAlignVertical: 'center',
	},
	container: {
		padding: 20,
		flexDirection: 'column',
	},
	view: {
		width: '100%',
	},
});
