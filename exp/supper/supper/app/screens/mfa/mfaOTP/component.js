import React from 'react';
import { Loading, Screen, Text } from 'atoms';
import { TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';

import LockLottie from 'assets/lottie/lock.json';
import { Header } from 'molecules';
import { styles } from './styles';

export const MFAOtpComp = ({ handleHeaderLeftButton, counter, otp, error, handleRefresh }) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftButton,
				}}
			/>
			<View style={styles.container}>
				<LottieView source={LockLottie} loop autoPlay style={styles.lottieIcon} />
				<Text variant={'H6'} style={styles.lblTitle}>
					PB SecureSign OTP
				</Text>
				<View style={styles.OTPContainer}>
					{otp ? (
						<Text variant={'H1'} style={styles.lblOTP}>
							{otp}
						</Text>
					) : (
						<Loading isPagingLoading />
					)}
				</View>

				<Text style={styles.lblCounter}>
					{counter > 0 ? `Refresh OTP in ${counter} seconds.` : ''}
				</Text>
				<Text style={styles.lblError}>{error}</Text>
			</View>
			{counter <= 0 && (
				<TouchableOpacity style={styles.btnRefresh} onPress={handleRefresh}>
					<Text variant={'P1'} style={styles.lblRefresh}>
						Refresh OTP
					</Text>
				</TouchableOpacity>
			)}
		</Screen>
	);
};
