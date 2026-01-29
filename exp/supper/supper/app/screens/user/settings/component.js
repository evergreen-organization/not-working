import React from 'react';
import { ScrollView, View } from 'react-native';

import { Loading, Screen } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';
import FaceIDIcon from 'assets/icon/faceid.png';
import FingerprintIcon from 'assets/icon/fingerprint.png';
import SecurityIcon from 'assets/icon/security.png';
import BellIcon from 'assets/icon/bell.png';
import LinkIcon from 'assets/icon/link.png';
import KeyIcon from 'assets/icon/key.png';

import { SettingsItem as Item } from './components/SettingsItem';
import { styles } from './styles';
import { SettingsItemPressable } from './components/SettingsItemPressable';

export const SettingsComp = ({
	handleHeaderLeftBtn,
	handleToggleQuickLogin,
	handleToggleSoftToken,
	handleToggleOTP,
	handleTogglePushNotification,
	handleToggleDeviceBinding,
	sensor,
	biometricQuickLogin,
	biometricOTP,
	adid,
	pushNotification,
	biometric,
	loading,
	isActivatedMFA,
	handleChangePin,
}) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Settings',
					style: Typography.H6,
				}}
			/>
			<ScrollView>
				<View style={styles.content}>
					{adid && (
						<>
							<Item
								text="PB SecureSign"
								icon={SecurityIcon}
								value={isActivatedMFA}
								onValueChange={handleToggleSoftToken}
								showSwitch={!isActivatedMFA}
							/>
							{isActivatedMFA && (
								<>
									<Item
										text="Biometric Login"
										icon={sensor == 'Face ID' ? FaceIDIcon : FingerprintIcon}
										value={biometricQuickLogin}
										onValueChange={handleToggleQuickLogin}
									/>
									<Item
										text="Biometric Approval"
										icon={sensor == 'Face ID' ? FaceIDIcon : FingerprintIcon}
										value={biometricOTP}
										onValueChange={handleToggleOTP}
									/>
								</>
							)}
						</>
					)}
					<Item
						text="Push Notification"
						icon={BellIcon}
						value={pushNotification}
						onValueChange={handleTogglePushNotification}
					/>

					<Item
						text="Device Binding"
						icon={LinkIcon}
						value={biometric.userid !== undefined}
						onValueChange={handleToggleDeviceBinding}
					/>

					<SettingsItemPressable
						text="Change 6 Digit Pin"
						icon={KeyIcon}
						onPress={handleChangePin}
					/>
				</View>
			</ScrollView>
			{loading && <Loading />}
		</Screen>
	);
};
