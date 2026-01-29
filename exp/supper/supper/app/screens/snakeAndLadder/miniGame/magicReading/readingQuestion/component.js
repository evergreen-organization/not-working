import BgTrivia from '../../../assets/trivia/bg-questionTrivia.png';
import BgQuestion from '../../../assets/trivia/bg-first-question.png';
import BgQuestion2 from '../../../assets/trivia/bg-second-question.png';
import BgQuestion3 from '../../../assets/trivia/bg-third-question.png';
import BgOption from '../../../assets/trivia/answer-selection.png';
import BgOptionSelected from '../../../assets/trivia/answer-selection-state.png';

import BtnSubmit from '../../../assets/trivia/btn-submit.png';
import { Text } from 'atoms';

import React from 'react';
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BingoReadingQuestion = ({
	questionArray,
	pagination,
	selectedAnswer,
	onChooseAnswer,
	onSubmit,
}) => {
	const insets = useSafeAreaInsets();

	const question = questionArray[pagination];

	let questionBg = BgQuestion;

	if (pagination === 1) {
		questionBg = BgQuestion2;
	} else if (pagination === 2) {
		questionBg = BgQuestion3;
	}

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.backgroundImg} source={BgTrivia} />

			<View style={[styles.contentWrapper, { marginTop: insets.top + 20 }]}>
				<ImageBackground source={questionBg} style={styles.questionBgImg} resizeMode="contain">
					{/* Add this wrapper */}
					<View style={styles.scrollWrapper}>
						<ScrollView
							showsVerticalScrollIndicator={true}
							contentContainerStyle={styles.scrollContent}
						>
							<Text style={styles.questionText}>{question?.questionText}</Text>
							<View style={styles.optionsWrapper}>
								{question?.shuffledOptions
									?.filter((item) => item?.trim?.() !== '') // <- removes empty or whitespace-only strings
									.map((item, index) => (
										<TouchableOpacity
											key={`${item}-${index}`}
											style={styles.optionButton}
											onPress={() =>
												onChooseAnswer({
													quesObj: question,
													index,
												})
											}
										>
											<ImageBackground
												source={selectedAnswer === index ? BgOptionSelected : BgOption}
												resizeMode="stretch"
												style={styles.optionBackground}
												imageStyle={styles.optionImage}
											>
												<Text style={styles.optionText}>{`${item}`}</Text>
											</ImageBackground>
										</TouchableOpacity>
									))}
							</View>
						</ScrollView>
					</View>
				</ImageBackground>
			</View>

			<View style={styles.viewButton}>
				<TouchableOpacity onPress={onSubmit} disabled={selectedAnswer === null}>
					<Image resizeMode="contain" style={styles.buttonImage} source={BtnSubmit} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3EFDC',
		alignItems: 'center',
	},
	backgroundImg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	contentWrapper: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	questionBgImg: {
		width: 350,
		height: 700,
		paddingTop: 30,
		paddingHorizontal: 30,
		justifyContent: 'flex-start',
	},
	questionHeader: {
		alignItems: 'center',
		marginBottom: 20,
	},
	questionCounter: {
		fontSize: 28,
		fontFamily: "'-RonySiswadi-Architect-3",
	},
	scrollWrapper: {
		marginTop: 160,
		height: '70%',
		width: '100%',
		padding: 10,
		// backgroundColor:'red'
	},

	scrollContent: {
		paddingBottom: 20,
	},

	questionText: {
		fontSize: 18,
		marginTop: 10,
		marginBottom: 20,
		textAlign: 'center',
	},
	optionsWrapper: {
		paddingHorizontal: 1,
	},

	viewButton: {
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	buttonImage: {
		height: 120,
		width: 120,
	},
	optionButton: {
		marginBottom: 10,
	},

	optionBackground: {
		paddingVertical: 10,
		justifyContent: 'center',
		borderRadius: 12,
	},

	optionImage: {
		borderRadius: 12,
		width: '100%',
	},

	optionText: {
		fontSize: 18,
		color: '#000',
		textAlign: 'center',
	},
});
