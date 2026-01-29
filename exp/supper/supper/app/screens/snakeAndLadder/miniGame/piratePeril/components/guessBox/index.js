import React from 'react';
import { View } from 'react-native';
import { Text } from 'atoms';
import { styles } from './styles';
import {
	convertHtmlToString,
	getDynamicBlockSize,
	getLengthOfLongestString,
} from 'screens/snakeAndLadder/utils/questionUtility';
import { getLeftShift } from 'screens/photoWall/utils';

export const GuessBox = ({ answer, letters }) => {
	const words = convertHtmlToString(answer).split(' ');
	const length = getLengthOfLongestString(words);
	const size = getDynamicBlockSize(length);

	let shiftValue;

	if (answer.length > 18) {
		shiftValue = getLeftShift(1);
	} else if (answer.length > 10) {
		shiftValue = getLeftShift(1.5);
	} else {
		shiftValue = getLeftShift(2.5);
	}

	return (
		<View style={styles.inputContainer}>
			{words?.map((word, indexes) => (
				<View key={indexes} style={styles.inputView}>
					{Array.from(word).map((letter, index) => (
						<View
							key={index}
							style={{
								...styles.letterBox,
								width: size,
								height: size + 10,
								marginHorizontal: shiftValue,
							}}
						>
							<Text
								as={Text.type.H2}
								key={index}
								style={{ ...styles.input, fontSize: Math.min(size, 18) }}
							>
								{letters.includes(letter) ? letter : ''}
							</Text>
						</View>
					))}
				</View>
			))}
		</View>
	);
};
