import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const screenWidth = Dimensions.get('window').width;
const imgWidth = screenWidth / 2 - 50;
const imgHeight = imgWidth * 2;
export const styles = StyleSheet.create({
	title: {
		color: colors.white,
		textAlign: 'center',
	},
	galleryViewList: {
		flexDirection: 'row',
		marginRight: 20,
	},
	titleView: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 4,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#39BECA',
		borderRadius: 5,
		marginLeft: 20,
		alignSelf: 'flex-start',
	},
	icon: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
		// marginRight: 10,
	},
	background: {
		position: 'absolute',
		// width: '100%',
		// height: '100%',
		opacity: 1,
	},
	image: {
		width: imgWidth,
		height: imgHeight,
		marginLeft: 20,
		borderRadius: 10,
	},
	container: {
		marginVertical: 10,
	},
	iconContainer: {
		backgroundColor: colors.white,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		marginRight: 10,
	},
	titleImage: {
		width: 250,
		height: 60,
		marginLeft: 10,
		resizeMode: 'contain',
		alignSelf: 'flex-start',
	},
});
