import { JUMBLE_STATUS } from './constant';
export const isCorrectAnswer = (string, selectedCharacters) => {
	if (!string || !selectedCharacters || selectedCharacters.length === 0) {
		return false;
	}

	return string.trim().split(' ').join('') === selectedCharacters.join('');
};

export const shuffleCharacters = (inputString, desiredLength = 18) => {
	if (!inputString) {
		return [];
	}
	// Remove spaces from the input string and convert to uppercase
	const sanitizedInput = inputString.replace(/\s/g, '').toUpperCase();

	// Shuffle the characters of the sanitized input string
	const shuffledString = sanitizedInput
		.split('')
		.sort(() => 0.5 - Math.random())
		.join('');

	// Calculate how many random characters to add
	const randomCharNum = desiredLength - shuffledString.length;

	// Generate an array of random alphabets
	const randomAlphabets = Array.from(
		{ length: randomCharNum > 0 ? randomCharNum : 8 },
		() => String.fromCharCode(Math.floor(Math.random() * 26) + 65), // Generates a random uppercase alphabet (A-Z)
	);

	// Combine the shuffled string and random characters
	const resultString = shuffledString + randomAlphabets.join('');

	// Shuffle the result string again for added randomness into string array
	return resultString.split('').sort(() => 0.5 - Math.random());
};

export const checkEndGame = (status) =>
	status === JUMBLE_STATUS.WIN || status === JUMBLE_STATUS.LOST || status === JUMBLE_STATUS.END;

export const getShiftedArray = (array) => {
	const tempArray = array;
	tempArray.pop();
	return tempArray;
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

export const indicateHint = (questionArray, currentIndex) => {
	if (!questionArray || questionArray.length === 0) {
		return [];
	}

	const current = questionArray[currentIndex];
	if (!current || !current.questionText) {
		return [];
	}

	// Ensure questionText is an array, then flatten and split by `;`
	const hints = Array.isArray(current.questionText) ? current.questionText : [current.questionText];

	return hints
		.flatMap((q) => q.split(';')) // split by semicolon
		.map((hint) => hint.trim()) // trim whitespace
		.filter(Boolean); // remove empty strings
};
