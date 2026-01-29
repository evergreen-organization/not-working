import { isIos } from 'constant';
import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useCustomKeyboard } from 'react-native-custom-keyboard';
import { commonStyles } from 'styles';
import styles from './styles';
import { ScrollView } from 'react-native';

const LoginFormWrapper = ({ children }: { children: ReactNode }) => {
	const Wrapper: any = isIos ? ScrollView : TouchableWithoutFeedback;

	const { isVisible, hideCustomKeyboard } = useCustomKeyboard();

	const onPress = () => {
		hideCustomKeyboard();
	};

	return (
		<Wrapper
			onPress={onPress}
			contentContainerStyle={[commonStyles.fill, commonStyles.justifyContentCenter]}
		>
			<View style={[isVisible && styles.avoidContainer, styles.container]}>{children}</View>
		</Wrapper>
	);
};

export default LoginFormWrapper;
