import { colors } from 'configs';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: width * 0.05,
		width: '100%',
		zIndex: 10,
	},
	contentContainer: {
		width: '100%',
		zIndex: 11,
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.modalBackdrop,
		zIndex: 10,
	},
	line: {
		height: 4,
		width: 75,
		backgroundColor: colors.lightGrey,
		alignSelf: 'center',
		marginVertical: 10,
	},
});

export default styles;
