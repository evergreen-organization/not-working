import React from 'react';
import { View } from 'react-native';
import { Icon, PrimaryButton } from 'atoms';
import { maskUserId, Recaptcha } from 'utils';
import TextInput from '../loginFormInput';
import { styles } from './styles';
import { Header } from 'molecules';
import Animated, {
	SlideInDown,
	SlideOutDown,
	LinearTransition,
	SlideInUp,
	SlideOutUp,
} from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import useLoginForm from 'screens/login/hooks/useLoginForm';
import LoginFormWrapper from '../loginFormWrapper';

export const LoginFormView = ({
	handleChangeId,
	handleChangePassword,
	handleToggleDomain,
	handleTogglePassword,
	handleRecaptchaLoad,
	handlePasswordLogin,
	onBack,
	refreshCaptcha,
	userId,
	pWord,
	storedUserId,
	domain,
	isSecureText,
}) => {
	const maskedId = maskUserId(storedUserId);
	const isMasked = maskedId.length !== 0;
	const domainLabel = domain ? 'PIVB' : 'PBB';
	const secureIcon = isSecureText ? 'eye-off' : 'eye';
	const { animatedStyle, panGesture } = useLoginForm({ onBack });

	return (
		<View style={styles.formView}>
			<Animated.View entering={SlideInUp} exiting={SlideOutUp}>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: onBack,
					}}
					containerStyle={styles.headerContainer}
				/>
			</Animated.View>
			<LoginFormWrapper>
				<GestureDetector gesture={panGesture}>
					<Animated.View
						style={[styles.inputContainer, animatedStyle]}
						entering={SlideInDown}
						exiting={SlideOutDown}
						layout={LinearTransition}
					>
						<TextInput
							name={'userId'}
							testID="username-input"
							id={userId}
							isMasked={isMasked}
							value={isMasked ? maskedId : userId}
							onChangeText={handleChangeId}
							autoCapitalize="none"
							onPressToggle={handleToggleDomain}
							toggleTitle={domainLabel}
							icon="account-switch"
							title="ID"
						/>

						<View style={styles.spacing20} />
						<TextInput
							name={'pWord'}
							testID="password-input"
							value={pWord}
							onChangeText={handleChangePassword}
							secureTextEntry={isSecureText}
							autoCapitalize="none"
							autoComplete="off"
							textContentType="password"
							importantForAutofill="no"
							autoCorrect={false}
							onPressToggle={handleTogglePassword}
							icon={secureIcon}
							title="Password"
						/>
						<View style={styles.buttonContainer}>
							<PrimaryButton
								testID="login-btn"
								onPress={handlePasswordLogin}
								style={styles.signInButtonContainer}
								shadowStyle={styles.signInShadow}
								buttonStyle={styles.signInBtn}
							>
								<Icon type={'antdesign'} name={'login'} style={styles.signInButtonIcon} />
							</PrimaryButton>
						</View>
						<Recaptcha onLoadToken={handleRecaptchaLoad} session={refreshCaptcha} />
					</Animated.View>
				</GestureDetector>
			</LoginFormWrapper>
		</View>
	);
};
