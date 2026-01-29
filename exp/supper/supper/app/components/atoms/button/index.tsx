import React, { ReactNode, useMemo } from 'react';
import {
	ActivityIndicator,
	Image,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewStyle,
} from 'react-native';
import { styles } from './styles';
import { Text, TTextVariant } from 'atoms';
import { colors } from 'configs';
import { AnimatedScaleView } from 'molecules';

type TPreset = 'solid' | 'outline' | 'text';

export interface ButtonProps extends TouchableOpacityProps {
	preset?: TPreset;
	title?: string;
	leftIcon?: ImageSourcePropType;
	rightIcon?: ImageSourcePropType;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
	color?: string;
	labelStyle?: StyleProp<TextStyle>;
	iconStyle?: StyleProp<ImageStyle>;
	typography?: TTextVariant;
	testID?: string;
	children?: ReactNode;
	showOpacity?: boolean;
}

const getStyles = (preset: TPreset, color: string) => {
	if (preset === 'text') {
		return {
			container: styles.textPreset,
			color: { color },
			imageColor: { tintColor: color },
			loading: { color },
		};
	}

	if (preset === 'outline') {
		return {
			container: styles.outlinePreset,
			color: { color, borderColor: color },
			imageColor: { tintColor: color },
			loading: { color },
		};
	}

	if (preset === 'solid') {
		return {
			container: styles.solidPreset,
			color: { backgroundColor: color },
			imageColor: { tintColor: colors.white },
			loading: { color: colors.white },
		};
	}

	return {
		container: styles.solidPreset,
		color: { backgroundColor: color },
		imageColor: { tintColor: colors.white },
		loading: { color: colors.white },
	};
};

export const Button = (props: ButtonProps) => {
	const {
		preset = 'solid',
		title,
		leftIcon,
		rightIcon,
		loading = false,
		style,
		color = colors.primary,
		labelStyle,
		iconStyle,
		typography,
		children,
		showOpacity,
		testID,
		...rest
	} = props;

	const buttonStyle = useMemo(() => getStyles(preset, color), [preset, color]);
	const Wrapper = useMemo(
		() => (showOpacity ? TouchableOpacity : AnimatedScaleView),

		[],
	);

	return (
		<Wrapper
			testID={testID}
			style={[buttonStyle?.container?.button, buttonStyle?.color, style]}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator {...buttonStyle?.loading} />
			) : (
				<View style={styles.buttonContainer}>
					{leftIcon && (
						<Image
							source={leftIcon}
							style={[buttonStyle?.container?.icon, buttonStyle?.imageColor, iconStyle]}
						/>
					)}
					{!!title && (
						<Text
							variant={typography ?? 'P1'}
							style={[buttonStyle?.container?.label, buttonStyle?.color, labelStyle]}
						>
							{title}
						</Text>
					)}
					{rightIcon && (
						<Image
							source={rightIcon}
							style={[buttonStyle?.container?.icon, buttonStyle?.imageColor, iconStyle]}
						/>
					)}
					{children}
				</View>
			)}
		</Wrapper>
	);
};
