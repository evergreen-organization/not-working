import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';

import { Screen } from 'atoms';
import { Header } from 'molecules';

import { routes } from 'navigations';
import { Typography } from 'styles';
import { colors } from 'configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;
export const FeedbackWebView = ({ route, navigation }) => {
	const { url } = route?.params || {};
	const insets = useSafeAreaInsets();
	let headerPadding = 50 + insets.top;
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: () => {
						navigation.navigate(routes.EBIZ_GUID);
					},
				}}
				centerComponent={{
					text: 'eBIz Card Feedback/Suggestions',
					style: Typography.H6,
				}}
			/>
			{isLoading && (
				<View
					style={{
						top: headerPadding,
						width: windowWidth,
						height: windowHeight - headerPadding,
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						zIndex: 1,
					}}
				>
					<ActivityIndicator color={colors.primary} size="large" />
				</View>
			)}
			<WebView
				source={{
					uri: url,
				}}
				style={styles.webView}
				javaScriptEnabled={true}
				onLoadEnd={() => setIsLoading(false)}
			/>
		</Screen>
	);
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
