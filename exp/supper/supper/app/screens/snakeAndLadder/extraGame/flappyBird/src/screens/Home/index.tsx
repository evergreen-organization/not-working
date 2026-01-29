import React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';
import BACKGROUND from '../../assets/images/background-dog.png';
import { Game } from './Game';

export const FlappyBird = ({ navigation, route }) => {
	const { tile, type, currentBoard, position, questions, questionSession, isRetry } = route.params;
	return (
		<ImageBackground source={BACKGROUND} style={styles.container}>
			<Game
				navigation={navigation}
				route={route}
				tile={tile}
				type={type}
				currentBoard={currentBoard}
				position={position}
				questions={questions}
				questionSession={questionSession}
				isRetry={isRetry}
			/>
		</ImageBackground>
	);
};
