import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from 'configs';
import { hasSensor } from 'utils';
import { BiometricAccess } from 'constant';
import { Icon, Text } from 'atoms';
import { getBiometric } from 'stores';

export const BiometricButton = ({
	type = BiometricAccess.LOGIN,
	onPress,
	style,
	small = false,
}) => {
	const store_biometric = useSelector(getBiometric);
	const isBioLocked = false;
	const [sensor, setSensor] = useState(false);
	const [quickLogin, setQuickLogin] = useState(false);
	const activityAccess =
		type === BiometricAccess.LOGIN ? store_biometric.isQuickLogin : store_biometric.isOTP;

	useEffect(() => {
		(async () => {
			await checkSensor();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			if (isBioLocked) {
				await checkSensor();
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isBioLocked]);

	const checkSensor = async () => {
		const temp = await hasSensor();
		setSensor(temp);

		if (temp && temp !== 'locked' && activityAccess && !isBioLocked) {
			return setQuickLogin(true);
		}
		setQuickLogin(false);
	};

	const disableLabel = () => {
		if (quickLogin) {
			return null;
		}
		return (
			<View style={styles.sensor}>
				{sensor == 'locked' || isBioLocked ? (
					<Text style={{ fontSize: small ? 12 : 13, color: colors.primary }}>Locked</Text>
				) : (
					<Text style={{ fontSize: small ? 12 : 13, color: colors.secondaryFont }}>Disabled</Text>
				)}
			</View>
		);
	};

	const promptReason = () => {
		if (sensor == 'locked' || isBioLocked) {
			return Alert.alert('Face/Touch ID is locked');
		}
		if (type === BiometricAccess.LOGIN) {
			return Alert.alert('Biometric Login is disabled', 'Proceed with PIN and enable in settings');
		}
		Alert.alert('Biometric Approval is disabled', 'Proceed with PIN and enable in settings');
	};

	return (
		<TouchableOpacity
			style={[{ flex: 1, alignItems: 'center' }, style]}
			onPress={quickLogin ? onPress : promptReason}
		>
			<View
				style={{
					height: 40,
					justifyContent: 'center',
					marginVertical: small ? 5 : 10,
				}}
			>
				{sensor === 'Face ID' ? (
					<Icon
						type={'material-community'}
						name="face-recognition"
						style={{ fontSize: small ? 25 : 30, color: colors.black }}
					/>
				) : (
					<Icon
						type={'material-community'}
						name="fingerprint"
						style={{ fontSize: small ? 32 : 40, color: colors.black }}
					/>
				)}
			</View>
			{disableLabel()}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	sensor: {
		position: 'absolute',
		backgroundColor: 'rgba(244,244,244,0.8)',
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
		height: '100%',
		justifyContent: 'center',
	},
});

export default BiometricButton;
