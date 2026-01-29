import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	title: {
		color: colors.primaryFont,
		marginBottom: '2%',
	},
	toggleBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	toggleTitle: {
		color: colors.primary,
		paddingRight: 8,
	},
	icon: {
		fontSize: 22,
		color: colors.primary,
	},
	textInputContainer: {
		flexDirection: 'row',
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: '#999',
		fontSize: 16,
	},
	textInput: {
		fontFamily: 'Montserrat-Regular',
		color: colors.primaryFont,
		height: '100%',
		marginLeft: '3%',
		borderBottomWidth: 0,
	},
	lblValue: { marginLeft: '3%' },
	input: { flex: 1, justifyContent: 'center' },
});
