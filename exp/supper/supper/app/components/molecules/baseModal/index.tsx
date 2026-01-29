import { isIos } from 'constant';
import { useKeyboard } from 'hooks';
import React, { ReactNode, useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
	runOnJS,
	SlideInDown,
	SlideOutDown,
} from 'react-native-reanimated';
import { commonStyles } from 'styles';
import useBaseModal from './hooks/useBaseModal';
import styles from './styles';
import { IBaseModalProps } from './types';
import { Portal } from 'react-native-portal';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const BaseModal = ({
	visible,
	onBackdropPress,
	children,
	style,
	containerStyle,
	onModalHide,
	avoidKeyboard,
	onModalShow,
	testID,
	showLine,
}: IBaseModalProps) => {
	const { animatedStyle, pan } = useBaseModal({ onBackdropPress });

	const AnimatedComponent = useMemo(
		() => (
			<Animated.View
				layout={LinearTransition}
				style={[styles.contentContainer, animatedStyle, containerStyle]}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>
				{showLine && <View style={styles.line} />}
				{avoidKeyboard ? <KeyboardAwareView>{children}</KeyboardAwareView> : children}
			</Animated.View>
		),

		[children],
	);

	if (!visible) {
		return null;
	}

	return (
		<Portal>
			<View testID={testID} style={[styles.container, style]}>
				<AnimatedTouchableOpacity
					activeOpacity={1}
					style={styles.backdrop}
					onPress={onBackdropPress}
					entering={FadeIn.withCallback((finished) => {
						if (finished && onModalShow) {
							runOnJS(onModalShow)();
						}
					})}
					exiting={FadeOut.withCallback((finished) => {
						if (finished && onModalHide) {
							runOnJS(onModalHide)();
						}
					})}
				/>
				{isIos ? (
					<GestureDetector gesture={pan}>{AnimatedComponent}</GestureDetector>
				) : (
					AnimatedComponent
				)}
			</View>
		</Portal>
	);
};

export default BaseModal;

const KeyboardAwareView = ({ children }: { children: ReactNode }) => {
	const { keyboardHeight, isKeyboardVisible } = useKeyboard();
	const bottom = useMemo(
		() => (isKeyboardVisible ? keyboardHeight - 60 : 0),
		[keyboardHeight, isKeyboardVisible],
	);

	return (
		<ScrollView
			scrollEnabled={true}
			nestedScrollEnabled
			style={{
				paddingBottom: bottom,
			}}
			bounces={false}
			contentContainerStyle={[commonStyles.flexGrow, commonStyles.justifyContentEnd]}
		>
			{children}
		</ScrollView>
	);
};
