import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
	const updatedState = useRef(AppState.currentState);
	const [appState, setAppState] = useState(true);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			subscription.remove();
		};
	}, []);

	const handleAppStateChange = (nextState) => {
		if (updatedState.current.match(/inactive|background/) && nextState === 'active') {
			setAppState(false);
		} else {
			setAppState(true);
		}
		updatedState.current = nextState;
	};

	return appState;
};

export default useAppState;
