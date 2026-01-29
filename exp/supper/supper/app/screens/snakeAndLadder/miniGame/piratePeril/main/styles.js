import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
	header: {},

	backgroundImage: {
		resizeMode: 'stretch',
	},

	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		marginBottom: 300,
	},
	bottom: {
		backgroundColor: 'transparent',
		borderTopWidth: 0,
	},
	transparentBottom: {
		backgroundColor: 'transparent',
		borderTopWidth: 0,
	},

	homeButton: {
		alignSelf: 'flex-end',
		marginRight: 30,
	},
	homeIcon: {
		width: 50,
		height: 50,
	},
	lostView: {
		alignItems: 'center',
		marginTop: 50,
	},
	lostHomeIcon: {
		width: 70,
		height: 70,
	},
	lostText: {
		fontSize: 70,
		fontWeight: 'bold',
	},
	gameOverImage: {
		maxWidth: width * 0.6,
		resizeMode: 'contain',
	},

	hintScrollContainer: {
		maxHeight: 100, // Adjust based on your layout
		width: '100%',
		marginBottom: 10,
	},

	hintBoxImage: {
		resizeMode: 'stretch',
		width: '100%',
		borderRadius: 12,
	},

	hintInnerContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		paddingHorizontal: 18,
	},

	hint: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 14,
	},

	guessBoxSection: {
		// backgroundColor:'red',
		alignItems: 'center',
		justifyContent: 'center',
	},

	container: {
		flex: 1,
		justifyContent: 'space-between',
	},

	topSection: {
		paddingHorizontal: 16,
		paddingBottom: 10,
	},

	scroll: {
		flex: 1,
	},

	scrollContent: {
		paddingBottom: 20,
	},

	bottomSection: {
		// No need for styles if using BottomView
	},

	background: {
		flex: 1,
		width: '100%',
	},

	hintBoxBackground: {
		width: '100%',
		borderRadius: 12,
		overflow: 'hidden',
		paddingVertical: 18,
		marginBottom: 10,
	},

	keyboardView: {
		marginBottom: 10,
	},
});
