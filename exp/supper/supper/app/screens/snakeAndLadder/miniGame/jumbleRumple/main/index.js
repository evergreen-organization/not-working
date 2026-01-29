import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JumbleRumple } from './component';

import { routes } from 'navigations';
import {
	characterDeselected,
	characterSelected,
	charactersReset,
	getGame,
	getJumbleRumple,
	resetJumble,
	selectedCharactersCleared,
	shuffledCharactersUpdated,
} from 'stores';

import { BingoReadingLose } from '../../magicReading/readingLose/component';
import { BingoReadingWin } from '../../magicReading/readingWin/component';
import { JUMBLE_GAMEPLAY } from '../config';
import { JUMBLE_STATUS } from '../constant';
import {
	checkEndGame,
	indicateAnswer,
	indicateHint,
	isCorrectAnswer,
	shuffleCharacters,
} from '../utils';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { useNetInfo } from '@react-native-community/netinfo';
import { GAME_TYPE } from 'screens/snakeAndLadder/constant/constant';

export const JumbleRumbleScreen = ({ navigation, route }) => {
	const { type, tile, onDone, currentBoard, position, questions, questionSession, isRetry } =
		route.params || {};

	const dispatch = useDispatch();
	const { campaignId, isMusicOn } = useSelector(getGame);
	const { selectedCharacters, shuffledCharacters = [] } = useSelector(getJumbleRumple) || {};
	const [userAnswers, setUserAnswers] = useState([]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [status, setStatus] = useState(JUMBLE_STATUS.PLAYING);
	const [attempt, setAttempt] = useState(JUMBLE_GAMEPLAY.MAX_ATTEMPTS);
	const [modalVisible, setModalVisible] = useState(false);
	const [hintIndex, setHintIndex] = useState(0);
	const [questionResults, setQuestionResults] = useState({});
	const netInfo = useNetInfo();

	const answer = indicateAnswer(questions, currentIndex);

	usePBDashSound({ sound: PBDASH_SOUND.WORDZZLE_SOUND, isMusicOn });

	useEffect(() => {
		return () => dispatch(resetJumble());
	}, []);

	useEffect(() => {
		initJumble();
	}, [answer, currentIndex]);

	// Reset game state when retry
	useEffect(() => {
		if (isRetry) {
			setCurrentIndex(0);
			setStatus(JUMBLE_STATUS.PLAYING);
			setAttempt(JUMBLE_GAMEPLAY.MAX_ATTEMPTS);
			setModalVisible(false);
			setHintIndex(0);
			setQuestionResults({});
			handleResetPress();
		}
	}, [isRetry]);

	const initJumble = () => {
		if (answer) {
			setStatus(JUMBLE_STATUS.PLAYING);
			const shuffled = shuffleCharacters(answer);
			dispatch(shuffledCharactersUpdated(shuffled));
		}
	};

	const handleErasePress = () => {
		if (status === JUMBLE_STATUS.ANSWERED) {
			setStatus(JUMBLE_STATUS.PLAYING);
		}
		dispatch(characterDeselected());
	};

	const onLetterPress = (letter) => {
		dispatch(characterSelected(letter));
		if (selectedCharacters.length + 1 >= answer?.replace(/\s/g, '').length) {
			setStatus(JUMBLE_STATUS.ANSWERED);
		}
	};

	const onPreviousHint = () => {
		setHintIndex(hintIndex - 1);
	};

	const onNextHint = () => {
		setHintIndex(hintIndex + 1);
	};

	const onSubmit = async () => {
		if (selectedCharacters.length < answer?.replace(/\s/g, '').length) {
			return;
		}

		const currentQuestion = questions?.[currentIndex];
		const questionId = currentQuestion?.questionId;
		const isCorrect = isCorrectAnswer(answer, selectedCharacters);

		setHintIndex(0);

		const finalAnswers = questions?.map((q) => {
			if (q.questionId === questionId) {
				return { questionId: q.questionId, answer: isCorrect ? 0 : 1 };
			}
			return { questionId: q.questionId, answer: questionResults[q.questionId] ?? 1 };
		});

		const isLastQuestion = currentIndex === (questions?.length || 0) - 1;
		const nextAttempt = attempt - 1;

		const isLastAttempt = nextAttempt < 1;

		if (isCorrect) {
			if (!isLastQuestion) {
				playSoundEffect(PBDASH_SOUND.SUCCESS_BGM.audio);
			}
			setQuestionResults((prev) =>
				questionId && !(questionId in prev) ? { ...prev, [questionId]: isCorrect ? 0 : 1 } : prev,
			);

			if (currentIndex === (questions?.length || 0) - 1) {
				if (!netInfo.isConnected || !netInfo.isInternetReachable) {
					return;
				}
				setUserAnswers(finalAnswers);
			}

			return proceed(JUMBLE_STATUS.CORRECT);
		}

		setAttempt(nextAttempt);

		if (!isLastQuestion && !isLastAttempt) {
			playSoundEffect(PBDASH_SOUND.FAILED_BGM.audio);
		}

		if (nextAttempt < 1) {
			setQuestionResults((prev) =>
				questionId && !(questionId in prev) ? { ...prev, [questionId]: isCorrect ? 0 : 1 } : prev,
			);
			if (!netInfo.isConnected || !netInfo.isInternetReachable) {
				return;
			}

			setUserAnswers(finalAnswers);

			return proceed(JUMBLE_STATUS.LOST);
		}

		proceed(JUMBLE_STATUS.WRONG);
	};

	const proceed = (status) => {
		const isCompletedWin =
			currentIndex === (questions?.length || 0) - 1 && status === JUMBLE_STATUS.CORRECT;

		setStatus(isCompletedWin ? JUMBLE_STATUS.WIN : status);
		setModalVisible(true);
	};

	const onComplete = () => {
		setModalVisible(false);

		if (status === JUMBLE_STATUS.WRONG && attempt === 1) {
			// Delay showing the warning popup
			setTimeout(() => {
				setStatus(JUMBLE_STATUS.WARNING);
				setModalVisible(true);
			}, 50);
			return;
		}
		if (status === JUMBLE_STATUS.WARNING) {
			return reset(); // reset input after warning
		}

		if (status === JUMBLE_STATUS.WRONG) {
			return reset();
		}

		if (checkEndGame(status)) {
			if (status === JUMBLE_STATUS.WIN) {
				if (onDone) {
					onDone(true);
				}
			}
			navigation.navigate(routes.SNAKE_AND_LADDER);
			return;
		}

		// Continue to next question
		setCurrentIndex((prev) => {
			const nextIndex = prev + 1;
			dispatch(charactersReset());
			setStatus(JUMBLE_STATUS.PLAYING);

			const nextAnswer = indicateAnswer(questions, nextIndex);
			const shuffled = shuffleCharacters(nextAnswer);
			dispatch(shuffledCharactersUpdated(shuffled));

			return nextIndex;
		});
	};

	const reset = () => {
		setHintIndex(0);
		setStatus(JUMBLE_STATUS.PLAYING);
		dispatch(selectedCharactersCleared());
	};

	const handleResetPress = () => {
		reset();
	};

	const handleHomePress = () => {
		navigation.navigate(routes.SNAKE_AND_LADDER);
	};

	const props = {
		handleErasePress,
		handleResetPress,
		onLetterPress,
		onPreviousHint,
		onNextHint,
		onSubmit,
		onComplete,
		handleHomePress,
		shuffledCharacters,
		currentIndex,
		totalQuestions: 3,
		hintIndex,
		hints: indicateHint(questions, currentIndex),
		answer,
		selectedCharacters,
		status,
		modalVisible,
		attempt,
	};

	if (status === JUMBLE_STATUS.WIN) {
		return (
			<BingoReadingWin
				type={type}
				tile={tile}
				navigation={navigation}
				currentBoard={currentBoard}
				endGameParams={{
					isWin: true,
					campaignId,
					gameType: GAME_TYPE.STRING,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={async () => {
					setStatus(null);
					setCurrentIndex(0);
					await route.params?.onDone?.(true);
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	if (status === JUMBLE_STATUS.LOST) {
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
					gameType: GAME_TYPE.STRING,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={async () => {
					setStatus(null);
					setCurrentIndex(0);
					await route.params?.onDone?.(false);
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	return <JumbleRumple {...props} />;
};
