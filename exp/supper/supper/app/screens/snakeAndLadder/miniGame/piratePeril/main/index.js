import React, { useCallback, useEffect, useRef, useState } from 'react';
import { routes } from 'navigations';
import { useDispatch, useSelector } from 'react-redux';

import { getGame, resetPirate } from 'stores';

import { indicateAnswer, indicateTopic, isCorrectAnswer } from '../utils';
import { PIRATE_STATUS } from '../constant';

import { PiratePeril } from './component';
import { PIRATE_GAME_PLAY } from '../config';
import { BingoReadingLose } from '../../magicReading/readingLose/component';
import { BingoReadingWin } from '../../magicReading/readingWin/component';

import { PBDASH_SOUND, usePBDashSound } from 'screens/snakeAndLadder/sound';
import {
	GAME_TYPE,
	NO_INTERNET_MSG,
	NO_INTERNET_TITLE,
	RETRY_TEXT,
} from 'screens/snakeAndLadder/constant/constant';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export const PiratePerilScreen = ({ navigation, route }) => {
	const { type, tile, currentBoard, position, questions, questionSession, isRetry } =
		route.params || {};

	const dispatch = useDispatch();
	const { isMusicOn, campaignId } = useSelector(getGame);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [correctLetters, setCorrectLetters] = useState([]);
	const [attempt, setAttempt] = useState(PIRATE_GAME_PLAY.MAX_ATTEMPTS);
	const [status, setStatus] = useState(PIRATE_STATUS.PLAYING);
	const [modalVisible, setModalVisible] = useState(false);
	const [submittedAnswers, setSubmittedAnswers] = useState([]);

	const netInfo = useNetInfo();

	const alertVisibleRef = useRef(false);

	const answer = indicateAnswer(questions, currentIndex);
	const isLastQuestion = currentIndex === (questions?.length || 0) - 1;
	const isLastAttempt = attempt === 1;

	usePBDashSound({ sound: PBDASH_SOUND.HANGMAN_SOUND, isMusicOn });

	useEffect(() => {
		if (
			(isLastQuestion || isLastAttempt) &&
			(netInfo.isConnected === false || netInfo.isInternetReachable === false)
		) {
			showNoInternetAlert();
		} else if (netInfo.isConnected && netInfo.isInternetReachable) {
			alertVisibleRef.current = false;
		}
	}, [netInfo.isConnected, netInfo.isInternetReachable, currentIndex, attempt]);

	useEffect(() => {
		return () => dispatch(resetPirate());
	}, []);

	// Reset game state when retry
	useEffect(() => {
		if (isRetry) {
			setCurrentIndex(0);
			setCorrectLetters([]);
			setAttempt(PIRATE_GAME_PLAY.MAX_ATTEMPTS);
			setStatus(PIRATE_STATUS.PLAYING);
			setModalVisible(false);
			setSubmittedAnswers([]);
		}
	}, [isRetry]);

	const showNoInternetAlert = () => {
		if (alertVisibleRef.current) {
			return;
		}

		alertVisibleRef.current = true;

		Alert.alert(
			NO_INTERNET_TITLE,
			NO_INTERNET_MSG,
			[
				{
					text: RETRY_TEXT,
					onPress: () => {
						alertVisibleRef.current = false;
						if (netInfo.isConnected === false || netInfo.isInternetReachable === false) {
							showNoInternetAlert();
						}
					},
				},
			],
			{ cancelable: false },
		);
	};

	const checkLetterPress = async (letter) => {
		const currentQuestion = questions?.[currentIndex];
		const questionId = currentQuestion.questionId;
		const isCorrect = answer.includes(letter);

		let updatedAnswers = [...submittedAnswers];

		if (isCorrect) {
			const letters = [...correctLetters, letter];
			setCorrectLetters(letters);

			if (isCorrectAnswer(answer, letters)) {
				updatedAnswers.push({ questionId, answer: 0 });
				setSubmittedAnswers(updatedAnswers);

				proceed(PIRATE_STATUS.WIN);
				return;
			}

			return;
		}

		const remaining = attempt - 1;
		setAttempt(remaining);

		if (remaining <= 0) {
			updatedAnswers.push({ questionId, answer: 1 });
			setSubmittedAnswers(updatedAnswers);

			return proceed(PIRATE_STATUS.LOST);
		}
	};

	const proceed = (status) => {
		setStatus(
			currentIndex === (questions?.length || 0) - 1 && status === PIRATE_STATUS.WIN
				? PIRATE_STATUS.COMPLETED
				: status,
		);
		setModalVisible(true);
	};

	const onComplete = useCallback(() => {
		setModalVisible(false);

		setCurrentIndex(currentIndex + 1);
		setCorrectLetters([]);
		setStatus(PIRATE_STATUS.PLAYING);
		setAttempt(PIRATE_GAME_PLAY.MAX_ATTEMPTS);
	}, [status, currentIndex, navigation, type]);

	const props = {
		checkLetterPress,
		onComplete,
		answer,
		correctLetters,
		hint: indicateTopic(questions, currentIndex),
		status,
		modalVisible,
		round: currentIndex + 1,
		attempt,
	};

	if (status === PIRATE_STATUS.COMPLETED) {
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
					answers: submittedAnswers,
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

	if (status === PIRATE_STATUS.LOST) {
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
					answers: submittedAnswers,
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

	return <PiratePeril {...props} />;
};
