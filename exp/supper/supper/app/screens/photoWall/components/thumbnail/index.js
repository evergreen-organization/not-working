import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { AnimatedScaleView } from 'molecules';

export const Thumbnail = ({ data, onPress, index }) => {
	return (
		<AnimatedScaleView onPress={(e) => onPress(data.id, e)}>
			<Animated.View
				entering={FadeInRight.delay((index + 1) * 300)}
				activeOpacity={0.9}
				key={data.id}
				style={styles.container}
			>
				<Image style={styles.image} source={data.thumbnail} resizeMode="stretch" />
			</Animated.View>
		</AnimatedScaleView>
	);
};
