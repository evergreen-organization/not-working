import React, { ComponentType, FC, useMemo } from 'react';
import {
	GestureResponderEvent,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewStyle,
} from 'react-native';
import { Text } from '../text';
import { colors, spacing } from 'configs';
import { Checkbox, FieldLabel, Radio, Switch } from './components';
import {
	CheckboxToggleProps,
	SwitchToggleProps,
	ToggleInputProps,
	ToggleProps,
} from './types';

export type Variants = 'checkbox' | 'switch' | 'radio';

export function Toggle(props: ToggleProps) {
	const {
		variant = 'checkbox',
		editable = true,
		status,
		value,
		onPress,
		onValueChange,
		labelPosition = 'right',
		helper,
		helperStyle,
		containerStyle: $containerStyleOverride,
		inputWrapperStyle: $inputWrapperStyleOverride,
		...WrapperProps
	} = props;
	const { switchAccessibilityMode } = props as SwitchToggleProps;
	const { checkboxIcon } = props as CheckboxToggleProps;
	const disabled =
		editable === false || status === 'disabled' || props.disabled;

	const Wrapper = useMemo<ComponentType<TouchableOpacityProps>>(
		() => (disabled ? View : TouchableOpacity),
		[disabled],
	);

	const ToggleInput = useMemo(
		() => ToggleInputs[variant] || (() => null),
		[variant],
	);
	const $containerStyles = [$containerStyleOverride];
	const $inputWrapperStyles = [$inputWrapper, $inputWrapperStyleOverride];
	const $helperStyles = [
		$helper,
		status === 'error' && { color: colors.error },
		helperStyle,
	];

	function handlePress(e: GestureResponderEvent) {
		if (disabled) {
			return;
		}
		onValueChange?.(!value);
		onPress?.(e);
	}

	return (
		<Wrapper
			activeOpacity={1}
			accessibilityRole={variant}
			accessibilityState={{ checked: value, disabled }}
			{...WrapperProps}
			style={$containerStyles}
			onPress={handlePress}
		>
			<View style={$inputWrapperStyles}>
				{labelPosition === 'left' && (
					<FieldLabel {...props} labelPosition={labelPosition} />
				)}

				<ToggleInput
					on={value}
					disabled={disabled}
					status={status}
					outerStyle={props.inputOuterStyle}
					innerStyle={props.inputInnerStyle}
					detailStyle={props.inputDetailStyle}
					switchAccessibilityMode={switchAccessibilityMode}
					checkboxIcon={checkboxIcon}
				/>

				{labelPosition === 'right' && (
					<FieldLabel {...props} labelPosition={labelPosition} />
				)}
			</View>

			{!!helper && <Text style={$helperStyles}>{helper}</Text>}
		</Wrapper>
	);
}

const ToggleInputs: Record<Variants, FC<ToggleInputProps>> = {
	checkbox: Checkbox,
	switch: Switch,
	radio: Radio,
};

const $inputWrapper: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
};

const $helper: TextStyle = {
	marginTop: spacing.xs,
};
