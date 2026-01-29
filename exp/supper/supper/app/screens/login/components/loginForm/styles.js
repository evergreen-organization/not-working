import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 60,
	},
	inputContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		borderRadius: 10,
		paddingVertical: 20,
		marginBottom: 80,
	},
	spacing20: { height: 20 },
	buttonContainer: {
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	signInBtn: {
		height: 55,
		width: 58,
		borderRadius: 30,
	},
	keyboardContainer: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#E1E1E1',
	},
	santa: {
		width: 100,
		height: 100,
		alignSelf: 'flex-end',
		marginRight: 60,
		marginVertical: -30,
		zIndex: 1,
	},
	signInButtonIcon: {
		color: colors.white,
		fontSize: 25,
	},
	formView: {
		flex: 1,
		justifyContent: 'center',
		zIndex: 1,
	},
	signInShadow: {
		borderRadius: 30,
	},
	signInButtonContainer: {
		marginTop: 10,
		height: 55,
		width: 58,
		flex: 0,
	},
});
