import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const useAppActive = () => {
	const appState = useRef(AppState.currentState);
	const [isAppActive, setIsAppActive] = useState(true);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				setIsAppActive(true);
			} else {
				setIsAppActive(false);
			}
			appState.current = nextAppState;
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return isAppActive;
};

export default useAppActive;
