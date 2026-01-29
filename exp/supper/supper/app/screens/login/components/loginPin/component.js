import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'configs';
import { Recaptcha } from 'utils';
import { PinInput } from 'organisms';
import { ButtonLottie, Text } from 'atoms';
import FaceIDIcon from 'assets/lottie/face-id.json';
import TouchIDIcon from 'assets/lottie/touch-id.json';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'molecules';
import WarningIcon from '../../../../assets/icon/warning-red.png';
import { LBL_FORGET_PIN } from '../../../mfa/constants';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { commonStyles } from 'styles';

export const LoginPinComp = (props) => {
	const { top, bottom } = useSafeAreaInsets();
	const {
		handlePinChange,
		handleBiometricLogin,
		handleDelete,
		onBack,
		setRecaptchaToken,
		refreshCaptcha,
		pin,
		pinErrorMessage,
		isFaceID,
		isAlertVisible,
		onCloseForgotPin,
		onForgotPin,
		onConfirmForgotPin,
	} = props;

	return (
		<Animated.View
			style={[commonStyles.fill, { marginBottom: bottom + 40 }]}
			entering={SlideInDown}
			exiting={SlideOutDown}
		>
			<View style={[styles.pinLoginFestive, { top: top }]}>
				<View style={styles.container}>
					<View style={styles.navbar}>
						<TouchableOpacity styles={styles.btnForget} onPress={onBack}>
							<Text style={styles.lblForget}>Close</Text>
						</TouchableOpacity>
						<TouchableOpacity styles={styles.btnForget} onPress={onForgotPin}>
							<Text style={styles.lblForget}>Forgot PIN</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.pinInputContainer}>
						<PinInput
							title={'Enter PIN to continue'}
							value={pin}
							onChange={handlePinChange}
							errorTitle={pinErrorMessage}
						/>
					</View>
					<View style={styles.bottomButtonContainer}>
						<View style={styles.bottomLeftBtn}>
							<ButtonLottie
								source={isFaceID ? FaceIDIcon : TouchIDIcon}
								onPress={handleBiometricLogin}
							/>
						</View>
						<TouchableOpacity
							disabled={pin.length === 0}
							style={styles.bottomRightBtn}
							onPress={handleDelete}
						>
							<View style={styles.bottomRightBtnView}>
								<Text
									bold
									style={[
										styles.bottomRightBtnLbl,
										pin.length > 0 ? { color: colors.black } : { color: colors.medium },
									]}
								>
									Delete
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Recaptcha onLoadToken={(token) => setRecaptchaToken(token)} session={refreshCaptcha} />
				</View>
			</View>
			<Alert
				icon={WarningIcon}
				isVisible={isAlertVisible}
				title={'Warning'}
				description={LBL_FORGET_PIN}
				cancelButtonTitle={'Cancel'}
				confirmButtonTitle={'Agree'}
				onClose={onCloseForgotPin}
				onConfirm={onConfirmForgotPin}
			/>
		</Animated.View>
	);
};
