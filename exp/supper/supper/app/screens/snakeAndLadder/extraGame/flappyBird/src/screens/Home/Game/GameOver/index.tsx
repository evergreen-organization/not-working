import { View, Image } from 'react-native';
import { styles } from './styles';
import GAME_OVER from '../../../../assets/images/game-over.png';
import { PrimaryButton, Text } from 'atoms';

const GameOver = ({ handlebackToStart, score }) => {
	return (
		<View style={styles.container}>
			<Image source={GAME_OVER} style={styles.logo} />
			<Text style={[styles.score, { marginTop: 10 }]}>Score</Text>
			<Text style={styles.score}>{score}</Text>
			<Text style={[styles.score, { marginTop: 10 }]}>Best</Text>
			<Text style={styles.score}>{score}</Text>
			<PrimaryButton
				fill={false}
				title="Try Again"
				onPress={handlebackToStart}
				style={{ marginTop: 20 }}
				titleStyle={{ fontFamily: 'Flappy Bird', fontSize: 25, color: '#fff' }}
			/>
		</View>
	);
};

export { GameOver };
