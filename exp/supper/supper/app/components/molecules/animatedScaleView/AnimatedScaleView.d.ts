import { ReactNode } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface IAnimatedScaleViewProps extends PressableProps {
	testID?: string;
	onPress?: (value?: any) => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	children?: ReactNode;
}
