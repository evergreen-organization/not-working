import {
	resetPasswordValidationScheme_1,
	resetPasswordValidationScheme_2,
	resetPasswordValidationScheme_3,
} from 'constant';

export const ERR_MSG_TRY_AGAIN = 'Please try again later.';

export const ERR_MSG_TRANSACTION_FAILED = 'Transaction Failed';

export const MSG_SUCCESSFUL = 'Successful';

export const MSG_PIN_ENROL_SUCCESS = 'PIN enrolled successfully';

export const MSG_ADID_UNLOCK_SUCCESS = 'AD ID unlocked successfully';

export const MSG_PASSWORD_RESET_SUCCESS = 'Password reset successfully';

export const ERR_MSG_MAX_ATTEMPTS =
	'Sorry, you have reached your maximum number of attempts.';

export const validationScheme = {
	0: resetPasswordValidationScheme_1,
	1: resetPasswordValidationScheme_2,
	2: resetPasswordValidationScheme_3,
};

export const answerKey = {
	0: 'questionOneAnswer',
	1: 'questionTwoAnswer',
	2: 'questionThreeAnswer',
};
