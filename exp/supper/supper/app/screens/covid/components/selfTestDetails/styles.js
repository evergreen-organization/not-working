import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderTopWidth: 0.33,
		borderTopColor: '#D8D8D8',
		zIndex: 111,
		flexDirection: 'row',
		height: 90,
		alignItems: 'center',
	},
	button: {
		paddingTop: 20,
		alignItems: 'center',
		height: '100%',
		flex: 1,
	},
	label: {
		color: colors.white,
	},
	view: {
		backgroundColor: colors.white,
		alignSelf: 'center',
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	detailView: {
		backgroundColor: '#FAFAFA',
		paddingVertical: 10,
		borderRadius: 10,
		margin: 10,
	},
	imageContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	background: {
		width: width * 0.9,
		height: width * 0.9,
		backgroundColor: colors.white,
		alignSelf: 'center',
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
