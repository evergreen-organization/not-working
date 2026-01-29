import React from 'react';
import { InfoView } from 'organisms';
import styles from './styles';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export const LoginInfo = ({
	icon,
	title,
	description,
	leftButtonTitle,
	rightButtonTitle,
	onLeftPress,
	onRightPress,
}) => {
	return (
		<Animated.View style={styles.container} entering={SlideInDown} exiting={SlideOutDown}>
			<InfoView
				icon={icon}
				title={title}
				description={description}
				leftButtonTitle={leftButtonTitle}
				rightButtonTitle={rightButtonTitle}
				onLeftPress={onLeftPress}
				onRightPress={onRightPress}
			/>
		</Animated.View>
	);
};
