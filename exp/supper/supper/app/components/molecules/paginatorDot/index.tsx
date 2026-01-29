import { colors } from 'configs';
import React from 'react';
import Animated, {
	interpolate,
	interpolateColor,
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import styles from './styles';
import { StyleProp, ViewStyle } from 'react-native';

const PaginatorDot = ({
	currentWidth,
	index,
	scrollX,
	dotStyle,
	dotWidth = [10, 20, 10],
}: {
	currentWidth: number;
	index: number;
	scrollX: SharedValue<number>;
	dotStyle?: StyleProp<ViewStyle>;
	dotWidth?: number[];
}) => {
	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [
			(index - 1) * currentWidth,
			index * currentWidth,
			(index + 1) * currentWidth,
		];
		const width = interpolate(scrollX.value, inputRange, dotWidth, 'clamp');
		const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], 'clamp');
		const backgroundColor = interpolateColor(scrollX.value, inputRange, [
			colors.paginatorInactive,
			colors.primary,
			colors.paginatorInactive,
		]);

		return {
			width,
			opacity: opacity,
			backgroundColor: backgroundColor,
		};
	});

	return <Animated.View style={[styles.dot, animatedStyle, dotStyle]} />;
};

export default PaginatorDot;
