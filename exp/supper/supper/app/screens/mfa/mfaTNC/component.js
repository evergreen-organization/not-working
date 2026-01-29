import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { Button, PrimaryButton } from 'atoms';
import { colors } from 'configs';
import { Header } from 'molecules';
import { commonStyles, Typography } from 'styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { MFA_TNC } from './constants';
import { styles } from './styles';

export const MfaTncComp = ({ handleHeaderRightBtn, handleCancel, handleAccept }) => {
	return (
		<SafeAreaView style={[commonStyles.fill]}>
			<Header
				rightComponent={{
					icon: 'close',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderRightBtn,
				}}
				centerComponent={{
					text: 'Terms & Conditions',
					style: Typography.H6,
				}}
			/>
			<View style={styles.container}>
				<WebView originWhitelist={['*']} source={{ html: MFA_TNC.TNC }} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					preset={'text'}
					color={colors.primary}
					style={styles.button}
					onPress={handleCancel}
					title={'Maybe Later'}
				/>
				<PrimaryButton preset={'solid'} onPress={handleAccept} title={'Accept'} />
			</View>
		</SafeAreaView>
	);
};
