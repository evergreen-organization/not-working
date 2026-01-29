import { useEffect } from 'react';
import { captureMessage } from '@sentry/react-native';

const useCaptureErrorMessage = ({ error }: { error: { title: string; message: string } }) => {
	// to capture error as information message
	useEffect(() => {
		if (error?.message) {
			captureMessage(error?.message, 'info');
		}
	}, [error]);
};

export default useCaptureErrorMessage;
