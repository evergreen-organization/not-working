import { routes } from 'navigations';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getGame } from 'stores';
import { GAME_INDICATOR, GAME_TYPE, NO_INTERNET_MSG } from '../../../constant/constant';
import { BingoReadingLose } from '../readingLose/component';
import { BingoReadingWin } from '../readingWin/component';
import { BingoReadingQuestion } from './component';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { useNetInfo } from '@react-native-community/netinfo';
import { showFailure } from 'utils';
import PropTypes from 'prop-types';

export const BingoReadingQuestionScreen = ({ navigation, route }) => {
	const { type, tile, currentBoard, position, questions, questionSession, isRetry } =
		route.params || {};

	const { status, isMusicOn, campaignId } = useSelector(getGame);

	const [gameResult, setGameResult] = useState(null);
	const [pagination, setPagination] = useState(0);
	const [answeredCorrect, setAnsweredCorrect] = useState(0);
	const [questionArray, setQuestionArray] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [userAnswers, setUserAnswers] = useState([]);

	const netInfo = useNetInfo();

	usePBDashSound({ sound: PBDASH_SOUND.TRIVIA_SOUND, isMusicOn });

	// Initialize questions on mount
	useEffect(() => {
		if (questions) {
			const preparedQuestions = prepareQuestionsWithShuffle(questions);
			setQuestionArray(preparedQuestions);
		}
	}, []);

	// Reset game state when retry
	useEffect(() => {
		if (isRetry) {
			setPagination(0);
			setAnsweredCorrect(0);
			setSelectedAnswer(null);
			setCurrentQuestion({});
			setUserAnswers([]);
			setGameResult(null);
		}
	}, [isRetry]);

	const onChooseAnswer = ({ quesObj, index }) => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

		setCurrentQuestion(quesObj);
		setSelectedAnswer(index);
	};

	const prepareQuestionsWithShuffle = (questions) => {
		const shuffleOptions = (options) => {
			return options.map((option, index) => ({ option, index })).sort(() => Math.random() - 0.5);
		};

		return questions.map((q) => {
			const correctAnswer = q.options[0]; // Always index 0
			const shuffled = shuffleOptions(q.options);
			const correctIndex = shuffled.findIndex((item) => item.option === correctAnswer);

			return {
				...q,
				answer: 0,
				shuffledOptions: shuffled.map((item) => item.option),
				correctIndex,
			};
		});
	};

	const onSubmit = async () => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

		let newCorrect = answeredCorrect;
		const currentQ = questionArray[pagination];
		const isCorrect = selectedAnswer === currentQ.correctIndex;

		if (isCorrect) {
			newCorrect = newCorrect + 1;
			setAnsweredCorrect(newCorrect);
		}

		const isLast = questionArray.length === pagination + 1;
		const isLastQuestionCorrect = newCorrect === questionArray.length;

		const updatedAnswers = [
			...userAnswers.filter((a) => a.questionId !== currentQ.questionId),
			{ questionId: currentQ.questionId, answer: isCorrect ? 0 : 1 },
		];

		setUserAnswers(updatedAnswers);

		if (isLast) {
			if (!netInfo.isConnected || !netInfo.isInternetReachable) {
				showFailure(NO_INTERNET_MSG);
				return;
			}
			setGameResult(isLastQuestionCorrect ? GAME_INDICATOR.WIN : GAME_INDICATOR.LOSE);
			return;
		}

		setPagination((prev) => prev + 1);
		setCurrentQuestion({});
		setSelectedAnswer(null);
	};

	const props = {
		onSubmit,
		onChooseAnswer,
		questionArray,
		pagination,
		numOfQuestions: questionArray?.length,
		selectedAnswer,
		status,
		isLoading: questionArray.length === 0,
		currentQuestion,
	};

	if (gameResult === GAME_INDICATOR.WIN) {
		return (
			<BingoReadingWin
				type={type}
				tile={tile}
				navigation={navigation}
				currentBoard={currentBoard}
				endGameParams={{
					isWin: true,
					campaignId,
					gameType: GAME_TYPE.MCQ,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={async () => {
					await route.params?.onDone?.(true); // update parent state
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	if (gameResult === GAME_INDICATOR.LOSE) {
		return (
			<BingoReadingLose
				type={type}
				tile={tile}
				navigation={navigation}
				currentBoard={currentBoard}
				position={position}
				answeredCorrect={answeredCorrect}
				endGameParams={{
					isWin: false,
					campaignId,
					gameType: GAME_TYPE.MCQ,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={async () => {
					await route.params?.onDone?.(false); // update parent state
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	return <BingoReadingQuestion {...props} />;
};

BingoReadingQuestionScreen.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired,
		navigate: PropTypes.func.isRequired,
	}).isRequired,
	route: PropTypes.shape({
		params: PropTypes.shape({
			type: PropTypes.string,
			tile: PropTypes.number,
			currentBoard: PropTypes.number,
			position: PropTypes.number,
			onDone: PropTypes.func,
			questions: PropTypes.array,
			questionSession: PropTypes.string,
		}),
	}).isRequired,
};
