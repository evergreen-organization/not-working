import { useWindowDimensions, Image, View } from 'react-native';
import { styles } from '../../login/styles';
import PBExLogo from '../../../../assets/pbExLogo.png';
import LoginIcon from '../../../../assets/icon/login-splash.png';
import MFAIcon from '../../../../assets/icon/mfa.png';
import React from 'react';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { PrimaryButton, Text } from 'atoms';
import { showFestive } from 'constant';
import AnimatedLogo from '../animatedAppLogo';

export const LoginSplash = ({ onLoginPress, onMFAPress }) => {
	const { width: windowWidth } = useWindowDimensions();

	return (
		<>
			<Animated.View style={styles.logoContainer} entering={FadeIn} exiting={FadeOut}>
				{/* {!showFestive && (
					<>
						<AnimatedLogo />
						<View style={[styles.sloganContainer]}>
							<Text style={styles.title1}>Discover New Ways</Text>
							<Text bold style={styles.title2}>
								Towards Excellence
							</Text>
						</View>
					</>
				)} */}
			</Animated.View>
			<Animated.View
				style={styles.loginFormContainer}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>
				<PrimaryButton
					style={[{ maxWidth: windowWidth * 0.4 }]}
					isTitleBold
					leftIcon={LoginIcon}
					title={'Login'}
					onPress={onLoginPress}
					iconStyle={styles.icon}
				/>
				<PrimaryButton
					style={[{ maxWidth: windowWidth * 0.4 }]}
					isTitleBold
					leftIcon={MFAIcon}
					title={'Token'}
					onPress={onMFAPress}
					iconStyle={styles.icon}
				/>
			</Animated.View>
		</>
	);
};
