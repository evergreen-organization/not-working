import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getGame, requestQuestion, clearQuestionList } from 'stores';

import { BingoGameInstructions } from './component';
import { LOADING } from 'constant';
import { gameUtils } from 'screens/snakeAndLadder/utils/gameUtils';
import { useFocusEffect } from '@react-navigation/native';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';
import { useNetInfo } from '@react-native-community/netinfo';
import { API_FAILED_MSG, NO_INTERNET_MSG } from 'screens/snakeAndLadder/constant/constant';
import { showFailure } from 'utils';
import { BackHandler } from 'react-native';

export const BingoGameInstructionScreen = ({ navigation, route }) => {
	const { id, type, onDone, tile, currentBoard, position, questions, questionSession, isRetry } =
		route.params || {};
	const dispatch = useDispatch();
	const { status, campaignId } = useSelector(getGame);
	const netInfo = useNetInfo();

	const onDoneCalledRef = useRef(false);
	const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

	useEffect(() => {
		const onBackPress = () => {
			// Prevent going back
			return true;
		};

		const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

		return () => subscription.remove();
	}, []);

	const handleClose = useCallback(() => {
		if (!onDoneCalledRef.current && onDone) {
			onDoneCalledRef.current = true;
			onDone(false); // treat as fail
		}

		navigation.goBack();
	}, [navigation, onDone]);

	const handlePlay = useCallback(async () => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
		if (!netInfo.isConnected || !netInfo.isInternetReachable) {
			showFailure(NO_INTERNET_MSG);
			return;
		}

		const { gameRoute, gameType, error } = gameUtils().getGameRouteAndType(type);
		if (error) {
			showFailure(error);
			return;
		}

		// All games need questions, always fetch new ones
		if (gameType && !isRetry) {
			setIsLoadingQuestions(true);
			try {
				dispatch(clearQuestionList());

				const response = await dispatch(requestQuestion({ campaignId, gameType }));
				const questionsApi = response?.payload?.data;

				// Check if questions were loaded successfully
				if (!questionsApi?.questions || questionsApi.questions.length === 0) {
					showFailure(API_FAILED_MSG);
					setIsLoadingQuestions(false);
					return;
				}

				return navigation.navigate(gameRoute, {
					id,
					type,
					tile,
					onDone,
					currentBoard,
					position,
					questions: questionsApi.questions,
					questionSession: questionsApi.questionSession,
				});
			} catch (err) {
				console.error('Failed to load questions:', err);
				showFailure(API_FAILED_MSG);
				setIsLoadingQuestions(false);
				return;
			} finally {
				setIsLoadingQuestions(false);
			}
		} else if (isRetry) {
			return navigation.navigate(gameRoute, {
				id,
				type,
				tile,
				onDone,
				currentBoard,
				position,
				questions,
				questionSession,
				isRetry,
			});
		}

		// For games without questions (shouldn't happen)
		return navigation.navigate(gameRoute, { id, type, tile, onDone, currentBoard, position });
	}, [
		navigation,
		netInfo.isConnected,
		netInfo.isInternetReachable,
		dispatch,
		campaignId,
		id,
		type,
		tile,
		onDone,
		currentBoard,
		position,
	]);

	// Handle swipe-back or hardware back
	useFocusEffect(
		useCallback(() => {
			// Only set up listener if onDone exists
			if (!onDone) {
				return;
			}

			return navigation.addListener('beforeRemove', () => {
				if (!onDoneCalledRef.current) {
					onDoneCalledRef.current = true;
					onDone(false); // treat as failed
				}
			});
		}, [navigation]), // Remove onDone from dependencies to avoid recreating listener
	);

	const props = {
		handleClose,
		handlePlay,
		type,
		isLoading: status === LOADING || isLoadingQuestions,
	};

	return <BingoGameInstructions {...props} />;
};

BingoGameInstructionScreen.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired,
		navigate: PropTypes.func.isRequired,
		addListener: PropTypes.func.isRequired,
	}).isRequired,
	route: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
			type: PropTypes.string,
			onDone: PropTypes.func,
			tile: PropTypes.number,
			currentBoard: PropTypes.number,
			position: PropTypes.number,
		}),
	}).isRequired,
};
