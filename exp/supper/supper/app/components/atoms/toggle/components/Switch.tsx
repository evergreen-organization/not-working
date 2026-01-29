import React from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SwitchToggleProps, ToggleInputProps } from '../types';
import { colors } from 'configs';
import { TextStyle, View, ViewStyle } from 'react-native';
import { $inputOuterVariants } from '../styles';
import { IconNew } from 'atoms';

export const Switch = (props: ToggleInputProps) => {
	const {
		on,
		status,
		disabled,
		outerStyle: $outerStyleOverride,
		innerStyle: $innerStyleOverride,
		detailStyle: $detailStyleOverride,
	} = props;

	const knobSizeFallback = 2;

	const knobWidth = [$detailStyleOverride?.width, $switchDetail?.width, knobSizeFallback].find(
		(v) => typeof v === 'number',
	);

	const knobHeight = [$detailStyleOverride?.height, $switchDetail?.height, knobSizeFallback].find(
		(v) => typeof v === 'number',
	);

	const offBackgroundColor = [
		disabled && colors.medium,
		status === 'error' && colors.errorBackground,
		colors.medium,
	].filter(Boolean)[0];

	const onBackgroundColor = [
		disabled && colors.transparent,
		status === 'error' && colors.errorBackground,
		colors.primary,
	].filter(Boolean)[0];

	const knobBackgroundColor = (function () {
		if (on) {
			return [
				$detailStyleOverride?.backgroundColor,
				status === 'error' && colors.error,
				disabled && colors.gray,
				colors.white,
			].filter(Boolean)[0];
		} else {
			return [
				$innerStyleOverride?.backgroundColor,
				disabled && colors.gray,
				status === 'error' && colors.error,
				colors.white,
			].filter(Boolean)[0];
		}
	})();

	const $animatedSwitchKnob = useAnimatedStyle(() => {
		const offsetLeft = ($innerStyleOverride?.paddingStart ||
			$innerStyleOverride?.paddingLeft ||
			$switchInner?.paddingStart ||
			$switchInner?.paddingLeft ||
			0) as number;

		const offsetRight = ($innerStyleOverride?.paddingEnd ||
			$innerStyleOverride?.paddingRight ||
			$switchInner?.paddingEnd ||
			$switchInner?.paddingRight ||
			0) as number;

		const start = withTiming(on ? '100%' : '0%');
		const marginStart = withTiming(on ? -(knobWidth || 0) - offsetRight : 0 + offsetLeft);

		return { start, marginStart };
	}, [on, knobWidth]);

	return (
		<View
			style={[
				$inputOuterVariants.switch,
				{ backgroundColor: offBackgroundColor },
				$outerStyleOverride,
			]}
		>
			<Animated.View
				style={[
					$switchInner,
					{ backgroundColor: onBackgroundColor },
					$innerStyleOverride,
					useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
				]}
			/>

			<SwitchAccessibilityLabel {...props} role="on" />
			<SwitchAccessibilityLabel {...props} role="off" />

			<Animated.View
				style={[
					$switchDetail,
					$detailStyleOverride,
					$animatedSwitchKnob,
					{ width: knobWidth, height: knobHeight },
					{ backgroundColor: knobBackgroundColor },
				]}
			/>
		</View>
	);
};

function SwitchAccessibilityLabel(props: ToggleInputProps & { role: 'on' | 'off' }) {
	const { on, disabled, status, switchAccessibilityMode, role, innerStyle, detailStyle } = props;

	if (!switchAccessibilityMode) {
		return null;
	}

	const shouldLabelBeVisible = (on && role === 'on') || (!on && role === 'off');

	const $switchAccessibilityStyle = [
		$switchAccessibility,
		role === 'off' && { end: '5%' },
		role === 'on' && { left: '5%' },
	];

	const color = (function () {
		if (disabled) {
			return colors.gray;
		}
		if (status === 'error') {
			return colors.error;
		}
		if (!on) {
			return innerStyle?.backgroundColor || colors.secondaryFont;
		}
		return detailStyle?.backgroundColor || colors.white;
	})();

	return (
		<View style={$switchAccessibilityStyle}>
			{switchAccessibilityMode === 'text' && shouldLabelBeVisible && (
				<View
					style={[
						role === 'on' && $switchAccessibilityLine,
						role === 'on' && { backgroundColor: color },
						role === 'off' && $switchAccessibilityCircle,
						role === 'off' && { borderColor: color },
					]}
				/>
			)}
			{switchAccessibilityMode === 'icon' && shouldLabelBeVisible && (
				<IconNew
					type={'material-community'}
					name={role === 'off' ? 'eye-off' : 'eye'}
					size={14}
					color={color}
				/>
			)}
		</View>
	);
}

const $switchDetail: SwitchToggleProps['inputDetailStyle'] = {
	borderRadius: 12,
	position: 'absolute',
	width: 24,
	height: 24,
};

const $switchInner: ViewStyle = {
	width: '100%',
	height: '100%',
	alignItems: 'center',
	borderColor: colors.transparent,
	overflow: 'hidden',
	position: 'absolute',
	paddingStart: 4,
	paddingEnd: 4,
};

const $switchAccessibility: TextStyle = {
	width: '40%',
	justifyContent: 'center',
	alignItems: 'center',
};

const $switchAccessibilityLine: ViewStyle = {
	width: 2,
	height: 12,
};

const $switchAccessibilityCircle: ViewStyle = {
	borderWidth: 2,
	width: 12,
	height: 12,
	borderRadius: 6,
};
