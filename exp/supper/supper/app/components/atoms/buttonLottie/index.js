import React from 'react';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors } from 'configs';

import { styles } from './styles';
import PrimaryButton from '../primaryButton';

export const ButtonLottie = ({ source, onPress, style }) => {
	return (
		<PrimaryButton onPress={onPress} buttonStyle={styles.button} shadowStyle={styles.buttonShadow}>
			<LinearGradient colors={gradientColors.primary} style={[styles.faceIdBtn, style]}>
				<LottieView style={styles.lottieImage} source={source} autoPlay loop />
			</LinearGradient>
		</PrimaryButton>
	);
};
