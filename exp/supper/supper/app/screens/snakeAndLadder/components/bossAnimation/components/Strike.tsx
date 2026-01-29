// components/StrikeAnimation.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

const CLAW_HEIGHT = 360;
const CLAW_WIDTH = Math.round((845 / 927) * CLAW_HEIGHT);
const SNAKE_HEIGHT = 300;
const SNAKE_WIDTH = Math.round((603 / 775) * SNAKE_HEIGHT);
const ATTACK_HEIGHT = 80;
const ATTACK_WIDTH = Math.round((780 / 185) * ATTACK_HEIGHT);

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function StrikeAnimation({ onFinish = () => {} }) {
	const opacity = useSharedValue(0);

	useEffect(() => {
		playSoundEffect(PBDASH_SOUND.SLAY_BOSS.audio);

		opacity.value = withTiming(1, { duration: 600 }, () => {
			opacity.value = withDelay(
				1000,
				withTiming(1, {}, () => {
					runOnJS(onFinish)();
				}),
			);
		});
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<View style={styles.container}>
			<Image source={require('../image/snake.png')} style={styles.snake} />
			<Image source={require('../image/strike.png')} style={styles.attack} />
			<Animated.Image
				source={require('../image/claw.png')}
				style={[styles.claw, animatedStyle]}
				resizeMode="contain"
			/>
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
	claw: {
		width: CLAW_WIDTH,
		height: CLAW_HEIGHT,
		position: 'absolute',
		top: SCREEN_HEIGHT / 2,
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
