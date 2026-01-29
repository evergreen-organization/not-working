import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

import NewYearBanner from 'assets/new-year.mp4';
import Video from 'react-native-video';

export const VideoBannerWidget = ({ onBannerPress }) => {
	const { width } = useWindowDimensions();

	return (
		<TouchableOpacity onPress={onBannerPress} style={styles.view}>
			<Video
				source={NewYearBanner}
				style={{ ...styles.video, width: width * 0.9 }}
				resizeMode="cover"
				repeat={true}
				playWhenInactive={true}
			/>
		</TouchableOpacity>
	);
};

export const styles = StyleSheet.create({
	view: {
		borderRadius: 10,
		height: undefined,
		aspectRatio: 2,
		overflow: 'hidden',
	},
	video: {
		alignSelf: 'center',
		marginTop: 20,
		flex: 1,
		borderRadius: 10,
	},
});
