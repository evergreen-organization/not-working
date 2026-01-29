import {
	ImageSourcePropType,
	ImageStyle,
	PressableProps,
	StyleProp,
	TextStyle,
	ViewStyle,
} from 'react-native';

export interface IAnimatedScaleViewProps extends PressableProps {
	title: string;
	style?: StyleProp<ViewStyle>;
	buttonStyle?: StyleProp<ViewStyle>;
	shadowStyle?: StyleProp<ViewStyle>;
	shadowColor?: string;
	leftIcon?: ImageSourcePropType;
	rightIcon?: ImageSourcePropType;
	iconStyle?: StyleProp<ImageStyle>;
	isTitleBold?: boolean;
	children?: ReactNode;
	fill?: boolean;
	titleStyle?: StyleProp<TextStyle>;
}
