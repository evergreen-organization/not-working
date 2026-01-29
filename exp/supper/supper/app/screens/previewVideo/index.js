import React from 'react';
import { Header } from 'molecules';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

export const PreviewVideo = ({ navigation, route }) => {
	const { video } = route.params || {};
	const insets = useSafeAreaInsets();

	function handleHeaderLeftBtn() {
		navigation.goBack();
	}

	return (
		<>
			<Header
				containerStyle={{
					...styles.header,
					marginTop: insets.top,
				}}
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
			/>
			<Video
				source={video}
				repeat={true}
				resizeMode="cover"
				style={styles.video}
			/>
		</>
	);
};
