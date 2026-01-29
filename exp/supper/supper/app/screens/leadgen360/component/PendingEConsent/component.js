import React from 'react';
import { Text as RnText, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon, Text } from 'atoms';
import SigningLottie from 'assets/lottie/sign.json';
import { styles } from './styles';
import Animated, { ZoomIn } from 'react-native-reanimated';

export const PendingEConsentView = ({ referralCode, handleShare }) => {
	// @ts-ignore
	return (
		<>
			<LottieView style={styles.lottie} source={SigningLottie} autoPlay />
			<Text style={styles.text}>New prospect created.</Text>

			<Animated.View entering={ZoomIn} style={styles.instructionView}>
				<Text variant={'P6'} style={styles.text}>
					To complete the submission:{' '}
				</Text>
				<Text variant={'P6'} style={styles.text}>
					Please advise your prospect to submit eConsent Form with Referral Code at
				</Text>
				<RnText bold style={styles.link}>
					{'"PBe > Contact > Public Bank Customer Referral eConsent Form"'}
				</RnText>
				<Text variant={'P6'} style={styles.instruction}>
					within 30 days from the Date Creation.
				</Text>
			</Animated.View>
			<Text variant={'P4'} style={styles.eCFText}>
				Referral Code
			</Text>
			<View style={styles.refNumberView}>
				<Text selectable={true} variant={'P4'} style={styles.refNumber}>
					{referralCode}
				</Text>
			</View>
			<TouchableOpacity style={styles.shareContainer} onPress={handleShare}>
				<Icon type={'entypo'} name={'share'} style={styles.shareIcon} />
				<Text variant={'P4'} style={styles.shareText}>
					Share Referral Code
				</Text>
			</TouchableOpacity>
		</>
	);
};
