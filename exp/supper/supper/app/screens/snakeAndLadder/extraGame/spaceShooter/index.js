// SpaceShooterWrapper.js
import React from 'react';
import { SpaceShooter } from './App';
import { useSelector } from 'react-redux';
import { getGame } from 'stores';

export const SpaceShooterWrapper = ({ navigation, route }) => {
	const { tile, type, currentBoard, position, questions, questionSession, isRetry } = route.params;
	const { campaignId } = useSelector(getGame);
	const questionId = questions[0]?.questionId;

	return (
		<SpaceShooter
			navigation={navigation}
			route={route}
			tile={tile}
			type={type}
			currentBoard={currentBoard}
			position={position}
			campaignId={campaignId}
			questionId={questionId}
			questionSession={questionSession}
			isRetry={isRetry}
		/>
	);
};
