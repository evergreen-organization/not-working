import React from 'react';
import { useWindowDimensions } from 'react-native';
import HomeBanner2 from 'assets/festive/home/meetings-widget.png';
import { styles } from './styles';
import Animated, { FadeIn } from 'react-native-reanimated';

export const FestiveWidget = () => {
	const { width } = useWindowDimensions();

	return (
		<Animated.View entering={FadeIn} style={styles.container}>
			<Animated.View style={[styles.animatedView, { width: width * 0.9 }]}>
				<Animated.Image
					source={HomeBanner2}
					style={[styles.animatedImage, { width: width * 0.9 }]}
				/>
			</Animated.View>
		</Animated.View>
	);
};
