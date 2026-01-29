// SoundManager.js
import { useNavigationState } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';
import { getGame } from 'stores';
import { PBDASH_SOUND } from './index';

export const useGlobalSound = () => {
	const { isMusicOn } = useSelector(getGame);
	const bgmRef = useRef(null);

	// Get current route safely
	const routes = useNavigationState((state) => state?.routes ?? []);
	const currentRoute = routes.length > 0 ? routes[routes.length - 1]?.name : null;

	const allowedRoutes = [
		'LadderDash',
		'SnakeAndLadder',
		'LadderTutorial',
		'Avatar',
		'StoryLine',
		'Mission',
		'leaderboard',
		'DidYouKnow',
		'BingoGameInstruction',
		'FinalLeaderBoard',
	];

	const stopBGSound = () => {
		if (bgmRef.current) {
			bgmRef.current?.stop(() => {
				bgmRef.current?.release();
				bgmRef.current = null;
			});
		}
	};

	useEffect(() => {
		const shouldPlayMusic = isMusicOn && allowedRoutes.includes(currentRoute);

		if (shouldPlayMusic) {
			if (!bgmRef.current) {
				bgmRef.current = new Sound(PBDASH_SOUND.SNAKE_LADDER_BGM.audio, (error) => {
					if (!error) {
						bgmRef.current?.setNumberOfLoops(-1);
						bgmRef.current?.setVolume(1);
						bgmRef.current?.play();
					}
				});
			} else {
				bgmRef.current?.play();
			}
		} else {
			stopBGSound();
		}
	}, [currentRoute, isMusicOn]);

	useEffect(() => {
		return () => {
			stopBGSound();
		};
	}, []);
};
