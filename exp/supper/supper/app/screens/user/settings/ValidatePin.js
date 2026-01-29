import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, NativeModules } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';

import { Loading, Screen, Text } from 'atoms';
import { PinInput } from 'organisms';
import { BIO_CONSTANT, DIGIPASS_ERROR, PBSS_DEACTIVATED } from 'screens/mfa/constants';
import { OTP_TYPE, destroyPBSSToken, generateClientServerTimeShift, generateOTP } from 'softToken';
import {
	biometricEnabled,
	getClientServerTimeShift,
	getPin,
	getPinErrorCount,
	pinErrorCountIncreased,
	pinErrorCountReset,
	setLoginMessage,
	updateAuthObject,
} from 'stores';
import { setKeychainPIN, showFailure, showSuccess } from 'utils';
import { routes } from 'navigations';
import { Header } from 'molecules';
import { colors } from 'configs';
import { captureMessage } from '@sentry/react-native';

const { SoftTokenModule } = NativeModules;

const biometircUnsuccessfulErrorMessage =
	'Biometric activation unsuccessful. Please try again later.';

export const ValidatePin = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const path = route?.params?.path;
	const store_pin = useSelector(getPin);
	const netInfo = useNetInfo();
	const pinErrorCount = useSelector(getPinErrorCount);
	const storeTimeShift = useSelector(getClientServerTimeShift);
	const [loading, setLoading] = useState(false);

	const [pin, setPin] = useState('');

	useEffect(() => {
		dispatch(updateAuthObject({ status: 'idle' }));
		dispatch(setLoginMessage(undefined));
	}, []);

	const preLogin = async (newPin) => {
		setLoading(true);
		await submitPin(newPin);
	};

	const submitPin = async (newPin) => {
		if (path) {
			setLoading(false);
			navigation.replace(path, { oldPin: newPin });
			return;
		}
		let clientServerTimeShift = storeTimeShift;

		if (!(netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)) {
			const { status: timeStatus, data: timeData } = await generateClientServerTimeShift({
				dispatch,
			});
			// if backend pass value then use it, else use the stored value
			if (timeStatus === 'S') {
				clientServerTimeShift = timeData.clientServerTimeShift;
			}
		}

		const { status, errorMessage } = await generateOTP({
			pinToken: newPin,
			type: OTP_TYPE.DISPLAY,
			clientServerTimeShift,
			dispatch,
		});

		if (status !== 'S') {
			setLoading(false);
			if (status === DIGIPASS_ERROR.PASSWORD_WRONG) {
				if (parseInt(pinErrorCount) <= 0) {
					await destroyPBSSToken(dispatch);
					showFailure(PBSS_DEACTIVATED);
					captureMessage(PBSS_DEACTIVATED, 'info');
					navigation.navigate(routes.LOGIN);
					dispatch(pinErrorCountReset());
					return;
				}
				setLoginMessage(`Incorrect PIN. ${pinErrorCount} attempt(s) left`);
				dispatch(pinErrorCountIncreased());
				return;
			}
			setLoginMessage(errorMessage ?? 'Invalid PIN');
			return;
		}
		dispatch(pinErrorCountReset());
		setLoading(false);
		await handleActivateBiometric(newPin);
	};

	const handleActivateBiometric = async (newPin) => {
		try {
			await setKeychainPIN(BIO_CONSTANT);
		} catch (error) {
			navigation.goBack();
			captureMessage(biometircUnsuccessfulErrorMessage, 'info');
			return showFailure(biometircUnsuccessfulErrorMessage);
		}

		const { status: biomerticStatus } = await SoftTokenModule.activateBiometric(newPin);
		setLoading(false);
		if (biomerticStatus !== 'S') {
			captureMessage(biometircUnsuccessfulErrorMessage, 'info');
			showFailure(biometircUnsuccessfulErrorMessage);
			return;
		}
		dispatch(biometricEnabled());
		showSuccess('Biometric activation is successful.');
		navigation.goBack();
	};

	const handleChange = async (digit) => {
		const newPin = pin + digit;
		setPin(newPin);
		if (newPin.length === 6) {
			await preLogin(newPin);
		}
	};

	const handleDelete = () => setPin(pin.slice(0, -1));

	const handleCancel = () => navigation.goBack();

	return (
		<Screen singlePage>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleCancel,
				}}
				rightContainerStyle={{
					backgroundColor: colors.background,
					paddingHorizontal: 20,
				}}
			/>
			<View style={styles.inputContainer}>
				<PinInput
					title="Enter PIN to continue"
					value={pin}
					onChange={handleChange}
					errorTitle={store_pin.loginMessage}
				/>
			</View>

			<View
				style={{
					justifyContent: 'space-around',
					flexDirection: 'row',
					marginBottom: 20,
				}}
			>
				<TouchableOpacity
					style={{ height: 40, justifyContent: 'center', marginVertical: 10 }}
					onPress={handleCancel}
				>
					<Text style={{ fontSize: 20 }} bold>
						Cancel
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ height: 40, justifyContent: 'center', marginVertical: 10 }}
					onPress={handleDelete}
				>
					<Text style={{ fontSize: 20 }} bold>
						Delete
					</Text>
				</TouchableOpacity>
			</View>
			{loading && <Loading />}
		</Screen>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default ValidatePin;
