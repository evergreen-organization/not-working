import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 230,
		height: 60,
	},
	playButton: {
		marginTop: 32,
		width: 120,
		height: 74,
	},
	score: {
		fontFamily: 'Flappy Bird',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 30,
		color: '#fff',
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
});
