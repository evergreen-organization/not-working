import React from 'react';
import { BottomView, Text } from 'atoms';
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import answerBoard from '../../../assets/wordzzle/bg-wordzzle.png';
import frameImg from 'assets/bingo/balloonPop/questionFrame.png';

import { styles } from './styles';
import { AnswerBox, AnswerKeyboard, QuestionHint, StatusPopup } from '../components';
import { JUMBLE_ENDGAME } from '../config';
import { checkEndGame } from '../utils';
import { Header } from 'molecules';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const JumbleRumple = ({
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
	totalQuestions,
	hintIndex,
	hints,
	answer,
	selectedCharacters,
	status,
	modalVisible,
	attempt,
}) => {
	const insets = useSafeAreaInsets();

	return (
		<>
			<ImageBackground
				source={answerBoard}
				style={styles.answerBackgroundImage}
				resizeMode={'stretch'}
			>
				<Header containerStyle={{ ...styles.header, marginTop: insets.top }} />
				<ScrollView showsVerticalScrollIndicator={false}>
					{/*Header*/}
					<View style={styles.question}>
						<Text bold as={Text.type.H4} style={styles.textStyle}>{`ATTEMPT: ${attempt}`}</Text>

						<Text as={Text.type.H4} style={styles.textStyle}>{`Question ${
							currentIndex + 1
						} / ${totalQuestions}`}</Text>
					</View>

					{/*Hint*/}
					{hints && hints?.length !== 0 && (
						<QuestionHint
							hints={hints}
							index={hintIndex}
							onPrevious={onPreviousHint}
							onNext={onNextHint}
						/>
					)}

					{/*Answer Box*/}
					<AnswerBox answer={answer} selectedCharacters={selectedCharacters} />
				</ScrollView>

				{/*Answer Keyboard*/}
				{checkEndGame(status) ? (
					<View style={styles.bottomEndView}>
						<View style={styles.manView}>
							<Image
								source={JUMBLE_ENDGAME[status]?.endImage ?? frameImg}
								style={JUMBLE_ENDGAME[status]?.endImageStyle ?? styles.manImage}
							/>
						</View>
						<View>
							<View style={styles.endView}>
								<ImageBackground resizeMode={'stretch'} source={frameImg} style={styles.box}>
									<Text style={styles.endText} as={Text.type.P2}>
										{JUMBLE_ENDGAME[status]?.endLabel}
									</Text>
								</ImageBackground>
							</View>
							<TouchableOpacity style={styles.homeView} onPress={handleHomePress}>
								<Image source={frameImg} style={styles.homeIcon} />
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<BottomView style={styles.bottom}>
						<ScrollView contentContainerStyle={styles.scroll}>
							<AnswerKeyboard
								attempt={attempt}
								erase={handleErasePress}
								reset={handleResetPress}
								shuffledWord={shuffledCharacters}
								onPress={onLetterPress}
								onSubmit={onSubmit}
								status={status}
							/>
						</ScrollView>
					</BottomView>
				)}
			</ImageBackground>

			<StatusPopup isVisible={modalVisible} status={status} onPress={onComplete} />
		</>
	);
};
