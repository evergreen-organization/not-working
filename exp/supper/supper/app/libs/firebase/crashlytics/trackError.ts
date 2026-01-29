import crashlytics from '@react-native-firebase/crashlytics';

export enum ErrorType {
	USER_BOUND_ERROR = 'user_bound_error',
}

export const trackUserBoundError = ({
	userId,
	errorCode,
	errorMessage,
	status,
}: {
	userId?: string;
	errorCode: string;
	errorMessage: string;
	status: string;
}) => {
	crashlytics().setAttributes({
		type: ErrorType.USER_BOUND_ERROR,
		errorCode,
		errorMessage,
		status,
	});

	if (userId) {
		crashlytics().setUserId(userId);
	}

	crashlytics().log('User unbound error');
	crashlytics().recordError(new Error(`${errorCode}: ${errorMessage}`));
};
