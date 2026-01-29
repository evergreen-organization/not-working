import { validationScheme } from './constant';

export const getQuestionArray = (questionObject) =>
	Object.values(questionObject).filter((item) => typeof item === 'string');

export const getInitialValue = (index) =>
	validationScheme[index]._nodes?.reduce(
		(acc, key) => ({ ...acc, [key]: '' }),
		{},
	);
