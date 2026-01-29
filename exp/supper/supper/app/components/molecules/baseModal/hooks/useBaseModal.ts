import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, State } from 'react-native-gesture-handler';

const useBaseModal = ({ onBackdropPress }: { onBackdropPress?: () => void }) => {
	const offset = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }],
	}));

	const pan = Gesture.Pan()
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;
			const clamp = Math.max(10, offsetDelta);
			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
		})
		.onFinalize((event) => {
			if (event.state === State.END) {
				if (event.velocityY > 500 || offset.value > 100) {
					if (onBackdropPress) {
						runOnJS(onBackdropPress)();
					}
					offset.value = withSpring(0);
				} else {
					offset.value = withSpring(0);
				}
			}
		});

	return {
		animatedStyle,
		pan,
	};
};

export default useBaseModal;
