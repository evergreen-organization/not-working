import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: { flex: 1 },
	engineContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	scoreText: {
		fontFamily: 'Flappy Bird',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 50,
		color: '#fff',
		marginTop: 70,
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
});
