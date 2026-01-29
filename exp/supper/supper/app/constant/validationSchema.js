import * as Yup from 'yup';

const validationMessage = {
	minLength: 'Answer must be more than 2 characters',
	sameQuestion: 'Question must not be same',
	sameAnswer: 'Answer must not be the same',
	required: 'Required',
	pwMinLength: 'Password must be at least 15 characters',
	pwMismatch: 'Passwords do not match',
};

const inputMinLength = {
	answer: 3,
	password: 15,
};

export const validationSchema = Yup.object().shape({
	questionOneAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.notOneOf(
			[Yup.ref('questionTwoAnswer'), Yup.ref('questionThreeAnswer')],
			validationMessage.sameAnswer,
		)
		.required(validationMessage.required),
	questionTwoAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.notOneOf(
			[Yup.ref('questionOneAnswer'), Yup.ref('questionThreeAnswer')],
			validationMessage.sameAnswer,
		)
		.required(validationMessage.required),
	questionThreeAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.notOneOf(
			[Yup.ref('questionOneAnswer'), Yup.ref('questionTwoAnswer')],
			validationMessage.sameAnswer,
		)
		.required(validationMessage.required),
	questionOneId: Yup.number()
		.required(validationMessage.required)
		.notOneOf(
			[Yup.ref('questionTwoId'), Yup.ref('questionThreeId')],
			validationMessage.sameQuestion,
		),
	questionTwoId: Yup.number()
		.required(validationMessage.required)
		.notOneOf(
			[Yup.ref('questionOneId'), Yup.ref('questionThreeId')],
			validationMessage.sameQuestion,
		),
	questionThreeId: Yup.number()
		.required(validationMessage.required)
		.notOneOf([Yup.ref('questionOneId'), Yup.ref('questionTwoId')], validationMessage.sameQuestion),
});

export const resetPasswordValidationScheme_1 = Yup.object().shape({
	questionOneAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.required(validationMessage.required),
});

export const resetPasswordValidationScheme_2 = Yup.object().shape({
	questionTwoAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.required(validationMessage.required),
});

export const resetPasswordValidationScheme_3 = Yup.object().shape({
	questionThreeAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.required(validationMessage.required),
});

export const unlockAD = Yup.object().shape({
	questionOneAnswer: Yup.string()
		.min(inputMinLength.answer, () => validationMessage.minLength)
		.required(validationMessage.required),
});

export const newPassword = Yup.object().shape({
	pWord: Yup.string()
		.min(inputMinLength.password, validationMessage.pwMinLength)
		.required(validationMessage.required),
	confirm: Yup.string()
		.min(inputMinLength.password, validationMessage.pwMinLength)
		.oneOf([Yup.ref('pWord')], validationMessage.pwMismatch)
		.required(validationMessage.required),
});
