import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
	timerFrame: {
		width: 200,
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
	timerText: {
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
		color: 'orange',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	questionContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		padding: 30,
		margin: 20,
		width: width * 0.8,
		alignItems: 'center',
		height: 400,
		justifyContent: 'center',
	},
	title: {
		textShadowColor: '#FE259B',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontSize: 25,
		color: 'orange',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 20,
	},
	questionText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 10,
		color: colors.black,
		textAlign: 'center',
	},

	answerView: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	answerButton: {
		color: '#FE259B',
		marginVertical: 5,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: colors.white,
		textAlign: 'left',
	},
	tv: {
		width: 150,
		height: 150,
	},
	sparkling: {
		width: 200,
		height: 150,
		position: 'absolute',
		top: 15,
	},
	neonLine: {
		width: 140,
		aspectRatio: 1.5,
		height: undefined,
		position: 'absolute',
		bottom: -30,
		right: -20,
		alignSelf: 'flex-end',
	},
	successContainer: {
		backgroundColor: '#FFFFFF99',
		borderRadius: 10,
		padding: 30,
		margin: 20,
		width: width * 0.8,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	dog: {
		width: 200,
		height: 200,
	},
	congratsText: {
		textShadowColor: '#FFFFFF',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontSize: 22,
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10,
	},
	star: {
		width: 120,
		height: 120,
	},
	finish: {
		alignSelf: 'center',
		width: 100,
		height: 100,
		justifyContent: 'center',
		marginTop: 20,
	},
	completeButtonText: {
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		fontSize: 25,
	},
	firework: {
		width: 400,
		height: 400,
		position: 'absolute',
		// top: 15,
	},
	bomb: {
		width: width * 0.8,
		height: 400,
		borderRadius: 10,
	},
	goodTrySticker: {
		width: 200,
		height: 200,
		marginBottom: -80,
		zIndex: 99,
	},
	goodTryText: {
		textShadowColor: '#FFFFFF',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontSize: 80,
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10,
	},
	questionFrame: {
		overflow: 'hidden',
		paddingHorizontal: 10,
		margin: 20,
		width: width * 0.9,
		height: undefined,
		aspectRatio: 0.8,
	},
	header: {
		position: 'absolute',
		zIndex: 99,
	},
	timerWrapper: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},

	correctAnswerIcon: {
		position: 'absolute',
		right: -20,
		top: 10,
		width: 50,
		height: 50,
		resizeMode: 'contain',
	},
	wrongAnswerIcon: {
		position: 'absolute',
		right: -25,
		top: 10,
		width: 70,
		height: 70,
		resizeMode: 'contain',
	},
	optionImageButton: {
		width: width * 0.85, // ← Constrain width
		paddingHorizontal: 20,
		paddingVertical: 15,
		justifyContent: 'center',
		// alignItems: 'center',
		marginVertical: 8,
		resizeMode: 'stretch',
	},

	optionText: {
		fontSize: 16,
		color: '#000',
		fontWeight: 'bold',
	},

	scroll: {
		width: '100%',
	},

	scrollContent: {},
	correctWrongImage: {
		width: 100, // adjust as needed
		height: 100,
		alignSelf: 'center',
		marginTop: 100,
	},
});
