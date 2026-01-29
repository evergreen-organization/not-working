import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { WebView } from 'react-native-webview';

import InfoIcon from 'assets/icon/information.png';
import DocIcon from 'assets/icon/document.png';
import { AnimatedButton, Space, Text } from 'atoms';

import { DialogCard } from '../dialogCard';
import { styles } from './styles';
import { getContent } from './utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;

export const RegulationDialogView = ({
	headerNotEmpty,
	contentNotEmpty,
	tab,
	termDefinitionsNotEmpty,
	onInfoPress,
	attachmentsNotEmpty,
	imagesNotEmpty,
	onAttachmentPress,
	answerNotEmpty,
	handleAnswerCardPress,
	isAnswerSelected,
}) => {
	const { termDefinitions, dialogHeader, dialogContent, answers } = tab;
	const extraNotEmpty = termDefinitionsNotEmpty || attachmentsNotEmpty || imagesNotEmpty;

	const [bodyHeight, setBodyHeight] = useState(0);
	const [contentHeight, setContentHeight] = useState(bodyHeight * 0.1);
	const contentWebViewRef = useRef();
	const insets = useSafeAreaInsets();

	useEffect(() => {
		setBodyHeight(windowHeight - insets.top - insets.bottom);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onMessage = ({ nativeEvent }) => {
		const { bodyScrollHeight } = JSON.parse(nativeEvent.data);
		setContentHeight(bodyScrollHeight + bodyScrollHeight * 0.25);
	};

	const renderHeight = () => {
		if (!answerNotEmpty) {
			return contentHeight;
		}
		return Math.min(contentHeight, bodyHeight * 0.5);
	};

	const onLoad = () => {
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
		contentWebViewRef.current.injectJavaScript(script);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				{headerNotEmpty && (
					<Text
						variant={'P7'}
						style={[
							styles.headerTitle,
							extraNotEmpty || contentNotEmpty ? styles.bottomRadius : {},
						]}
					>
						{dialogHeader}
					</Text>
				)}
				{extraNotEmpty && (
					<>
						{termDefinitionsNotEmpty && (
							<AnimatedButton onPress={() => onInfoPress(termDefinitions)} icon={InfoIcon} />
						)}
						{(attachmentsNotEmpty || imagesNotEmpty) && (
							<AnimatedButton onPress={() => onAttachmentPress(tab)} icon={DocIcon} />
						)}
					</>
				)}
			</View>
			{contentNotEmpty && (
				<View
					style={[
						styles.contentContainer,
						{ minHeight: bodyHeight * 0.1 },
						answerNotEmpty ? { maxHeight: bodyHeight * 0.5 } : {},
						{ height: renderHeight() },
						headerNotEmpty || extraNotEmpty ? styles.topRadius : {},
					]}
				>
					<WebView
						ref={contentWebViewRef}
						originWhitelist={['*']}
						source={{
							html: getContent(dialogContent),
						}}
						useWebKit={true}
						onMessage={onMessage}
						onLoad={onLoad}
					/>
				</View>
			)}
			{answerNotEmpty && (
				<View style={styles.answer}>
					{answers.map(({ answerId, answerText, toDialog }, index) => (
						<DialogCard
							key={answerId}
							title={answerText}
							onPress={() => handleAnswerCardPress({ answerId, answerText, toDialog })}
							isSelected={isAnswerSelected({ answerId })}
						/>
					))}
				</View>
			)}
			<Space height={30} />
		</ScrollView>
	);
};
