import React, { useState, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { BottomModal } from 'molecules';
import { styles } from './styles';
import { Text } from 'atoms';

export const DefinitionsModal = ({ isVisible, closeModal, definitions }) => {
	const termWebViewRef = useRef([]);
	const [termWebViewHeight, setTermWebViewHeight] = useState([]);

	const webViewOnMessage = (e, index) => {
		const obj = JSON.parse(e);
		// console.log("obj:", obj)
		const tempTermWebViewHeight = [...termWebViewHeight];
		if (index == null) {
			return setTermWebViewHeight(obj.bodyScrollHeight + obj.bodyScrollHeight * 0.25);
		}
		if (tempTermWebViewHeight[index] == 0 || tempTermWebViewHeight[index] == null) {
			tempTermWebViewHeight[index] = obj.bodyScrollHeight + obj.bodyScrollHeight * 0.2 + 15;
			setTermWebViewHeight(tempTermWebViewHeight);
		}
	};

	const webViewOnLoad = (index) => {
		const script = `
        var body= document.body,html = document.documentElement
        window.ReactNativeWebView.postMessage(JSON.stringify({'bodyScrollHeight': body.scrollHeight, 
        'bodyOffsetHeight': body.offsetHeight, 
        'bodyClientHeight': body.clientHeight,
        'htmlClientHeight': html.clientHeight,
        'htmlScrollHeight': html.scrollHeight,
        'htmlOffsetHeight': html.offsetHeight
        }))
    `;

		if (index == null) {
			return termWebViewRef.current.injectJavaScript(script);
		}
		return termWebViewRef.current[index].injectJavaScript(
			script + 'body.style.backgroundColor = "#F1F1F1"',
		);
	};

	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} fullHeight>
			<ScrollView style={styles.container}>
				{definitions?.map(({ termHeader, termContent }, index) => {
					return (
						<View key={termHeader} style={styles.view}>
							<Text variant={'P7'} style={styles.title}>
								{`${termHeader}:`}
							</Text>
							<View style={{ height: termWebViewHeight[index] }}>
								<WebView
									ref={(c) => (termWebViewRef.current[index] = c)}
									originWhitelist={['*']}
									source={{ html: termContent }}
									style={styles.webview}
									useWebKit={true}
									onMessage={(event) => webViewOnMessage(event.nativeEvent.data, index)}
									onLoad={() => webViewOnLoad(index)}
									scrollEnabled={false}
								/>
							</View>
						</View>
					);
				})}
			</ScrollView>
		</BottomModal>
	);
};
