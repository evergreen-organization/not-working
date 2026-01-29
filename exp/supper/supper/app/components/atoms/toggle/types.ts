import {
	ImageStyle,
	StyleProp,
	SwitchProps,
	TextInputProps,
	TextStyle,
	TouchableOpacityProps,
	ViewStyle,
} from 'react-native';
import { IconObject } from 'atoms';

export interface BaseToggleProps extends Omit<TouchableOpacityProps, 'style'> {
	/**
	 * The variant of the toggle.
	 * Options: "checkbox", "switch", "radio"
	 * Default: "checkbox"
	 */
	variant?: unknown;
	/**
	 * A style modifier for different input states.
	 */
	status?: 'error' | 'disabled';
	/**
	 * If false, input is not editable. The default value is true.
	 */
	editable?: TextInputProps['editable'];
	/**
	 * The value of the field. If true the component will be turned on.
	 */
	value?: boolean;
	/**
	 * Invoked with the new value when the value changes.
	 */
	onValueChange?: SwitchProps['onValueChange'];
	/**
	 * Style overrides for the container
	 */
	containerStyle?: StyleProp<ViewStyle>;
	/**
	 * Style overrides for the input wrapper
	 */
	inputWrapperStyle?: StyleProp<ViewStyle>;
	/**
	 * Optional input wrapper style override.
	 * This gives the inputs their size, shape, "off" background-color, and outer border.
	 */
	inputOuterStyle?: ViewStyle;
	/**
	 * Optional input style override.
	 * This gives the inputs their inner characteristics and "on" background-color.
	 */
	inputInnerStyle?: ViewStyle;
	/**
	 * The position of the label relative to the action component.
	 * Default: right
	 */
	labelPosition?: 'left' | 'right';
	/**
	 * The label text to display if not using `labelTx`.
	 */
	label?: string;
	/**
	 * Style overrides for label text.
	 */
	labelStyle?: StyleProp<TextStyle>;
	/**
	 * The helper text to display if not using `helperTx`.
	 */
	helper?: string;
	/**
	 * Style overrides for helper text.
	 */
	helperStyle?: StyleProp<TextStyle>;
}

export interface CheckboxToggleProps extends BaseToggleProps {
	variant?: 'checkbox';
	/**
	 * Optional style prop that affects the Image component.
	 */
	inputDetailStyle?: ImageStyle;
	/**
	 * Checkbox-only prop that changes the icon used for the "on" state.
	 */
	checkboxIcon?: IconObject;
}

interface RadioToggleProps extends BaseToggleProps {
	variant?: 'radio';
	/**
	 * Optional style prop that affects the dot View.
	 */
	inputDetailStyle?: ViewStyle;
}

export interface SwitchToggleProps extends BaseToggleProps {
	variant?: 'switch';
	/**
	 * Switch-only prop that adds a text/icon label for on/off states.
	 */
	switchAccessibilityMode?: 'text' | 'icon';
	/**
	 * Optional style prop that affects the knob View.
	 * Note: `width` and `height` rules should be points (numbers), not percentages.
	 */
	inputDetailStyle?: Omit<ViewStyle, 'width' | 'height'> & {
		width?: number;
		height?: number;
	};
}

export type ToggleProps =
	| CheckboxToggleProps
	| RadioToggleProps
	| SwitchToggleProps;

export interface ToggleInputProps {
	on: boolean;
	status: BaseToggleProps['status'];
	disabled: boolean;
	outerStyle: ViewStyle;
	innerStyle: ViewStyle;
	detailStyle: Omit<ViewStyle & ImageStyle, 'overflow'>;
	switchAccessibilityMode?: SwitchToggleProps['switchAccessibilityMode'];
	checkboxIcon?: CheckboxToggleProps['checkboxIcon'];
}
