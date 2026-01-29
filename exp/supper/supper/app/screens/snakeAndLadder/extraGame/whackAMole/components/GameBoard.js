import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import Square from './Square.js';
import { BingoReadingWin } from 'screens/snakeAndLadder/miniGame/magicReading/readingWin/component';
import { BingoReadingLose } from 'screens/snakeAndLadder/miniGame/magicReading/readingLose/component';
import { routes } from 'navigations';
import { useSelector } from 'react-redux';
import { getGame } from 'stores';
import { PBDASH_SOUND, usePBDashSound } from 'screens/snakeAndLadder/sound/index.js';
import { GAME_INDICATOR, GAME_TYPE } from 'screens/snakeAndLadder/constant/constant.js';
import Moment from 'moment';


const MAX_TIME = 30;

const GameBoard = ({
	navigation,
	route,
	tile,
	type,
	currentBoard,
	position,
	questions,
	questionSession,
	isRetry,
}) => {
	const { isMusicOn, campaignId } = useSelector(getGame);
	const [timeLeft, setTimeLeft] = useState(MAX_TIME);
	const [score, setScore] = useState(0);
	const [result, setResult] = useState(null);

  const hasEndedRef = useRef(false);
  const scoreRef = useRef(score);
  const timerId = useRef(null);
  const lastTimerMS = useRef(Moment().valueOf());


	usePBDashSound({ sound: PBDASH_SOUND.WHACKAMOLE_SOUND, isMusicOn });

  useEffect(() => {
    if (isRetry) {
      resetGame();
    } else {
      startTimer();
    }

    return () => clearInterval(timerId.current);
  }, [isRetry]);

  const resetGame = () => {
    clearInterval(timerId.current);
    setScore(0);
    setResult(null);
    setTimeLeft(MAX_TIME);
    hasEndedRef.current = false;
    lastTimerMS.current = Moment().valueOf();
    startTimer();
  };

	useEffect(() => {
		scoreRef.current = score;
	}, [score]);

  const startTimer = () => {
    clearInterval(timerId.current);
    lastTimerMS.current = Moment().valueOf();

    timerId.current = setInterval(() => {
      const now = Moment().valueOf();
      const elapsed = Math.floor((now - lastTimerMS.current) / 1000);

      if (elapsed >= 1) {
        setTimeLeft((prev) => {
          const newTime = Math.max(prev - elapsed, 0);

          if (newTime <= 0) {
            clearInterval(timerId.current);
            const final = scoreRef.current;
            setResult(final >= 20 ? GAME_INDICATOR.WIN : GAME_INDICATOR.LOSE);
            handleGameEnd(final);
          }

          return newTime;
        });

        lastTimerMS.current = now;
      }
    }, 200);
  };

	const handleGameEnd = (finalScore) => {
		if (hasEndedRef.current) {
			return;
		}

		hasEndedRef.current = true;

		const isWin = finalScore >= 20;
		route.params?.onDone?.(isWin);
	};

	// Show game over screen
	if (result === GAME_INDICATOR.WIN) {
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

	if (result === GAME_INDICATOR.LOSE) {
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
	}

	return (
		<ImageBackground style={styles.container} source={require('../assets/background2.png')}>
			<View style={styles.cloudContainer}>
				<Image
					source={require('../assets/score.png')}
					style={styles.cloudImage}
					resizeMode="contain"
				/>
			</View>
			<View style={styles.scoreTimeView}>
				<Text style={styles.timerText}>00:{String(timeLeft).padStart(2, '0')}</Text>
				<Text style={styles.scoreText}>{score}</Text>
			</View>
			<View style={styles.game}>
				{[...Array(12)].map((_, i) => (
					<Square key={i} increaseScore={() => setScore((prev) => prev + 1)} />
				))}
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	cloudContainer: {
		position: 'absolute',
		top: 80,
		alignItems: 'center',
	},
	cloudImage: {
		width: 350,
		height: 220,
	},
	scoreTimeView: {
		marginTop: 150,
		marginBottom: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timerText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: 'green',
		marginBottom: 20,
	},
	scoreText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: 'orange',
	},
	game: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: 350,
		gap: 10,
		marginRight: 40,
	},
});

export default GameBoard;
