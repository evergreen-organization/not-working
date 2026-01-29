import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imgWidth = screenWidth / 2 - 50;
const imgHeight = imgWidth * 2;
export const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: '100%',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 20,
		overflow: 'hidden',
		borderRadius: 10,
		width: imgWidth,
		height: imgHeight,
	},
	lockIcon: {
		flex: 1,
		resizeMode: 'center',
		alignSelf: 'center',
		backgroundColor: '#FFFFFF80',
	},
});
