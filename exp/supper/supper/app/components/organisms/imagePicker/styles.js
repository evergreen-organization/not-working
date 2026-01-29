import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
	view: {
		width: window.width * 0.9,
		height: window.width * 0.9,
		backgroundColor: colors.white,
		alignSelf: 'center',
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonView: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	overlay: {
		position: 'absolute',
		backgroundColor: '#00000060',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	resetText: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
	},
	defaultImage: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholder: {
		color: colors.white,
	},
});
