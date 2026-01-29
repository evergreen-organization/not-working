import { useDispatch, useSelector } from 'react-redux';
import { getAdAuthentication, getUserMemorableQuestions } from 'stores';

export const useChallenge = () => {
	const dispatch = useDispatch();
	const { questions } = useSelector(getAdAuthentication) || {};

	const getQuestions = async ({ init = false }) => {
		if (!init && questions.questionOne) {
			return true;
		}
		const { payload } = await dispatch(getUserMemorableQuestions());
		const { status, data } = payload;
		return !!(status === 200 && data?.questionOne);
	};

	return { getQuestions };
};
