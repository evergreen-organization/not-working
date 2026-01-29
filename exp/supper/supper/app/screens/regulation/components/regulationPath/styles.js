import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		flex: 1,
	},
	icon: {
		fontSize: 15,
		color: 'lightgrey',
		textAlign: 'center',
	},
	flex: {
		flex: 1,
	},
	view: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		width: '85%',
		justifyContent: 'center',
		padding: 5,
		alignItems: 'center',
		backgroundColor: '#F1F1F1',
		borderRadius: 10,
	},
	text: {
		textAlign: 'center',
		textAlignVertical: 'center',
		width: '100%',
	},
});
