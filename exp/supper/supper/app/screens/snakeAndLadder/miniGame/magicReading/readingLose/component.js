import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors } from 'configs';

import btnRetry from '../../../assets/trivia/btn-back.png';

import { NoDicePopup } from 'screens/snakeAndLadder/components/noDicePopup';
import { RetryPopup } from 'screens/snakeAndLadder/components/retryPopup';
import {
	BOSS_TYPE,
	GAME_INSTRUCTIONS,
	GAME_STATUS,
	NO_INTERNET_MSG,
} from 'screens/snakeAndLadder/constant/constant';
import loseBgBoss1 from '../../../assets/boss/bg-failed-boss1.png';
import loseBgBoss2 from '../../../assets/boss/bg-failed-boss2.png';
import loseBgBoss3 from '../../../assets/boss/bg-failed-boss3.png';
import loseBgBoss4 from '../../../assets/boss/bg-failed-boss4.png';
import { useDispatch, useSelector } from 'react-redux';
import { getGame, setIsRetry, setMiniGameResult, updatePosition } from 'stores';
import { gameUtils } from 'screens/snakeAndLadder/utils/gameUtils';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { useNetInfo } from '@react-native-community/netinfo';
import { showFailure } from 'utils';
import { useGameApi } from 'screens/snakeAndLadder/utils/useGameApi';
import { LOADING } from 'constant';
import { Loading } from 'atoms';
import { routes } from 'navigations';

export const BingoReadingLose = ({
	onCancel,
	navigation,
	type,
	answeredCorrect,
	tile,
	currentBoard,
	position,
	endGameParams,
}) => {
	const dispatch = useDispatch();
	const gameApi = useGameApi();

	const { questionStatus, isMusicOn, campaignId, questionsList, isRetry, diceCount } =
		useSelector(getGame) || {};
	const instructionData = GAME_INSTRUCTIONS?.[type] || {};

	const [showRetryPopup, setShowRetryPopup] = useState(false);
	const [showNoDicePopup, setShowNoDicePopup] = useState(false);

	const netInfo = useNetInfo();

	let backgroundImg = instructionData.loseBg;

	if (type === BOSS_TYPE) {
		switch (currentBoard) {
			case 0:
				backgroundImg = loseBgBoss1;
				break;
			case 1:
				backgroundImg = loseBgBoss2;
				break;
			case 2:
				backgroundImg = loseBgBoss3;
				break;
			case 3:
				backgroundImg = loseBgBoss4;
				break;
			default:
				backgroundImg = instructionData.loseBg;
		}
	}

	usePBDashSound({ sound: PBDASH_SOUND.FAILED_BGM, loop: 0, isMusicOn });

	useEffect(() => {
		if (endGameParams) {
			gameApi.endGame(endGameParams);
		}
	}, []);

	const handleRetryYes = () => {
		if (!netInfo.isConnected || !netInfo.isInternetReachable) {
			showFailure(NO_INTERNET_MSG);
			return;
		}
		if (diceCount <= 0) {
			setShowNoDicePopup(true);
			return;
		}

		dispatch(
			updatePosition({
				campaignId,
				coins: 1,
				playerPosition: position,
			}),
		);
		dispatch(setIsRetry(true));

		// Get the direct game route and navigate with stored questions
		const { gameRoute } = gameUtils().getGameRouteAndType(type);
		if (gameRoute && questionsList?.data) {
			navigation.navigate(routes.BINGO_GAME_INSTRUCTION, {
				type,
				tile,
				currentBoard,
				position,
				questions: questionsList.data.questions,
				questionSession: questionsList.data.questionSession,
				isRetry: true, // Flag to indicate this is a retry
				onDone: (wasDone) => {
					dispatch(
						setMiniGameResult({
							tile,
							result: wasDone ? GAME_STATUS.PASSED : GAME_STATUS.FAILED,
						}),
					);
				},
			});
		}
	};

	const { exitButton } = GAME_INSTRUCTIONS[type] || {};

	return (
		<View style={styles.container}>
			<ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.background}>
				{/* {typeof score === 'number' && (
					<View style={styles.scoreContainer}>
						<Text style={styles.scoreText}>YOUR SCORE: {score}</Text>
					</View>
				)} */}

				{typeof answeredCorrect === 'number' && (
					<View style={styles.resultContainer}>
						<Text style={styles.resultText}>
							Oops! You only got {answeredCorrect} out of 3 questions right.
						</Text>
					</View>
				)}

				<View style={styles.buttonRow}>
					<TouchableOpacity
						onPress={() => {
							playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

							if (type === BOSS_TYPE || isRetry) {
								onCancel();
							} else {
								setShowRetryPopup(true);
							}
						}}
					>
						<Image
							source={exitButton ? exitButton : btnRetry}
							style={styles.buttonImage}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			</ImageBackground>
			{showRetryPopup && (
				<RetryPopup
					onYes={handleRetryYes}
					onNo={() => {
						setShowRetryPopup(false);
						onCancel();
					}}
				/>
			)}

			{showNoDicePopup && (
				<NoDicePopup
					onCancel={() => {
						setShowNoDicePopup(false);
						onCancel();
					}}
				/>
			)}
			{questionStatus === LOADING && <Loading preset={'blurFullScreen'} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F3EFDC',
		flex: 1,
	},
	background: {
		flex: 1,
		justifyContent: 'center',
	},
	closeButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginHorizontal: 20,
		marginVertical: 15,
	},
	closeIcon: {
		width: 25,
		height: 25,
	},
	content: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	oopsText: {
		fontSize: 20,
		marginVertical: 15,
		color: colors.red,
		fontFamily: "'-RonySiswadi-Architect-3",
	},
	backgroundImage: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	encouragementWrapper: {
		flexDirection: 'column',
		alignItems: 'center',
		marginVertical: 15,
		marginBottom: 230,
	},
	encouragementText: {
		fontSize: 24,
		marginBottom: 10,
		color: colors.red,
		fontFamily: "'-RonySiswadi-Architect-3",
	},
	owlImage: {
		width: '100%',
		top: '-15%',
	},
	// resultText: {
	// 	top: '-10%',
	// 	fontSize: 20,
	// 	color: colors.secondaryFont,
	// 	fontFamily: "'-RonySiswadi-Architect-3",
	// },
	incompleteText: {
		top: '-10%',
		fontSize: 20,
		color: colors.secondaryFont,
		marginTop: 10,
		fontFamily: "'-RonySiswadi-Architect-3",
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly', // changed from space-around
		alignItems: 'center',
		paddingHorizontal: 40,
		paddingBottom: 40,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		gap: 20, // add this if React Native version supports it
	},

	buttonImage: {
		width: 120,
		height: 120,
	},
	scoreContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 250,
		alignItems: 'center',
	},

	scoreText: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'black',
		backgroundColor: 'orange',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 12,
	},
	resultContainer: {
		alignItems: 'center',
		marginBottom: 200,
		marginHorizontal: 50,
	},

	resultText: {
		fontSize: 26,
		fontWeight: '600',
		color: colors.white,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 10,
		textAlign: 'center',
	},
});
