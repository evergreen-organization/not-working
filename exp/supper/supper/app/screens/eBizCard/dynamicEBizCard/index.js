import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';

import { Screen } from 'atoms';
import { Header } from 'molecules';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'navigations';
import { Typography } from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchEbizPreviewData,
	getBiometric,
	getEBizPreviewData,
	getEBizPreviewLoading,
} from 'stores';
import { colors } from 'configs';
import { showFailure } from 'utils';
import { Config } from '../../../../env';

const windowWidth = Dimensions.get('window').width;

export const WebViewComp = ({ route }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const webViewRef = useRef(null);
	const biometric = useSelector(getBiometric);
	const IsPreviewLoading = useSelector(getEBizPreviewLoading);
	const previewData = useSelector(getEBizPreviewData);
	useEffect(() => {
		(async () => {
			await dispatch(fetchEbizPreviewData({ adId: biometric.userid }));
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onMessage = (event) => {
		const message = event.nativeEvent.data;
		if (message === 'featureNotAvailable') {
			showFailure('Feature not available for Preview');
		}
	};

	if (IsPreviewLoading) {
		return (
			<Screen>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: () => {
							navigation.navigate(routes.EBIZ_SYSTEM_SETTINGS);
						},
					}}
					centerComponent={{
						text: 'Preview Dynamic eBC Profile',
						style: Typography.H6,
					}}
				/>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: colors.white,
					}}
				>
					<ActivityIndicator size="large" color={colors.primary} />
				</View>
			</Screen>
		);
	}

	if (!IsPreviewLoading && previewData?.length > 0) {
		return (
			<Screen>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: () => {
							navigation.navigate(routes.EBIZ_SYSTEM_SETTINGS);
						},
					}}
					centerComponent={{
						text: 'Preview Dynamic eBC Profile',
						style: Typography.H6,
					}}
				/>
				<WebView
					source={{
						uri: Config.EBIZ_PREVIEW_URL,
					}}
					injectedJavaScriptBeforeContentLoaded={`
            window.getData = function() {
              return '${JSON.stringify(previewData)}'
            };
          `}
					injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
					injectedJavaScriptForMainFrameOnly={false}
					ref={webViewRef}
					style={styles.webView}
					originWhitelist={['*']}
					javaScriptEnabled={true}
					onMessage={onMessage}
				/>
			</Screen>
		);
	}
};

const styles = StyleSheet.create({
	webView: {
		flex: 1,
		width: windowWidth,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
