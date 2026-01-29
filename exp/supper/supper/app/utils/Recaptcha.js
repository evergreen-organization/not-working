import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Config } from '../../env';

export const Recaptcha = ({ onLoadToken, session }) => {
	return (
		<View key={session} style={styles.container}>
			<WebView
				originWhitelist={['*']}
				style={styles.webview}
				startInLoadingState={true}
				javaScriptEnabled={true}
				useWebKit={true}
				source={{
					html: `<!DOCTYPE html>
                    <html>
                      <head>
                      </head>
                      <body>
                        <div id="inline-badge"></div>
                        <script src="https://www.google.com/recaptcha/api.js?render=${Config.RECAPTCHA_SITEKEY}"></script>
                        <script type="text/javascript">
                            grecaptcha.ready(function () {
                              grecaptcha.execute('${Config.RECAPTCHA_SITEKEY}', {action: 'verify'}).then(function (token) {
                                window.ReactNativeWebView.postMessage(token)
                              });
                            });
                        </script>
                      </body>
                  </html>`,
					baseUrl: 'https://' + Config.AUTH + '/Auth/Login',
				}}
				onMessage={(event) => {
					onLoadToken(event.nativeEvent.data);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { justifyContent: 'center' },
	webview: { width: 0, height: 0 },
});
