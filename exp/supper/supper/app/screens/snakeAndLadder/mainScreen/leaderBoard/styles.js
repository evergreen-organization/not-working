import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
	},
	header: { marginTop: 120, marginBottom: 140 },
	myScoreHeader: { position: 'absolute', left: 0, right: 0 },
	crown: {
		width: 80,
		height: undefined,
		aspectRatio: 1.3,
		alignSelf: 'center',
	},
	vBtn: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
	btnGoBack: {
		position: 'absolute',
		right: 20,
		zIndex: 10,
	},
	btnGoBackImg: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
	title: {
		width: undefined,
		height: 45,
		aspectRatio: 6,
		alignSelf: 'center',
		marginTop: 8,
	},
	rankingIs: {
		width: undefined,
		height: 35,
		aspectRatio: 6,
		alignSelf: 'center',
		marginTop: 8,
	},

	yourRankingText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.white,
		flex: 1,
		textAlign: 'center',
	},

	ownRankingContainer: {
		flexDirection: 'row',
		position: 'absolute',
		left: 20,
		right: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	ownRankingView: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		width: 200,
		padding: 15,
	},

	rankingView: {
		backgroundColor: '#FFFFFFE6',
		marginHorizontal: 25,
		marginVertical: 5,
		padding: 18,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 0,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 8,
		marginBottom: 20,
	},
	numberText: {
		color: '#FFD700',
		textShadowColor: '#000',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		fontWeight: 'bold',
		fontSize: 20,
		marginRight: 8,
	},
	rankView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rankText: {
		flex: 0,
		fontWeight: 'bold',
		fontSize: 16,
	},
	nameText: {
		flex: 1,
		textAlign: 'center',
	},
	list: {
		marginBottom: 100,
	},

	disclaimerWrapper: {
		backgroundColor: '#E30B5D', // raspberry color
		marginHorizontal: 20,
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
	},
	disclaimer: {
		color: 'white',
		fontSize: 12,
		textAlign: 'center',
		fontWeight: 'bold',
	},
});
