import { useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const THRESHOLD = 100;

const useLoginForm = ({ onBack }: { onBack: () => void }) => {
	const translateY = useSharedValue(0);

	const handleThresholdReached = useCallback(() => {
		onBack();
	}, []);

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			translateY.value = event.translationY;
		})
		.onEnd(() => {
			if (translateY.value > THRESHOLD) {
				runOnJS(handleThresholdReached)();
			}
			translateY.value = withSpring(0);
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	return {
		panGesture,
		animatedStyle,
	};
};

export default useLoginForm;
