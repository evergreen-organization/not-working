import { StyleSheet } from 'react-native';
import { getImageHeight, getImageWidth, getTopShift } from 'screens/photoWall/utils';

export const styles = StyleSheet.create({
	question: {
		alignItems: 'center',
		// marginVertical: 10,
	},
	answerBackgroundImage: {
		width: '100%',
		height: '100%',
	},
	answerContainer: {
		marginVertical: 10,
		margin: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
	selectedWordContainer: {
		flexDirection: 'row',
		padding: 10,
		borderRadius: 10,
	},
	alphaContainer: {
		borderWidth: 5,
		borderColor: 'purple',
		backgroundColor: '#FFF',
		margin: 1,
		borderRadius: 10,
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wordContainer: {
		maxWidth: '100%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginBottom: 10,
	},
	underlineTitle: {
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	bottom: {
		alignItems: 'center',
		borderTopWidth: 0,
		marginBottom: 0,
		backgroundColor: 'transparent',
		paddingTop: 10,
		maxHeight: '50%',
	},
	bottomEndView: {
		flexDirection: 'row',
		padding: 10,
	},
	manView: {
		marginBottom: getTopShift(80),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	manImage: {
		width: getImageWidth(180),
		height: getImageWidth(280),
	},
	lanternImage: {
		width: getImageWidth(180),
		height: getImageWidth(280),
		transform: [{ scaleX: -1 }],
	},
	homeView: {
		alignSelf: 'center',
		marginTop: getTopShift(20),
	},
	homeIcon: {
		width: 60,
		height: 60,
	},
	box: {
		height: getImageWidth(180),
		width: getImageWidth(180),
		alignItems: 'center',
		justifyContent: 'center',
	},
	endText: {
		textAlign: 'center',
		marginTop: getTopShift(10),
		marginHorizontal: 10,
		fontSize: getImageHeight(14),
		fontWeight: 'bold',
	},
	endView: {
		alignItems: 'center',
	},
	scroll: {
		alignItems: 'center',
	},
	fullScreenOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.8)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 9999,
	},
	fullScreenImage: {
		resizeMode: 'contain',
	},
	textStyle: { color: '#fff' },
});
