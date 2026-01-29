import React from 'react';
import GameBoard from './components/GameBoard';

export const WhackAMoleScreen = ({ navigation, route }) => {
	const { tile, type, currentBoard, position, questions, questionSession, isRetry } = route.params;
	return (
		<GameBoard
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
	);
};
