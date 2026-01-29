import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const AnimatedDice = ({ finalDiceRoll, rollTrigger, onDiceRollEnd }) => {
	const [currentFace, setCurrentFace] = useState(1);
	const rollAnim = useRef(new Animated.Value(0)).current;
	const intervalRef = useRef(null);

	useEffect(() => {
		if (!finalDiceRoll) {
			return;
		}
		intervalRef.current = setInterval(() => {
			const randomFace = Math.floor(Math.random() * 6) + 1;
			setCurrentFace(randomFace);
		}, 100);

		setTimeout(() => {
			clearInterval(intervalRef.current);
			setCurrentFace(finalDiceRoll);

			Animated.sequence([
				Animated.timing(rollAnim, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(rollAnim, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
			]).start(() => {
				setTimeout(() => {
					onDiceRollEnd?.();
				}, 2000);
			});
		}, 1800);

		return () => clearInterval(intervalRef.current);
	}, [rollTrigger]);

	const rotate = rollAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	const diceImages = {
		1: require('../../assets/dice1.png'),
		2: require('../../assets/dice2.png'),
		3: require('../../assets/dice3.png'),
		4: require('../../assets/dice4.png'),
		5: require('../../assets/dice5.png'),
		6: require('../../assets/dice6.png'),
	};

	return (
		<Animated.Image
			source={diceImages[currentFace]}
			style={[styles.dice, { transform: [{ rotate }] }]}
		/>
	);
};

const styles = StyleSheet.create({
	dice: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		margin: 10,
	},
});
