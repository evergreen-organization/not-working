import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withSequence,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from 'styles';

const SNAKE_HEIGHT = 500;
const SNAKE_WIDTH = Math.round((603 / 775) * SNAKE_HEIGHT);

const BOSS_HEIGHT = 240;
const BOSS_WIDTH = Math.round((769 / 495) * BOSS_HEIGHT);

export default function BossLevel() {
	const opacity = useSharedValue(0.3);

	const blink = () => {
		opacity.value = withSequence(
			withTiming(1, { duration: 500 }),
			withTiming(0.3, { duration: 500 }),
			withTiming(1, { duration: 500 }),
			withTiming(0.3, { duration: 500 }),
			withTiming(1, { duration: 500 }),
		);
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	return (
		<SafeAreaView style={[commonStyles.fill]}>
			<View style={styles.container}>
				<Image source={require('../image/snake.png')} style={styles.snake} />
				<Animated.Image
					source={require('../image/boss_level.png')}
					style={[styles.boss, animatedStyle]}
				/>
			</View>
			<Button title="blink!" onPress={blink} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
	},
	snake: {
		width: SNAKE_WIDTH,
		height: SNAKE_HEIGHT,
	},
	boss: {
		width: BOSS_WIDTH,
		height: BOSS_HEIGHT,
		position: 'absolute',
	},
});
