import { createRef, useEffect } from 'react';
import useAppState from './useAppState';
import Sound from 'react-native-sound';
import { useIsFocused } from '@react-navigation/native';

const bgmRef = createRef();
export const useSound = ({ isBgmMute }) => {
	const appState = useAppState();
	const bgm = 'festive_song.mp3';
	const isFocused = useIsFocused();

	useEffect(() => {
		bgmRef.current = new Sound(bgm, Sound.MAIN_BUNDLE, (error) => {
			if (!error) {
				bgmRef.current.setNumberOfLoops(-1);
				bgmRef.current.setVolume(0.5);
				bgmRef.current.play((success) => {
					if (success) {
						console.log('successfully finished playing');
					} else {
						console.log('playback failed due to audio decoding errors');
					}
				});
			}
		});
		return () => {
			bgmRef.current.stop();
		};
	}, []);

	useEffect(() => {
		if (!appState || isBgmMute || !isFocused) {
			bgmRef.current.pause();
			return;
		}

		bgmRef.current.play((success) => {
			if (success) {
				console.log('successfully finished playing');
			} else {
				console.log('playback failed due to audio decoding errors');
			}
		});
	}, [appState, isBgmMute, isFocused]);
};
