import { useState } from 'react';

const useImageLoading = () => {
	const [isLoading, setIsLoading] = useState(true);

	const onLoadEnd = () => {
		setIsLoading(false);
	};

	const onLoadStart = () => {
		setIsLoading(true);
	};

	return { isLoading, onLoadStart, onLoadEnd };
};

export default useImageLoading;
