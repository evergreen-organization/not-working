import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	view: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	button: {
		width: 150,
		height: 150,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		resizeMode: 'cover',
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlay: {
		position: 'absolute',
		backgroundColor: '#00000060',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	uploadText: {
		fontSize: 14,
		color: colors.white,
	},
	resetText: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
	},
});
