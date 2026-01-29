import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header } from 'molecules';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Journey = ({ navigation }) => {
	const insets = useSafeAreaInsets();

	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={styles.bar}>
				<Header
					containerStyle={{ marginTop: insets.top }}
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleHeaderLeftBtn,
					}}
				/>
			</View>

			<WebView
				bounces={false}
				source={{ uri: 'https://www.surveymonkey.com/r/pbjtutorialvidpage' }}
				useWebKit={true}
			/>
		</View>
	);
};
export default Journey;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bar: {
		position: 'absolute',
		zIndex: 1,
	},
});
