import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';

import { Text } from 'atoms';
import tickLottie from 'assets/lottie/green_tick.json';
import Loading from 'assets/lottie/survey-loading.json';

import { styles } from './styles';

export const Survey = ({ url, isPreviousTaskCompleted, onComplete }) => {
	const [complete, setComplete] = useState(false);
	const [loading, setLoading] = useState(true);
	const webViewRef = useRef(null);

	const injectedJavaScript = `
  const pageContent = document.body.innerText.toLowerCase();
  window.ReactNativeWebView.postMessage(pageContent);
  true; // Make sure to return a truthy value`;

	const handleWebViewMessage = (event) => {
		const bodyHTML = event.nativeEvent.data;
		const isSurveyTaken =
			bodyHTML.includes('thank you') ||
			bodyHTML.includes('you have already taken') ||
			bodyHTML.length === 0;
		setComplete(isSurveyTaken);
		if (isSurveyTaken) {
			onComplete();
		}
	};

	if (!isPreviousTaskCompleted) {
		return <DoPreviousTask />;
	}

	if (complete) {
		return <SuccessView />;
	}

	return (
		<View style={{ flex: 1 }}>
			{loading && <LoadingWeb />}
			<WebView
				ref={webViewRef}
				source={{ uri: url }}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				onMessage={handleWebViewMessage}
				injectedJavaScript={injectedJavaScript}
				onLoad={() => setLoading(false)}
			/>
		</View>
	);
};

const DoPreviousTask = () => {
	return (
		<View style={styles.previousTaskContainer}>
			<LottieView style={styles.loadingImage} source={Loading} autoPlay loop />
			<Text variant={'H6'} style={{ textAlign: 'center' }}>
				Please complete previous task first. Thank you.
			</Text>
		</View>
	);
};

const LoadingWeb = () => {
	return (
		<View style={styles.loadingContainer}>
			<LottieView style={styles.loadingImage} source={Loading} autoPlay loop />
		</View>
	);
};

const SuccessView = () => {
	return (
		<View style={styles.successContainer}>
			<LottieView style={styles.successImage} source={tickLottie} autoPlay loop />
			<Text variant={'P7'} style={styles.title}>
				Congratulations!
			</Text>
			<View style={styles.instructionView}>
				<Text variant={'P3'} style={styles.title}>
					{
						"You have successfully unlocked a Merdeka eFestive Card! \n\nLet's make this Merdeka festival even more special by sharing this awesome card with your loved ones!"
					}
				</Text>
			</View>
		</View>
	);
};
