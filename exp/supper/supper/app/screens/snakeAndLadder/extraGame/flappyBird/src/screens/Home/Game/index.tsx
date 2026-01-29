import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GameEngine } from 'react-native-game-engine';

import { Physics } from '../../../utils/physics';
import entities from '../../../entities';

import { Text } from 'atoms';
import { View } from 'react-native';
import { routes } from 'navigations';

import { BingoReadingLose } from 'screens/snakeAndLadder/miniGame/magicReading/readingLose/component';
import { BingoReadingWin } from 'screens/snakeAndLadder/miniGame/magicReading/readingWin/component';

import { getGame } from 'stores';
import { PBDASH_SOUND, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { GAME_TYPE } from 'screens/snakeAndLadder/constant/constant';

import { styles } from './styles';

const Game = ({
	navigation,
	tile,
	route,
	type,
	currentBoard,
	position,
	questions,
	questionSession,
	isRetry,
}) => {
	const { isMusicOn, campaignId } = useSelector(getGame);

	const [isRunning, setIsRunning] = useState(true);
	const [isGameOver, setIsGameOver] = useState(false);
	const [score, setScore] = useState(0);

	const gameEngineRef = useRef();
	const hasEndedRef = useRef(false);

	usePBDashSound({ sound: PBDASH_SOUND.FLAPPYBIRD_SOUND, isMusicOn });

	useEffect(() => {
		if (isRetry) {
			setIsRunning(true);
			setIsGameOver(false);
			setScore(0);
			hasEndedRef.current = false;
		}
	}, [isRetry]);

	const handleOnGameOver = () => {
		setIsRunning(false);
		setIsGameOver(true);
		if (!hasEndedRef.current) {
			hasEndedRef.current = true;
		}
	};

	const handleOnEvent = (event) => {
		switch (event.type) {
			case 'game_over':
				handleOnGameOver();
				break;
			case 'score':
				setScore((prev) => prev + 1);
				break;
		}
	};

	if (!isRunning && isGameOver && score < 3) {
		return (
			<BingoReadingLose
				type={type}
				tile={tile}
				navigation={navigation}
				currentBoard={currentBoard}
				position={position}
				endGameParams={{
					isWin: false,
					campaignId,
					gameType: GAME_TYPE.GAME,
					questionSession: questionSession || '',
					answers: [{ questionId: questions[0]?.questionId, answer: 1 }],
				}}
				onCancel={async () => {
					await route.params?.onDone?.(false);
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	} else if (!isRunning && isGameOver && score >= 3) {
		return (
			<BingoReadingWin
				type={type}
				tile={tile}
				navigation={navigation}
				currentBoard={currentBoard}
				endGameParams={{
					isWin: true,
					campaignId,
					gameType: GAME_TYPE.GAME,
					questionSession: questionSession || '',
					answers: [{ questionId: questions[0]?.questionId, answer: 0 }],
				}}
				onCancel={async () => {
					await route.params?.onDone?.(true);
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<GameEngine
				systems={[Physics]}
				ref={gameEngineRef}
				running={isRunning}
				entities={entities()}
				onEvent={handleOnEvent}
				style={styles.engineContainer}
			/>
			<Text style={styles.scoreText}>{score}</Text>
		</View>
	);
};

export { Game };
