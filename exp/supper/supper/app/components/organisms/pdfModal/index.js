import React from 'react';
import Pdf from 'react-native-pdf';
import CryptoJS from 'crypto-js';
import { BottomModal } from 'molecules';
import { styles } from './styles';
import { Dimensions } from 'react-native';
import { commonStyles } from 'styles';
import { isIos } from 'constant';

const { height, width } = Dimensions.get('window');

export const PdfModal = ({ source, isVisible, closeModal }) => {
	const formattedSource = source?.uri
		? {
				...source,
				cacheFileName: CryptoJS.SHA256(source?.uri).toString(),
		  }
		: source;

	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} containerStyle={[commonStyles.fill]}>
			<Pdf
				fitPolicy={0}
				source={formattedSource}
				style={[styles.pdf, height, width]}
				trustAllCerts={isIos}
			/>
		</BottomModal>
	);
};
