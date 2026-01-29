import React from 'react';
import { styles } from './styles';
import { ImageBackground, View } from 'react-native';
import { Text } from 'atoms';
import {
	convertHtmlToString,
	getDynamicBlockSize,
	getLengthOfLongestString,
} from 'screens/snakeAndLadder/utils/questionUtility';
import BgPanel from '../../../../assets/wordzzle/img_answer_panel.png';

export const AnswerBox = ({ answer, selectedCharacters }) => {
	const renderCharacterRow = () => {
		const words = convertHtmlToString(answer).split(' ');
		const length = getLengthOfLongestString(words);
		const size = getDynamicBlockSize(length);

		let count = -1;

		return words.map((word, indexes) => (
			<View key={indexes} style={styles.answerCharacter}>
				{word.split('')?.map((character, index) => {
					count += 1;
					return (
						<ImageBackground
							key={index}
							source={BgPanel}
							style={{
								...styles.answerKey,
								width: size,
								justifyContent: 'center',
								alignItems: 'center',
							}}
							imageStyle={{ borderRadius: 4 }}
							resizeMode="contain"
						>
							<Text bold as={Text.type.P2} style={{ fontSize: Math.min(size * 0.4, 15) }}>
								{selectedCharacters[count] ? selectedCharacters[count] : '  '}
							</Text>
						</ImageBackground>
					);
				})}
			</View>
		));
	};

	return (
		<View style={styles.answerView}>
			<View style={styles.bgView}>
				<View style={styles.answerCharacter}>{renderCharacterRow()}</View>
			</View>
		</View>
	);
};
