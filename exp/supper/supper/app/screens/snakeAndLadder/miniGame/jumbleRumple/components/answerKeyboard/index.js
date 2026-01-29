import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { colors } from 'configs';

import { styles } from './styles';
import { Text } from 'atoms';
import DeleteIcon from '../../../../assets/wordzzle/btn-delete-keyboard.png';
import RevertIcon from '../../../../assets/wordzzle/btn-reset-keyboard.png';
import SubmitIcon from '../../../../assets/wordzzle/btn-submit-keyboard.png';

import backgroundImage from '../../../../assets/wordzzle/bg-alpha.png';
import { JUMBLE_STATUS } from '../../constant';
import { getShiftedArray } from '../../utils';

import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

export const AnswerKeyboard = ({ shuffledWord, reset, erase, onPress, status, onSubmit }) => {
	const [pressedKeys, setPressedKeys] = useState([]);

	useEffect(() => {
		if (status !== JUMBLE_STATUS.PLAYING && status !== JUMBLE_STATUS.ANSWERED) {
			setPressedKeys([]);
		}
	}, [status]);

	useEffect(() => {
		setPressedKeys([]);
	}, [shuffledWord]);

	const handlePress = (characterObj, index) => {
		if (status === JUMBLE_STATUS.ANSWERED) {
			return;
		}
		playSoundEffect(PBDASH_SOUND.KEY_CLICKED.audio);

		setPressedKeys((prevKeys) => [...prevKeys, index]);
		onPress(characterObj);
	};

	const handleReset = () => {
		setPressedKeys([]);
		reset();
	};

	const handleErase = () => {
		setPressedKeys(getShiftedArray(pressedKeys));
		erase();
	};

	return (
		<>
			<View style={styles.selectionContainer}>
				{shuffledWord?.map((character, index) => {
					const disabled = pressedKeys?.includes(index);
					return (
						<TouchableOpacity
							key={index}
							disabled={disabled}
							onPress={() => handlePress(character, index)}
							style={[styles.alphaContainer, { opacity: disabled ? 0.5 : 1 }]}
						>
							<ImageBackground
								source={backgroundImage}
								style={styles.alphaContainer}
								imageStyle={{ borderRadius: 4 }}
								resizeMode="cover"
							>
								<Text style={styles.alpha} as={Text.type.H6}>
									{character}
								</Text>
							</ImageBackground>
						</TouchableOpacity>
					);
				})}
			</View>
			<View style={styles.actionBtnContainer}>
				<ImageButton
					onPress={handleReset}
					imageSource={RevertIcon}
					color={colors.blue}
					style={styles.actionBtn}
				/>

				<ImageButton
					onPress={onSubmit}
					imageSource={SubmitIcon}
					color={colors.green}
					imageStyle={{ width: 120, height: 80 }}
					style={styles.actionBtn}
				/>

				<ImageButton
					onPress={handleErase}
					imageSource={DeleteIcon}
					color={colors.yellow}
					style={styles.actionBtn}
				/>
			</View>
		</>
	);
};

const ImageButton = ({ onPress, imageSource, title, color, style, imageStyle, typography }) => {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.actionBtn, style]}>
			{imageSource && (
				<Image
					source={imageSource}
					style={[
						{ width: 50, height: 50, borderRadius: 10, marginRight: title ? 8 : 0 },
						imageStyle,
					]}
					resizeMode="contain"
				/>
			)}
			{title && (
				<Text style={{ color, fontSize: typography === Text.type.H6 ? 16 : 14 }}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};
