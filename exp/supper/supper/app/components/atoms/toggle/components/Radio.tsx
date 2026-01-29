import React from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ToggleInputProps } from '../types';
import { colors } from 'configs';
import { $inputOuterVariants } from '../styles';
import { View, ViewStyle } from 'react-native';

export const Radio = (props: ToggleInputProps) => {
	const {
		on,
		status,
		disabled,
		outerStyle: $outerStyleOverride,
		innerStyle: $innerStyleOverride,
		detailStyle: $detailStyleOverride,
	} = props;

	const offBackgroundColor = [
		disabled && colors.medium,
		status === 'error' && colors.errorBackground,
		colors.background,
	].filter(Boolean)[0];

	const outerBorderColor = [
		disabled && colors.medium,
		status === 'error' && colors.error,
		!on && colors.medium,
		colors.primary,
	].filter(Boolean)[0];

	const onBackgroundColor = [
		disabled && colors.transparent,
		status === 'error' && colors.errorBackground,
		colors.secondary,
	].filter(Boolean)[0];

	const dotBackgroundColor = [
		disabled && colors.gray,
		status === 'error' && colors.error,
		colors.primary,
	].filter(Boolean)[0];

	return (
		<View
			style={[
				$inputOuterVariants.radio,
				{ backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
				$outerStyleOverride,
			]}
		>
			<Animated.View
				style={[
					$radioInner,
					{ backgroundColor: onBackgroundColor },
					$innerStyleOverride,
					useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
				]}
			>
				<View
					style={[$radioDetail, { backgroundColor: dotBackgroundColor }, $detailStyleOverride]}
				/>
			</Animated.View>
		</View>
	);
};

const $radioInner: ViewStyle = {
	width: '100%',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
};

const $radioDetail: ViewStyle = {
	width: 10,
	height: 10,
	borderRadius: 6,
};
