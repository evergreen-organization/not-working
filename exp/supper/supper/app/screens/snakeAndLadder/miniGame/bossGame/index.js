// GameScreen.tsx
import { routes } from 'navigations';
import React, { useEffect, useState, useRef } from 'react';
import {
	Image,
	ImageBackground,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import StrikeAnimation from 'screens/snakeAndLadder/components/bossAnimation/components/Strike';
import SwordSwing from 'screens/snakeAndLadder/components/bossAnimation/components/Sword';
import { getGame } from 'stores';
import CorrectImage from '../../components/bossAnimation/image/corrects.png';
import WrongImage from '../../components/bossAnimation/image/wrongs.png';
import { BingoReadingLose } from '../magicReading/readingLose/component';
import { BingoReadingWin } from '../magicReading/readingWin/component';
import BossBg from './assets/bg-boss-level.png';
import BossLife from './assets/boss-life.png';
import MinusLife from './assets/minus-life.png';
import PlayerLife from './assets/player-life.png';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import {
	GAME_INDICATOR,
	GAME_TYPE,
	NO_INTERNET_MSG,
} from 'screens/snakeAndLadder/constant/constant';
import { useNetInfo } from '@react-native-community/netinfo';
import { showFailure } from 'utils';
import Moment from 'moment';

export const BossGameScreen = ({ route, navigation }) => {
	const { tile, type, currentBoard, position, questions, questionSession, isRetry } =
		route.params || {};

	const { isMusicOn, campaignId } = useSelector(getGame);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(150);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedbackImage, setFeedbackImage] = useState(null);
  const [userHealth, setUserHealth] = useState(3);
  const [dragonHealth, setDragonHealth] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupGif, setPopupGif] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const insets = useSafeAreaInsets();
  const lastTimerMS = useRef(Moment().valueOf());

	const netInfo = useNetInfo();

	const currentQuestion = questions?.[currentQuestionIndex];
	const totalUserHealth = 3;
	const totalDragonHealth = 10;

	usePBDashSound({ sound: PBDASH_SOUND.BOSS_SOUND, isMusicOn });

  useEffect(() => {
    if (isAnimating) return;

    lastTimerMS.current = Moment().valueOf();
    const interval = setInterval(() => {
      const now = Moment().valueOf();
      const elapsed = Math.floor((now - lastTimerMS.current) / 1000);

      if (elapsed >= 1) {
        setTimeLeft((prev) => {
          const newTime = Math.max(prev - elapsed, 0);

          if (newTime <= 0) {
            clearInterval(interval);
            handleLoseByTimeout();
          }

          return newTime;
        });

        lastTimerMS.current = now;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isAnimating]);

	useEffect(() => {
		if (!currentQuestion) {
			return;
		}
		const options = currentQuestion.options;
		const indices = options.map((_, i) => i);

		// Fisher-Yates shuffle
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indices[i], indices[j]] = [indices[j], indices[i]];
		}

		// Find where original index 0 ended up in shuffled array
		const correctIdx = indices.findIndex((idx) => idx === 0);

		// Map indices to actual option text
		const shuffled = indices.map((i) => options[i]);

		setShuffledOptions(shuffled);
		setCorrectOptionIndex(correctIdx);

		// Reset selected answer when question changes
		setSelectedAnswerIndex(null);
	}, [currentQuestion]);

  // Reset game state when retry
  useEffect(() => {
    if (isRetry) {
      setSelectedAnswerIndex(null);
      setTimeLeft(150);
      setIsAnimating(false);
      setFeedbackImage(null);
      setUserHealth(3);
      setDragonHealth(10);
      setCurrentQuestionIndex(0);
      setShowPopup(false);
      setPopupGif(null);
      setUserAnswers([]);
      setGameResult(null);
      lastTimerMS.current = Moment().valueOf();
    }
  }, [isRetry]);

	const handleLoseByTimeout = () => {
		setShowPopup(true);
		setTimeout(async () => {
			setShowPopup(false);
			await handleGameEnd(false);
		}, 3000);
	};

	const handleGameEnd = async (isLastQuestionCorrect) => {
		await route.params?.onDone?.(isLastQuestionCorrect);
		setGameResult(isLastQuestionCorrect ? GAME_INDICATOR.WIN : GAME_INDICATOR.LOSE);
	};

	const handleAnswer = (selectedAnswer) => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

		if (selectedAnswerIndex === null || isAnimating) {
			return;
		}

		setIsAnimating(true);
		const isCorrect = selectedAnswer === correctOptionIndex;

		const answerRecord = {
			questionId: currentQuestion.questionId,
			answer: isCorrect ? 0 : 1,
		};

		setUserAnswers((prev) => {
			const exists = prev.find((a) => a.questionId === answerRecord.questionId);
			if (exists) {
				return prev;
			}
			return [...prev, answerRecord];
		});

		const updatedAnswers = [...userAnswers, answerRecord];

		setFeedbackImage(isCorrect ? CorrectImage : WrongImage);
		setShowPopup(true);

		setTimeout(() => {
			setFeedbackImage(null);
			setPopupGif(isCorrect ? 'attack' : 'strike');
			setShowPopup(true);
		}, 500);

		setTimeout(() => {
			setShowPopup(false);

			if (isCorrect) {
				const newDragonHealth = dragonHealth - 1;
				setDragonHealth(newDragonHealth);

				if (newDragonHealth === 0) {
					setUserAnswers(updatedAnswers.map(({ questionId, answer }) => ({ questionId, answer })));

					setTimeout(async () => {
						await handleGameEnd(true);
					}, 500);
					return;
				}
			} else {
				const newUserHealth = userHealth - 1;
				setUserHealth(newUserHealth);

				if (newUserHealth === 0) {
					setTimeout(async () => {
						await handleGameEnd(false);
					}, 500);
					return;
				}
			}

			if (isCorrect) {
				const nextIndex = currentQuestionIndex + 1;
				if (nextIndex < questions?.length) {
					setCurrentQuestionIndex(nextIndex);
				} else {
					setCurrentQuestionIndex(0);
				}
			}

			setSelectedAnswerIndex(null);
			setIsAnimating(false);
		}, 2000);
	};
	if (gameResult === GAME_INDICATOR.WIN) {
		return (
			<BingoReadingWin
				type={type}
				currentBoard={currentBoard}
				navigation={navigation}
				tile={tile}
				endGameParams={{
					isWin: true,
					campaignId,
					gameType: GAME_TYPE.BOSS,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={() => {
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
				currentBoard={currentBoard}
				navigation={navigation}
				position={position}
				endGameParams={{
					isWin: false,
					campaignId,
					gameType: GAME_TYPE.BOSS,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={() => {
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={BossBg} style={styles.backgroundImg} />
			<SafeAreaView style={styles.healthRow}>
				<View style={styles.lifeSection}>
					<Text style={styles.sectionTitle}>Your Life</Text>
					<View style={{ flexDirection: 'row' }}>
						{[...Array(userHealth)].map((_, i) => (
							<Image key={`life-${i}`} source={PlayerLife} style={styles.lifeIcon} />
						))}
						{[...Array(totalUserHealth - userHealth)].map((_, i) => (
							<Image key={`life-lost-${i}`} source={MinusLife} style={styles.lifeIcon} />
						))}
					</View>

					<View style={styles.timerContainer}>
						<Text style={styles.timerText}>
							{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
							{String(timeLeft % 60).padStart(2, '0')}
						</Text>
					</View>
				</View>

				<View style={styles.lifeSectionRight}>
					<Text style={styles.sectionTitle}>Boss Life</Text>
					<View style={styles.bossHealth}>
						{[...Array(dragonHealth)].map((_, i) => (
							<Image key={`boss-life-${i}`} source={BossLife} style={styles.lifeIcon} />
						))}
						{[...Array(totalDragonHealth - dragonHealth)].map((_, i) => (
							<Image key={`boss-dead-${i}`} source={MinusLife} style={styles.lifeIcon} />
						))}
					</View>
				</View>
			</SafeAreaView>

			<ScrollView style={styles.bottomHalf}>
				<Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
				<Text style={styles.question}>{currentQuestion?.questionText}</Text>
				{shuffledOptions
					.map((option, index) => ({ option, index }))
					.filter(({ option }) => option?.trim() !== '')
					.map(({ option, index }) => (
						<TouchableOpacity
							key={index}
							style={[styles.option, selectedAnswerIndex === index && styles.selectedOption]}
							onPress={() => {
								playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
								setSelectedAnswerIndex(index);
							}}
						>
							<Text style={styles.optionText}>{option}</Text>
						</TouchableOpacity>
					))}
			</ScrollView>

			<TouchableOpacity
				style={[styles.imageSubmitButton, { bottom: insets.bottom }]}
				onPress={() => {
					if (
						(userHealth === 1 || dragonHealth === 1) &&
						(!netInfo.isConnected || !netInfo.isInternetReachable)
					) {
						showFailure(NO_INTERNET_MSG);
						return;
					}

					handleAnswer(selectedAnswerIndex);
				}}
				disabled={selectedAnswerIndex === null}
			>
				<Image
					source={require('./assets/btn-submit-boss.png')}
					style={styles.submitImage}
					resizeMode="contain"
				/>
			</TouchableOpacity>

			{/* Fullscreen Popup */}
			<Modal visible={showPopup} transparent animationType="fade" statusBarTranslucent>
				<View style={styles.popupContainer}>
					{feedbackImage ? (
						<Image source={feedbackImage} style={styles.popupPng} />
					) : popupGif === 'strike' ? (
						<StrikeAnimation onFinish={() => setShowPopup(false)} />
					) : popupGif === 'attack' ? (
						<SwordSwing onFinish={() => setShowPopup(false)} />
					) : null}
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	bottomHalf: {
		maxHeight: '65%',

		flex: 0.95,
		padding: 20,
		margin: 10,
		marginBottom: 20,
		backgroundColor: '#585859',
		borderRadius: 10,
	},
	dragon: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
	},
	healthContainer: {
		position: 'absolute',
		top: 50,
		left: 20,
	},
	healthText: {
		fontSize: 18,
		color: 'black',
		marginBottom: 4,
	},
	question: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
		color: 'white',
		textAlign: 'center',
	},
	option: {
		backgroundColor: '#bcbefa',
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
	},
	optionText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	popupContainer: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'center',
		alignItems: 'center',
	},
	popupGif: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
	},

	healthRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
		marginTop: 30,
	},

	lifeSection: {
		alignItems: 'flex-start',
	},

	lifeSectionRight: {
		alignItems: 'flex-end',
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 4,
	},

	timerText: {
		fontSize: 14,
		color: '##C85A2A',
	},

	questionNumber: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#FDCD60',
		textAlign: 'center',
	},

	selectedOption: {
		backgroundColor: '#6366c6',
	},

	submitButton: {
		backgroundColor: '#28a745',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 10,
	},

	submitButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},

	imageSubmitButton: {
		position: 'absolute',
		alignSelf: 'center',
		zIndex: 999,
	},

	submitImage: {
		width: 200,
		height: 60,
	},
	lifeIcon: {
		width: 20,
		height: 20,
		marginRight: 4,
	},

	timerContainer: {
		backgroundColor: '#FFA500', // Orange
		borderRadius: 20,
		padding: 5,
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderWidth: 2,
	},
	popupPng: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
		marginBottom: 500,
	},
	bossHealth: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxWidth: 120,
		justifyContent: 'flex-end',
	},
});
