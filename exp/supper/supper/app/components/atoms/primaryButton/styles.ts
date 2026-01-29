import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	shadow: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		bottom: -4,
		zIndex: -1,
		borderRadius: 10,
	},
	button: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		backgroundColor: colors.primary,
		flexDirection: 'row',
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
	},
	icon: {
		height: 20,
		width: 20,
		marginHorizontal: 6,
		resizeMode: 'contain',
		color: colors.primary,
	},
});

export default styles;
