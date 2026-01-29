import { Pressable } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import useAnimatedScaleView from './hooks/useAnimatedScaleView';
import { IAnimatedScaleViewProps } from './AnimatedScaleView';

const AnimatedScaleView = ({
	testID,
	onPress,
	disabled,
	style,
	children,
	containerStyle,
	...props
}: IAnimatedScaleViewProps) => {
	const { animatedStyle, onPressIn, onPressOut } = useAnimatedScaleView();

	return (
		<Pressable
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			testID={testID}
			accessibilityLabel={testID}
			onPress={onPress}
			disabled={disabled}
			style={[style]}
			{...props}
		>
			<Animated.View style={[containerStyle, animatedStyle]}>{children}</Animated.View>
		</Pressable>
	);
};

export default AnimatedScaleView;
