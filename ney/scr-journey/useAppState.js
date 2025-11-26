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

  const handleAppStateChange = nextState => {
    if (updatedState.current.match(/inactive|background/) && nextState === 'active') {
      setAppState(true);
    } else {
      setAppState(false);
    }
    updatedState.current = nextState;
  };

  return appState;
};

export default useAppState;
