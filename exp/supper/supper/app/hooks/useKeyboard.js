import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard = () => {
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
		const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onKeyboardDidShow = useCallback((e) => {
		setKeyboardHeight(e.endCoordinates.height);
		setIsKeyboardVisible(true);
	}, []);

	const onKeyboardDidHide = useCallback(() => {
		setKeyboardHeight(0);
		setIsKeyboardVisible(false);
	}, []);

	return { keyboardHeight, isKeyboardVisible };
};

export default useKeyboard;
