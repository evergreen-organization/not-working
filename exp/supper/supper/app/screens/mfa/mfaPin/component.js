import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../../login/components/loginPin/styles';
import { ButtonLottie, Loading, Screen, Text } from 'atoms';
import { PinInput } from 'organisms';
import FaceIDIcon from '../../../assets/lottie/face-id.json';
import TouchIDIcon from '../../../assets/lottie/touch-id.json';
import { colors } from 'configs';
import { Alert, Header } from 'molecules';
import WarningIcon from '../../../assets/icon/warning-red.png';
import { LBL_FORGET_PIN } from '../constants';
import { LoginErrorPopup } from '../../login/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from 'styles';

export const MFAPinComp = ({
	handlePinChange,
	handleDelete,
	handleForgotPin,
	handleCloseAlert,
	handleForgetPinConfirm,
	handleHeaderLeftButton,
	isFaceID,
	pin,
	isAlertShow,
	errorMessage,
	isLoading,
	onBiometric,
	showForgetPin = false,
	error,
	handlePopupClose,
}) => {
	return (
		<SafeAreaView style={[commonStyles.fill]}>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftButton,
				}}
				rightComponent={
					showForgetPin
						? {
								rightComponent: {
									text: 'Forgot PIN',
									onPress: handleForgotPin,
								},
						  }
						: null
				}
				rightContainerStyle={{
					backgroundColor: colors.background,
					paddingHorizontal: 20,
				}}
			/>
			<View style={styles.pinInputContainer}>
				<PinInput
					title={'Enter Secure PIN'}
					value={pin}
					onChange={handlePinChange}
					errorTitle={errorMessage}
				/>
			</View>
			<View style={styles.bottomButtonContainer}>
				<View style={styles.bottomLeftBtn}>
					<ButtonLottie source={isFaceID ? FaceIDIcon : TouchIDIcon} onPress={onBiometric} />
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
				<Alert
					icon={WarningIcon}
					isVisible={isAlertShow}
					title={'Warning'}
					description={LBL_FORGET_PIN}
					cancelButtonTitle={'Cancel'}
					confirmButtonTitle={'Agree'}
					onClose={handleCloseAlert}
					onConfirm={handleForgetPinConfirm}
				/>
			</View>
			<LoginErrorPopup
				visible={!!error?.message}
				title={error?.title}
				testID={'error-pop-up-mfa-pin'}
				message={error?.message}
				onClose={handlePopupClose}
			/>
			{isLoading && <Loading />}
		</SafeAreaView>
	);
};
