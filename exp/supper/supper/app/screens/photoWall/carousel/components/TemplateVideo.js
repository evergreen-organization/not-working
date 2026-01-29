import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Video, { SelectedTrackType } from 'react-native-video';
import { useAppActive } from 'hooks';

const isIos = Platform.OS === 'ios';

export const TemplateVideo = ({ video, isSharing = false }) => {
	const isFocused = useIsFocused();
	const isAppActive = useAppActive();

	const uri = isIos ? video : `asset:///video/${video}`;

	return (
		<Video
			source={{ uri }}
			paused={!isFocused || isSharing || !isAppActive}
			style={styles.backgroundVideo}
			repeat={true}
			resizeMode="stretch"
			playWhenInactive={true}
			muted={false}
			ignoreSilentSwitch="ignore"
			selectedAudioTrack={{ type: SelectedTrackType.SYSTEM }}
		/>
	);
};

const styles = StyleSheet.create({
	backgroundVideo: {
		width: '100%',
		height: '100%',
	},
});
