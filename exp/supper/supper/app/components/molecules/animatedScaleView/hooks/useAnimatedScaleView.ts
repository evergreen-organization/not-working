import { useCallback } from 'react';
import {
	Easing,
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const TimeConfigurations = { duration: 50, easing: Easing.linear };

const useAnimatedScaleView = () => {
	const pressed = useSharedValue(false);

	const progress = useDerivedValue(() =>
		pressed.value ? withTiming(1, TimeConfigurations) : withTiming(0, TimeConfigurations),
	);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(progress.value, [0, 1], [1, 0.97], Extrapolate.CLAMP);

		return {
			transform: [{ scale }],
		};
	});

	const onPressIn = useCallback(() => {
		pressed.value = true;
	}, []);

	const onPressOut = useCallback(() => {
		pressed.value = false;
	}, []);

	return {
		animatedStyle,
		onPressIn,
		onPressOut,
	};
};

export default useAnimatedScaleView;
