const getUserMemorableQuestions = {
	data: {
		error: null,
		questionOne: 'What is the name of your favorite pet?',
		questionThree: 'What is your favorite food?',
		questionTwo: 'Who is your favorite author?',
		response: true,
	},
	ok: true,
	status: 200,
};

export const AdidData = Object.assign(
	{},
	{
		MemorableQuestions: getUserMemorableQuestions,
	},
);
