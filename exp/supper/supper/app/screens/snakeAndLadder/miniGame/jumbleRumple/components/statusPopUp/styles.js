import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';
const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 60,
	},
	popup: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: colors.white,
		alignItems: 'center',
	},
	text: {
		marginTop: 10,
		textAlign: 'center',
	},
	img: {
		width: 70,
		height: 70,
		marginBottom: 10,
	},
	btn: {
		padding: 10,
		marginTop: 30,
		borderRadius: 8,
		backgroundColor: colors.primary,
	},
	imagePopupContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.9,
		height: height * 0.6,
		alignSelf: 'center',
		backgroundColor: 'black',
	},
	fullscreenImage: {
		width: '100%',
		height: '100%',
	},
});
