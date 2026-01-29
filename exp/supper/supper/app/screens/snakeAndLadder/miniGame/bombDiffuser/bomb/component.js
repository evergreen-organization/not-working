import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from 'atoms';
import { Header } from 'molecules';

import Background from '../../../assets/codeRed/bg-question-codered.png';
import TimerFrame from '../../../assets/codeRed/img-countdown.png';
import TimerFrameWrong from '../../../assets/codeRed/img-countdown-wrong.png';
import TimerFrameCorrect from '../../../assets/codeRed/img-countdown-correct.png';

import Frame from '../../../assets/codeRed/bg-panel.png';
import WrongAnswer from '../../../assets/codeRed/minus-time.png';
import CorrectAnswer from '../../../assets/codeRed/plus-time.png';
import OptionBG from '../../../assets/codeRed/img-answer-state.png';

import { styles } from './styles';
import { BingoReadingLose } from '../../magicReading/readingLose/component';
import { BingoReadingWin } from '../../magicReading/readingWin/component';
import { routes } from 'navigations';
import AnsCorrect from '../../../assets/codeRed/ans-correct.png';
import AnsWrong from '../../../assets/codeRed/ans-wrong.png';
import { GAME_INDICATOR } from 'screens/snakeAndLadder/constant/constant';

export const BombDiffuserComp = ({
	handleAnswer,
	num,
	currentQuestion,
	currentQuestionIndex,
	success,
	isWrongAnswer,
	type,
	navigation,
	isCorrectAnswer,
	tile,
	route,
	currentBoard,
	position,
	campaignId,
	GAME_TYPE,
	questionSession,
	userAnswers,
	bingoResult,
}) => {
	const insets = useSafeAreaInsets();

	if (bingoResult === GAME_INDICATOR.WIN) {
		return (
			<BingoReadingWin
				type={type}
				tile={tile}
				currentBoard={currentBoard}
				navigation={navigation}
				endGameParams={{
					isWin: true,
					campaignId,
					gameType: GAME_TYPE.MCQ,
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

	if (bingoResult === GAME_INDICATOR.LOSE) {
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
					gameType: GAME_TYPE.MCQ,
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

	return (
		<>
			<Image source={Background} style={styles.background} />
			{num !== 0 && !success && (
				<Header containerStyle={{ ...styles.header, marginTop: insets.top }} />
			)}

			<View style={styles.container}>
				{num !== 0 && !success && (
					<QuestionView
						currentQuestion={currentQuestion}
						currentQuestionIndex={currentQuestionIndex}
						num={num}
						handleAnswer={handleAnswer}
						isWrongAnswer={isWrongAnswer}
						isCorrectAnswer={isCorrectAnswer}
					/>
				)}
			</View>
		</>
	);
};

const QuestionView = ({
	num,
	currentQuestionIndex,
	currentQuestion,
	handleAnswer,
	isWrongAnswer,
	isCorrectAnswer,
}) => {
	let currentTimerFrame = TimerFrame;
	if (isCorrectAnswer) {
		currentTimerFrame = TimerFrameCorrect;
	} else if (isWrongAnswer) {
		currentTimerFrame = TimerFrameWrong;
	}

	return (
		<>
			<View style={styles.timerWrapper}>
				<ImageBackground source={currentTimerFrame} style={styles.timerFrame} resizeMode="contain">
					<Text style={styles.timerText}>{`0 : ${num}`}</Text>
				</ImageBackground>

				{isCorrectAnswer && <Image source={CorrectAnswer} style={styles.correctAnswerIcon} />}
				{isWrongAnswer && <Image source={WrongAnswer} style={styles.wrongAnswerIcon} />}
			</View>

			<Text style={styles.title}>{`QUESTION ${currentQuestionIndex + 1}`}</Text>

			<ImageBackground source={Frame} style={styles.questionFrame}>
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles.questionText}>{currentQuestion?.questionText}</Text>

					{isCorrectAnswer ? (
						<View style={styles.answerView}>
							<Image source={AnsCorrect} style={styles.correctWrongImage} resizeMode="contain" />
						</View>
					) : isWrongAnswer ? (
						<View style={styles.answerView}>
							<Image source={AnsWrong} style={styles.correctWrongImage} resizeMode="contain" />
						</View>
					) : (
						currentQuestion.shuffledOptions
							?.map((item, originalIndex) => ({ item, originalIndex }))
							.filter(({ item }) => item?.trim() !== '')
							.map(({ item, originalIndex }) => (
								<View key={originalIndex} style={styles.answerView}>
									<TouchableOpacity onPress={() => handleAnswer(originalIndex)} activeOpacity={0.8}>
										<ImageBackground
											source={OptionBG}
											style={styles.optionImageButton}
											resizeMode="stretch"
										>
											<Text style={styles.optionText}>{item.trim()}</Text>
										</ImageBackground>
									</TouchableOpacity>
								</View>
							))
					)}
				</ScrollView>
			</ImageBackground>
		</>
	);
};
