import React from 'react';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera';
import { BottomModal } from 'molecules';
import { styles } from './styles';

export const SelfServiceQRModal = ({ isVisible, closeModal, requestOTP }) => {
	const readQR = (e) => {
		requestOTP(e.data, 'q');
	};

	return (
		<BottomModal fullHeight isVisible={isVisible} onCancel={closeModal}>
			<View style={styles.container}>
				<QRCodeScanner
					showMarker={true}
					markerStyle={styles.marker}
					cameraStyle={styles.camera}
					onRead={readQR}
					flashMode={Camera.Constants.FlashMode.auto}
				/>
			</View>
		</BottomModal>
	);
};
