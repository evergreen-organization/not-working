import React from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ToggleInputProps } from '../types';
import { colors } from 'configs';

import { $inputOuterVariants } from '../styles';
import { IconNew } from 'atoms';

export const Checkbox = (props: ToggleInputProps) => {
	const {
		on,
		status,
		disabled,
		checkboxIcon,
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

	const iconTintColor = [
		disabled && colors.gray,
		status === 'error' && colors.error,
		colors.primary,
	].filter(Boolean)[0];

	return (
		<View
			style={[
				$inputOuterVariants.checkbox,
				{ backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
				$outerStyleOverride,
			]}
		>
			<Animated.View
				style={[
					$checkboxInner,
					{ backgroundColor: onBackgroundColor },
					$innerStyleOverride,
					useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
				]}
			>
				{checkboxIcon || (
					<IconNew
						type={'material'}
						name={'check'}
						size={15}
						color={iconTintColor}
						style={$detailStyleOverride}
					/>
				)}
			</Animated.View>
		</View>
	);
};

const $checkboxInner: ViewStyle = {
	width: '100%',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
};
