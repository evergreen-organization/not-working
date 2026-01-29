import { colors } from 'configs';
import React, { useCallback } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { commonStyles } from 'styles';
import { darkenHexColor } from 'utils';
import { Text } from '../text';
import styles from './styles';
import { IAnimatedScaleViewProps } from './types';

const shadowDepth = 4;

const PrimaryButton = ({
	title,
	style,
	buttonStyle,
	shadowColor,
	leftIcon,
	rightIcon,
	iconStyle,
	isTitleBold,
	shadowStyle,
	children,
	titleStyle,
	fill = true,
	...props
}: IAnimatedScaleViewProps) => {
	const translateY = useSharedValue(0);

	const animatedButtonStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	const onPressIn = useCallback(() => {
		translateY.value = withTiming(shadowDepth, { duration: 100 });
	}, []);

	const onPressOut = useCallback(() => {
		translateY.value = withTiming(0, { duration: 100 });
	}, []);

	return (
		<Pressable
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			style={[fill && commonStyles.fill, style]}
			{...props}
		>
			<View>
				<Animated.View style={[styles.button, animatedButtonStyle, buttonStyle]}>
					{children ?? (
						<>
							{leftIcon && <Image source={leftIcon} style={[styles.icon, iconStyle]} />}
							<Text variant="P1" style={[styles.buttonText, titleStyle]} bold={isTitleBold}>
								{title}
							</Text>
							{rightIcon && <Image source={rightIcon} style={[styles.icon, iconStyle]} />}
						</>
					)}
				</Animated.View>
				<View
					style={[
						styles.shadow,
						{
							backgroundColor: darkenHexColor(shadowColor ?? colors.primary, 30),
						},
						shadowStyle,
					]}
				/>
			</View>
		</Pressable>
	);
};

export default PrimaryButton;
