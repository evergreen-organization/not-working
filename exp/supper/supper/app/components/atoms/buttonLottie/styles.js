import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	faceIdBtn: {
		backgroundColor: colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		width: 55,
		height: 55,
		borderRadius: 50,
		marginRight: '3%',
	},
	lottieImage: {
		width: 50,
		height: 50,
	},
	button: {
		height: 56,
		width: 56,
		borderRadius: 27,
		flex: 0,
	},
	buttonShadow: {
		borderRadius: 27,
	},
});
