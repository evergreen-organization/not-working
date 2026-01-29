import React, { forwardRef } from 'react';
import { Animated, Dimensions } from 'react-native';

import { styles } from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export const PanelListComp = (
	{ onMomentumScrollEnd, bottomHeight, keyboardVisible, children },
	ref,
) => {
	return (
		<Animated.ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			decelerationRate={0}
			snapToInterval={CARD_WIDTH + 10}
			onMomentumScrollEnd={onMomentumScrollEnd}
			style={[styles.scrollView, { marginBottom: bottomHeight }]}
			contentContainerStyle={styles.scrollViewContain}
			pagingEnabled
			ref={ref}
		>
			{!keyboardVisible && children}
		</Animated.ScrollView>
	);
};

export default forwardRef(PanelListComp);
