import React, { memo } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import PBExLogo from '../../../../assets/pbExLogo.png';
import { styles } from '../../login/styles';

const AnimatedLogo = () => {
	const offset = useSharedValue({ x: 0, y: 0 });
	const start = useSharedValue({ x: 0, y: 0 });
	const scale = useSharedValue(1);
	const rotation = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: offset.value.x },
				{ translateY: offset.value.y },
				{ scale: scale.value },
				{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
			],
		};
	});

	const dragGesture = Gesture.Pan()
		.onUpdate((e) => {
			// Calculate the distance using the Pythagorean theorem: sqrt(x^2 + y^2)
			const distance = Math.sqrt(Math.pow(e.translationX, 2) + Math.pow(e.translationY, 2));
			const dragFactor = 1 / (1 + distance * 0.005);
			offset.value = {
				x: start.value.x + e.translationX * dragFactor,
				y: start.value.y + e.translationY * dragFactor,
			};
			const scaleFactor = 0.005;
			scale.value = Math.min(1 + distance * scaleFactor, 1.2);
		})
		.onEnd(() => {
			offset.value = {
				x: withSpring(start.value.x),
				y: withSpring(start.value.y),
			};
		})
		.onFinalize(() => {
			scale.value = withTiming(1, { duration: 100 });
		});

	return (
		<View style={styles.rotationGestureContainer}>
			<GestureDetector gesture={dragGesture}>
				<Animated.View style={[animatedStyles]}>
					<Image source={PBExLogo} style={styles.appLogo} />
				</Animated.View>
			</GestureDetector>
		</View>
	);
};

export default memo(AnimatedLogo);
