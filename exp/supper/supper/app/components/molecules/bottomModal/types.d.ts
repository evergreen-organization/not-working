import { StyleProp, ViewStyle } from 'react-native';

export interface IBottomModalProps {
	children: React.ReactNode;
	isVisible: boolean;
	onCancel?: () => void;
	onConfirm?: () => void;
	onModalHide?: () => void;
	avoidKeyboard?: boolean;
	testID?: string;
	containerStyle?: StyleProp<ViewStyle>;
	fullHeight?: boolean;
	showLine?: boolean;
	hideCancel?: boolean;
}
