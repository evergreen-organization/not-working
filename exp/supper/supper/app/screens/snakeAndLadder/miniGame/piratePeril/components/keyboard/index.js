import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from 'atoms';
import { styles } from './styles';
import { PIRATE_STATUS } from '../../constant';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

export const Keyboard = ({ status, onPress }) => {
	const keys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
	const [pressedKeys, setPressedKeys] = useState([]);

	useEffect(() => {
		if (status !== PIRATE_STATUS.PLAYING) {
			setPressedKeys([]);
		}
	}, [status]);

	const handlePress = (letter) => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

		setPressedKeys((prevKeys) => [...prevKeys, letter]);
		onPress(letter);
	};

	return (
		<View style={styles.keyboard}>
			{keys.map((keyRow) => (
				<View key={keyRow} style={styles.keyRow}>
					{keyRow.split('').map((letter) => {
						const disabled = pressedKeys.includes(letter);
						return (
							<TouchableOpacity
								key={letter}
								disabled={disabled}
								onPress={() => handlePress(letter)}
								style={styles.keyContainer}
							>
								<Text
									as={Text.type.H2}
									bold
									style={[
										styles.key,
										{
											color: disabled ? 'transparent' : 'purple',
										},
									]}
								>
									{letter}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			))}
		</View>
	);
};
