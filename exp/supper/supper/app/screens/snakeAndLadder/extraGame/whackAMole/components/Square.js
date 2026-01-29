import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

const Square = ({ increaseScore }) => {
	const [moleActive, setMoleActive] = useState(false);

	useEffect(() => {
		let timeoutId;

		const showMole = () => {
			setMoleActive(true);

			setTimeout(() => {
				setMoleActive(false);

				// Schedule the next mole appearance with a new random delay
				const nextDelay = Math.random() * 3000 + 1000; // 1 to 4 seconds
				timeoutId = setTimeout(showMole, nextDelay);
			}, 800); // Mole visible for 800ms
		};

		// Initial delay
		const initialDelay = Math.random() * 3000 + 1000; // 1 to 4 seconds
		timeoutId = setTimeout(showMole, initialDelay);

		return () => clearTimeout(timeoutId); // Cleanup
	}, []);

	const handlePress = () => {
		playSoundEffect(PBDASH_SOUND.WHACK_SOUND.audio);

		if (moleActive) {
			increaseScore();
			setMoleActive(false); // Optional: hide mole after hit
		}
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<Image
				resizeMode="contain"
				source={moleActive ? require('../assets/mole2.png') : require('../assets/hole2.png')}
				style={styles.square}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	square: {
		flex: 1,
		minWidth: 80,
		minHeight: 80,
		margin: 15,
		width: '100%',
	},
});

export default Square;
