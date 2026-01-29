import React from 'react';
import { BottomView, PrimaryButton, Screen } from 'atoms';
import { SectionHeader } from 'molecules';
import LottieView from 'lottie-react-native';

import BiometricLottie from 'assets/lottie/biometric.json';
import { View } from 'react-native';
import { colors } from 'configs';
import { commonStyles } from 'styles';
import styles from './styles';

const MfaBiometricEnroll = ({ handleSkip, handleEnableBiometric, subTitle }) => {
	return (
		<Screen>
			<SectionHeader style={styles.header} subtitle={subTitle} title="Biometric?" />
			<View style={[commonStyles.fill, commonStyles.center]}>
				<LottieView source={BiometricLottie} style={styles.lottieView} autoPlay loop />
			</View>
			<BottomView isGap={true} style={styles.bottomView}>
				<View style={styles.bottomWrapper}>
					<PrimaryButton
						title="Skip"
						titleStyle={styles.skipTitleStyle}
						onPress={handleSkip}
						buttonStyle={styles.skipButton}
						shadowColor={colors.medium}
					/>
					<PrimaryButton title="Enable" onPress={handleEnableBiometric} />
				</View>
			</BottomView>
		</Screen>
	);
};

export default MfaBiometricEnroll;
