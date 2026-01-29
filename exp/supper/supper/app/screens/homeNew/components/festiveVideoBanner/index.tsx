import React, { memo } from 'react';
import { BannerVideo1 } from 'assets/festive/banner';
import Video from 'react-native-video';
import styles from './styles';

const FestiveVideoBanner = () => {
	return (
		<Video
			repeat
			muted
			source={BannerVideo1}
			style={styles.video}
			resizeMode="cover"
			paused={false}
		/>
	);
};

export default memo(FestiveVideoBanner);
