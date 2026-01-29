import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useTabBarAnimation = () => {
	const translateY = useRef(new Animated.Value(70)).current;

	useEffect(() => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, []);

	return { translateY };
};

export default useTabBarAnimation;
