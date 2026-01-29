import { PIRATE_BACKGROUND } from './config';
import { convertHtmlToString } from 'screens/snakeAndLadder/utils/questionUtility';

const areAllLettersIncluded = (arr1, arr2) => arr1.every((item) => arr2.includes(item));

const getUniqueLetter = (string) => [...new Set(Array.from(string.split(' ').join('')))];

export const isCorrectAnswer = (answer, letters) =>
	areAllLettersIncluded(getUniqueLetter(answer), letters);

export const getBackgroundImage = (attemptStatus) => {
	return PIRATE_BACKGROUND[attemptStatus];
};

export const indicateAnswer = (questionArray, currentIndex) => {
	if (!questionArray || questionArray.length === 0) {
		return '';
	}

	const current = questionArray[currentIndex];
	if (!current || !Array.isArray(current.options)) {
		return '';
	}

	return current.options[0]?.toUpperCase().trim() || '';
};

export const indicateTopic = (questionArray, currentIndex) => {
	if (!questionArray || questionArray.length === 0) {
		return '';
	}
	const { questionText } = questionArray[currentIndex];
	return convertHtmlToString(questionText)?.toUpperCase();
};
