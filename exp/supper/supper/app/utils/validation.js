export const idRegex = /^[0-9a-zA-Z]{1,10}$/;

const validateUserId = (id) => {
	if (!id) {
		return { ok: false, error: 'Fill in all fields' };
	}
	if (!idRegex.test(id.trim())) {
		return {
			ok: false,
			error: 'ID should be alphanumeric and max length is 10',
		};
	}
	return { ok: true, error: null };
};

const validatePassword = (password) => {
	if (!password) {
		return { ok: false, error: 'Fill in all fields' };
	}
	if (password.length > 100) {
		return { ok: false, error: 'Password max length is 100' };
	}
	return { ok: true, error: null };
};

export const validateUserCredentials = (id, password) => {
	const validUserId = validateUserId(id);
	const validPassword = validatePassword(password);
	if (validUserId.ok && validPassword.ok) {
		return { ok: true, error: null };
	}
	if (!validUserId.ok) {
		return validUserId;
	}
	return validPassword;
};
