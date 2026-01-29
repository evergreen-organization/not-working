// components/SwordSwing.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
	withDelay,
} from 'react-native-reanimated';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

const SWORD_HEIGHT = 300;
const SWORD_WIDTH = Math.round((845 / 927) * SWORD_HEIGHT);
const SNAKE_HEIGHT = 300;
const SNAKE_WIDTH = Math.round((603 / 775) * SNAKE_HEIGHT);
const ATTACK_HEIGHT = 80;
const ATTACK_WIDTH = Math.round((780 / 185) * ATTACK_HEIGHT);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SwordSwing({ onFinish = () => {} }) {
	const rotation = useSharedValue(0);

	useEffect(() => {
		playSoundEffect(PBDASH_SOUND.SLAY_BOSS.audio);

		rotation.value = withTiming(120, { duration: 600 }, () => {
			rotation.value = withDelay(
				1000,
				withTiming(120, {}, () => {
					runOnJS(onFinish)();
				}),
			);
		});
	}, []);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateY: SWORD_HEIGHT / 2 },
			{ rotateZ: `${rotation.value}deg` },
			{ translateY: -SWORD_HEIGHT / 2 },
		],
	}));

	return (
		<View style={styles.container}>
			<Image source={require('../image/snake.png')} style={styles.snake} />
			<Animated.Image
				source={require('../image/sword.png')}
				style={[styles.sword, animatedStyle]}
				resizeMode="contain"
			/>
			<Image source={require('../image/attack.png')} style={styles.attack} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000aa',
		zIndex: 9999,
	},
	sword: {
		width: SWORD_WIDTH,
		height: SWORD_HEIGHT,
		position: 'absolute',
		right: SCREEN_WIDTH / 2,
		bottom: SCREEN_HEIGHT / 2,
	},
	snake: {
		width: SNAKE_WIDTH,
		height: SNAKE_HEIGHT,
	},
	attack: {
		width: ATTACK_WIDTH,
		height: ATTACK_HEIGHT,
		position: 'absolute',
	},
});
