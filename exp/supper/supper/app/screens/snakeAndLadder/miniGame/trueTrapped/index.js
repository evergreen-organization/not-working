import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getGame } from 'stores';
import { Platform } from 'react-native';

import bgImg1 from '../../assets/trueTrapped/bg-first-question.png';
import bgImg2 from '../../assets/trueTrapped/bg-second-question.png';
import bgImg3 from '../../assets/trueTrapped/bg-third-question.png';

import btnTrue from '../../assets/trueTrapped/btn-true.png';
import btnFalse from '../../assets/trueTrapped/btn-false.png';
import { BingoReadingLose } from '../magicReading/readingLose/component';
import { BingoReadingWin } from '../magicReading/readingWin/component';
import { routes } from 'navigations';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { GAME_TYPE, NO_INTERNET_MSG } from 'screens/snakeAndLadder/constant/constant';
import { useNetInfo } from '@react-native-community/netinfo';
import { showFailure } from 'utils';

export const TrueTrappedScreen = ({ navigation, route }) => {
	const { type, tile, currentBoard, position, questions, questionSession, isRetry } =
		route.params || {};
	const bgImages = [bgImg1, bgImg2, bgImg3];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [hasFailed, setHasFailed] = useState(false);
	const [hasPassed, setHasPassed] = useState(false);
	const [userAnswers, setUserAnswers] = useState([]);
	const { isMusicOn, campaignId } = useSelector(getGame);
	const netInfo = useNetInfo();

	usePBDashSound({ sound: PBDASH_SOUND.TRUETRAPPED_SOUND, isMusicOn });

	// Reset game state when retry
	useEffect(() => {
		if (isRetry) {
			setCurrentIndex(0);
			setHasFailed(false);
			setHasPassed(false);
			setUserAnswers([]);
		}
	}, [isRetry]);

	const handleAnswer = async (userAnswer) => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
		if (!netInfo.isConnected || !netInfo.isInternetReachable) {
			showFailure(NO_INTERNET_MSG);
			return;
		}
		const correctAnswerText = currentQ.options[0];
		const correctAnswerValue = correctAnswerText.toLowerCase() === 'true';

		const isCorrect = userAnswer === correctAnswerValue;
		const answerIndex = isCorrect ? 0 : 1;

		const answerObj = {
			questionId: currentQ.questionId,
			answer: answerIndex,
		};

		const updatedAnswers = [...userAnswers, answerObj];
		setUserAnswers(updatedAnswers);

		if (!isCorrect) {
			setHasFailed(true);
			return;
		}

		playSoundEffect(PBDASH_SOUND.SUCCESS_BGM.audio);

		const isLast = currentIndex + 1 >= questions?.length;
		if (isLast) {
			setHasPassed(true);
			return;
		}

		setCurrentIndex(currentIndex + 1);
	};

	const currentQ = questions?.[currentIndex];

	if (hasFailed) {
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
					gameType: GAME_TYPE.BOOL,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={async () => {
					await route.params?.onDone?.(false);
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	if (hasPassed) {
		return (
			<BingoReadingWin
				type={type}
				tile={tile}
				navigation={navigation}
				currentBoard={currentBoard}
				endGameParams={{
					isWin: true,
					campaignId,
					gameType: GAME_TYPE.BOOL,
					questionSession: questionSession || '',
					answers: userAnswers,
				}}
				onCancel={async () => {
					await route.params?.onDone?.(true);
					navigation.navigate(routes.SNAKE_AND_LADDER);
				}}
			/>
		);
	}

	return (
		<ImageBackground
			source={bgImages[currentIndex] || bgImg1}
			style={styles.container}
			resizeMode="cover"
		>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.contentContainer}>
					<ScrollView
						style={styles.questionContainer}
						contentContainerStyle={styles.scrollContent}
						showsVerticalScrollIndicator={true}
					>
						{currentQ?.questionText ? (
							<Text style={styles.questionText}>{currentQ.questionText}</Text>
						) : null}
					</ScrollView>

					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={() => handleAnswer(true)}>
							<Image source={btnTrue} style={styles.buttonImage} resizeMode="contain" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleAnswer(false)}>
							<Image source={btnFalse} style={styles.buttonImage} resizeMode="contain" />
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},

	safeArea: {
		flex: 1,
		width: '100%',
	},

	contentContainer: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingBottom: 30,
	},

	questionContainer: {
		maxHeight: 220,
		borderRadius: 10,
		padding: 10,
	},

	scrollContent: {
		alignItems: 'center',
	},

	questionText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		textAlign: 'center',
		lineHeight: 28,
		marginTop: Platform.OS === 'android' ? 15 : 0,
	},

	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 100,
		marginTop: 20,
	},

	buttonImage: {
		width: 120,
		height: 120,
	},
});
