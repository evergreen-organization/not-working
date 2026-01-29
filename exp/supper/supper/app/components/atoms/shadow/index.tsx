import { StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { ShadowedView } from 'react-native-fast-shadow';
import styles from './styles';

const Shadow = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) => {
	return <ShadowedView style={[styles.shadow, style]}>{children}</ShadowedView>;
};

export default Shadow;
