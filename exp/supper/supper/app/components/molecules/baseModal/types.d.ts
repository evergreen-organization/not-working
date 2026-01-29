import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IBaseModalProps {
	visible: boolean;
	children: React.ReactNode;
	onBackdropPress?: () => void;
	style?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	onModalHide?: () => void;
	avoidKeyboard?: boolean;
	onModalShow?: () => void;
	testID?: string;
	showLine?: boolean;
}
