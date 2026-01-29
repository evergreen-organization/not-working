import { colors } from 'configs';
import { screenWidth } from 'constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 1,
	},
	closeIcon: {
		color: colors.primary,
		fontSize: 25,
	},
	nextButton: {
		borderRadius: 5,
		marginHorizontal: screenWidth * 0.17,
	},
	container: {
		marginBottom: 20,
	},
	paginator: {
		gap: 6,
		marginTop: 20,
		marginBottom: 10,
	},
	dot: {
		width: 6,
	},
});

export default styles;
