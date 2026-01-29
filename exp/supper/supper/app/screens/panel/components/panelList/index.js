import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import PanelListComp from './component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PanelList = ({ onMomentumScrollEnd, children }, ref) => {
	const [bottomHeight, setBottomHeight] = useState(0);
	const keyboardDidShowListener = useRef();
	const keyboardDidHideListener = useRef();
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const insets = useSafeAreaInsets();

	useEffect(() => {
		setBottomHeight(insets.bottom);

		keyboardDidShowListener.current = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
		keyboardDidHideListener.current = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

		return () => {
			keyboardDidShowListener.current.remove();
			keyboardDidHideListener.current.remove();
		};
	}, []);

	const _keyboardDidShow = () => setKeyboardVisible(true);
	const _keyboardDidHide = () => setKeyboardVisible(false);

	const props = {
		onMomentumScrollEnd,
		bottomHeight,
		keyboardVisible,
		children,
	};

	return <PanelListComp {...props} ref={ref} />;
};

export default forwardRef(PanelList);
