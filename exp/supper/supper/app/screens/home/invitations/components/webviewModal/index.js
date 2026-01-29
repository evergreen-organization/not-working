import React from 'react';
import { WebView } from 'react-native-webview';
import { BottomModal } from 'molecules';

export const WebViewModal = ({ isVisible, closeModal, uri }) => {
	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} fullHeight>
			<WebView
				source={{ uri }}
				useWebKit={true}
				bounces={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			/>
		</BottomModal>
	);
};
