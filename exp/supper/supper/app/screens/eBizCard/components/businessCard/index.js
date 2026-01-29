import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { commonStyles } from 'styles';
import { BackCard } from './components/BackCard';
import { FrontCard } from './components/FrontCard';
import { styles } from './Style';

export const BusinessCard = ({ cardImage, cardInfo }) => {
	const rotate = useSharedValue(Number(false));
	const [isFlipped, setIsFlipped] = useState(false);

	const faceStyle = useAnimatedStyle(() => ({
		transform: [{ rotateY: `${rotate.value * 180}deg` }],
	}));

	const backStyle = useAnimatedStyle(() => ({
		transform: [{ rotateY: `${rotate.value * 180 + 180}deg` }],
	}));

	const handlePress = () => {
		rotate.value = withTiming(Number(!isFlipped));
		setTimeout(() => setIsFlipped(!isFlipped), 120);
	};

	return (
		<Pressable
			style={[commonStyles.fill, commonStyles.alignItemsCenter, styles.businessCardContainer]}
			onPress={handlePress}
		>
			{isFlipped ? (
				<Animated.View style={backStyle}>
					<BackCard cardImage={cardImage} />
				</Animated.View>
			) : (
				<Animated.View style={faceStyle}>
					<FrontCard cardInfo={cardInfo} />
				</Animated.View>
			)}
		</Pressable>
	);
};
