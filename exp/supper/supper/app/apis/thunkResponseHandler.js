export const handleThunkResponse = ({ result, rejectWithValue }) => {
	result.originalError = null;
	result.config = null;

	if (result.ok) {
		//* return problem if status is E *//
		if (result.data?.status === 'E') {
			return {
				...result,
				problem: result.data?.message,
			};
		}
		return result;
	}

	//* Return problem is http error *//
	const problem =
		result?.data?.error ?? result.problem ?? 'Unable to connect to server.';
	result.problem = problem;

	return rejectWithValue ? rejectWithValue(result) : result;
};
