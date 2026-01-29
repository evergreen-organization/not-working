import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import VolumeOn from 'assets/festive/home/volume-on.png';
import PlayingGif from 'assets/icon/playing.gif';
import VolumeOff from 'assets/festive/home/volume-off.png';
import Mute from 'assets/icon/mute.gif';
import { useSound } from 'hooks';

import { styles } from './styles';

export const MusicController = ({ isBgmMute, onVolumePress }) => {
	useSound({ isBgmMute });
	return (
		<TouchableOpacity onPress={() => onVolumePress()} style={styles.container}>
			{isBgmMute ? (
				<>
					<Image source={VolumeOff} style={styles.icon} />
					<Image source={Mute} style={styles.gif} />
				</>
			) : (
				<>
					<Image source={VolumeOn} style={styles.icon} />
					<Image source={PlayingGif} style={styles.gif} />
				</>
			)}
		</TouchableOpacity>
	);
};
