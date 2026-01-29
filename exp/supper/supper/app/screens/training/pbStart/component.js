import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from 'molecules';
import { styles } from './styles';

export const PBStartHereView = (props) => {
	const { uri, handleBackPressed } = props;
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<View style={styles.bar}>
				<Header
					containerStyle={{ marginTop: insets.top }}
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleBackPressed,
					}}
				/>
			</View>
			<WebView bounces={false} source={{ uri }} useWebKit={true} />
		</View>
	);
};
