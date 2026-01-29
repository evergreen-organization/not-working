import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.eerieBlack,
	},
	iconContainer: {
		position: 'absolute',
		right: 10,
		color: colors.white,
		zIndex: 10,
	},
	icon: {
		fontSize: 40,
		color: colors.white,
	},
	pageIndicator: { color: colors.white },
});

export default styles;
