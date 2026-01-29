import React from 'react';
import { KeyboardAvoidingView, StyleProp, ViewStyle } from 'react-native';
import { commonStyles } from 'styles';

export const AvoidKeyboard = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style: StyleProp<ViewStyle>;
}) => {
	return (
		<KeyboardAvoidingView
			style={[commonStyles.fill, style]}
			contentContainerStyle={[commonStyles.fill]}
			behavior="padding"
		>
			{children}
		</KeyboardAvoidingView>
	);
};

export default AvoidKeyboard;
