import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from 'react-native-reanimated';
import { IProgressBar } from './types';
import styles from './styles';

const ProgressBar: React.FC<IProgressBar> = ({
	progress,
	color,
	unfilledColor,
}) => {
	const animatedProgress = useSharedValue(0);

	useEffect(() => {
		animatedProgress.value = withTiming(progress, {
			duration: 500,
			easing: Easing.bounce,
		});
		//eslint-disable-next-line
	}, [progress]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${animatedProgress.value}%`,
			backgroundColor: color,
		};
	});

	return (
		<View style={[styles.container, { backgroundColor: unfilledColor }]}>
			<Animated.View style={[styles.progressBar, animatedStyle]} />
		</View>
	);
};

export default ProgressBar;
