import React, { useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import PdfIcon from 'assets/adid/pdf.png';
import UserGuidePdf from 'assets/adid/adid-user-guide.pdf';
import { colors } from 'configs';
import { PdfModal } from 'organisms';
import { Text } from 'atoms';

const UserGuidePdfAndroid = 'bundle-assets://adid-user-guide.pdf';

export const Details1 = () => {
	const [showPDFModal, setShowPDFModal] = useState(false);
	const [pdfSource, setPdfSource] = useState({});
	const closeModal = () => setShowPDFModal(false);
	const onDownloadPress = () => {
		setShowPDFModal(true);
		if (Platform.OS === 'ios') {
			return setPdfSource(UserGuidePdf);
		}
		return setPdfSource({ uri: UserGuidePdfAndroid });
	};

	return (
		<>
			<Text style={styles.text}>
				Don’t worry! Now you can reset/resume your AD ID password from your phone!
			</Text>

			<Text style={styles.text}>
				It’s really easy to set up in only 2 steps! When you’re ready, tap on the button below!
			</Text>

			<View style={styles.row}>
				<TouchableOpacity onPress={onDownloadPress} style={styles.button}>
					<Image source={PdfIcon} style={styles.icon} />
					<Text style={styles.downloadText}>View Guide</Text>
				</TouchableOpacity>
				<Text style={styles.downloadGuide}>
					Alternatively, you may view this step-by-step guide to do it later!
				</Text>
			</View>
			<PdfModal source={pdfSource} closeModal={closeModal} isVisible={showPDFModal} />
		</>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		paddingVertical: 10,
		lineHeight: 20,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		width: '90%',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%',
	},
	icon: {
		width: 40,
		height: 40,
		tintColor: colors.primary,
	},
	downloadText: {
		textAlign: 'center',
		fontSize: 10,
	},
	downloadGuide: {
		fontSize: 14,
		paddingVertical: 10,
		lineHeight: 20,
		left: 5,
		width: '85%',
	},
});
