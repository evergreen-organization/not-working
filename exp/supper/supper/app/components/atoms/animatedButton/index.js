import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const AnimatedButton = ({ onPress, icon, ...props }) => {
	const animateBounceRef = useRef();
	const [bounceValue] = useState(new Animated.Value(1));

	const animateBounce = () => {
		bounceValue.setValue(0.7);
		animateBounceRef.current.start();
	};

	useEffect(() => {
		animateBounceRef.current = Animated.loop(
			Animated.spring(bounceValue, {
				toValue: 1,
				friction: 1,
				delay: 1000,
				useNativeDriver: true,
			}),
			{ iterations: -1 },
		);
		animateBounce();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<TouchableOpacity onPress={onPress} {...props}>
			<Animated.View
				style={{ ...styles.view, transform: [{ scale: bounceValue }] }}
			>
				<Image source={icon} style={styles.icon} />
			</Animated.View>
		</TouchableOpacity>
	);
};
