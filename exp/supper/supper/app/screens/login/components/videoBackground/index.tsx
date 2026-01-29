import FestiveBg from 'assets/festive/login/login-bg.mp4';
import { useAppActive } from 'hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import Video, { SelectedTrackType, ViewType } from 'react-native-video';

const VideoBackground = () => {
	const isAppActive = useAppActive();

	return (
		<Video
			paused={!isAppActive}
			source={FestiveBg}
			style={styles.festiveBg}
			repeat={false}
			resizeMode="cover"
			playWhenInactive={true}
			muted={false}
			volume={1.0}
			ignoreSilentSwitch="ignore"
			selectedAudioTrack={{ type: SelectedTrackType.SYSTEM }}
			viewType={ViewType.TEXTURE}
		/>
	);
};

export default VideoBackground;

const styles = StyleSheet.create({
	festiveBg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
		zIndex: -2,
	},
});
