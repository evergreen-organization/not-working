import React, { forwardRef } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import AlertIcon from '../../../assets/icon/warning-red.png';
import { LoginForm, LoginPin } from '../components';
import { LoginInfo } from '../components/loginInfo';
import { LoginSplash } from '../components/loginSplash';
import VersionInfo from '../components/versionInfo';
import VideoBackground from '../components/videoBackground';
import { LOGIN_MESSAGE, LOGIN_STATE } from '../constant';
import { styles } from './styles';

export const LoginFestiveComp = (props, ref) => {
	const {
		handlePinLogin,
		handlePasswordLogin,
		handleBiometricLogin,
		handleLoginPress,
		handleKeyboardClose,
		handleMFAPress,
		handleBindConflict,
		handleCancel,
		handleForgotPin,
		handleConfirmForgotPin,
		handleCloseForgotPin,
		handlePBSSConflict,
		isAlertVisible,
		isKeyboardVisible,
		screenStatus,
	} = props;

	const renderPinInput = () => {
		return (
			<View style={[styles.fill]}>
				<LoginPin
					onBiometricLogin={handleBiometricLogin}
					onPinLogin={handlePinLogin}
					onForgotPin={handleForgotPin}
					onCloseForgotPin={handleCloseForgotPin}
					onConfirmForgotPin={handleConfirmForgotPin}
					isAlertVisible={isAlertVisible}
					onBack={handleCancel}
				/>
			</View>
		);
	};

	const renderPasswordInput = () => {
		return (
			<LoginForm
				onPasswordLogin={handlePasswordLogin}
				onBiometricLogin={handleBiometricLogin}
				onBack={handleCancel}
			/>
		);
	};

	const renderUserConflict = () => (
		<LoginInfo
			icon={AlertIcon}
			title={'warning'}
			description={LOGIN_MESSAGE.ERROR_LOGIN_USER_CONFLICT}
			leftButtonTitle={'Yes'}
			rightButtonTitle={'No'}
			onLeftPress={handleCancel}
			onRightPress={handleBindConflict}
		/>
	);

	const renderForceLogin = () => (
		<LoginInfo
			icon={AlertIcon}
			title={LOGIN_MESSAGE.ERROR_TITLE_LOGIN_FORCE_LOGIN}
			description={LOGIN_MESSAGE.ERROR_LOGIN_FORCE_LOGIN}
			rightButtonTitle={'OK'}
			onRightPress={handleCancel}
		/>
	);

	const renderPBSSConflict = () => (
		<LoginInfo
			icon={AlertIcon}
			title={'warning'}
			description={LOGIN_MESSAGE.ERROR_LOGIN_PBSS_CONFLICT}
			leftButtonTitle={'Yes'}
			rightButtonTitle={'No'}
			onLeftPress={handleCancel}
			onRightPress={handlePBSSConflict}
		/>
	);

	const renderLoginSplash = () => (
		<LoginSplash onLoginPress={handleLoginPress} onMFAPress={handleMFAPress} />
	);

	const screens = {
		[LOGIN_STATE.SPLASH]: renderLoginSplash,
		[LOGIN_STATE.PIN]: renderPinInput,
		[LOGIN_STATE.PASSWORD]: renderPasswordInput,
		[LOGIN_STATE.BIND_CONFLICT]: renderUserConflict,
		[LOGIN_STATE.FORCE_LOGIN]: renderForceLogin,
		[LOGIN_STATE.MFA_CONFLICT]: renderPBSSConflict,
	};

	const renderLoginPage = () => {
		const screen = screens[screenStatus];
		// set default screen to splash screen
		if (!screen) {
			return renderLoginSplash();
		}
		return screen();
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboardClose}>
			<View style={styles.container} ref={ref}>
				<VideoBackground />
				{renderLoginPage()}
				<VersionInfo isKeyboardVisible={isKeyboardVisible} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default forwardRef(LoginFestiveComp);
