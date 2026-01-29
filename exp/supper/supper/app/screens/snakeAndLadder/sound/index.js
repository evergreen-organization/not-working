import { useIsFocused } from '@react-navigation/native';
import { useAppState } from 'hooks';
import { createRef, useEffect } from 'react';
import Sound from 'react-native-sound';

const pbdash_bgm = createRef();
const snakeladder_bgm = createRef();
const btn_clicked_sound = createRef();
const dice_sound = createRef();
const boss_sound = createRef();
const slay_boss = createRef();
const success_sound = createRef();
const lose_sound = createRef();
const trivia_bgm = createRef();
const hangman_bgm = createRef();
const truetrapped_bgm = createRef();
const wordzzle_bgm = createRef();
const codered_bgm = createRef();
const key_clicked_sound = createRef();
const warning_sound = createRef();
const flappybird_sound = createRef();
const whackamole_sound = createRef();
const spaceshooter_sound = createRef();
const whack_sound = createRef();
const endgame_sound = createRef();

export const PBDASH_SOUND = {
	BGM: { audio: require('../components/soundManager/sounds/pb_dash.mp3'), ref: pbdash_bgm },
	SNAKE_LADDER_BGM: {
		audio: require('../components/soundManager/sounds/pb_dash.mp3'),
		ref: snakeladder_bgm,
	},
	BOSS_SOUND: {
		audio: require('../components/soundManager/sounds/boss_level.mp3'),
		ref: boss_sound,
	},
	BTN_CLICKED: {
		audio: require('../components/soundManager/sounds/select_sound.mp3'),
		ref: btn_clicked_sound,
	},
	KEY_CLICKED: {
		audio: require('../components/soundManager/sounds/click_sound_keyboard.mp3'),
		ref: key_clicked_sound,
	},
	WARNING_SOUND: {
		audio: require('../components/soundManager/sounds/warning-wordzzle.mp3'),
		ref: warning_sound,
	},
	DICE_SOUND: {
		audio: require('../components/soundManager/sounds/dice_sound2.mp3'),
		ref: dice_sound,
	},
	SLAY_BOSS: {
		audio: require('../components/soundManager/sounds/slay_boss.mp3'),
		ref: slay_boss,
	},
	SUCCESS_BGM: {
		audio: require('../components/soundManager/sounds/success.mp3'),
		ref: success_sound,
	},
	FAILED_BGM: {
		audio: require('../components/soundManager/sounds/failed.mp3'),
		ref: lose_sound,
	},
	TRIVIA_SOUND: { audio: require('../components/soundManager/sounds/trivia.mp3'), ref: trivia_bgm },
	HANGMAN_SOUND: {
		audio: require('../components/soundManager/sounds/hangman.mp3'),
		ref: hangman_bgm,
	},
	TRUETRAPPED_SOUND: {
		audio: require('../components/soundManager/sounds/true_trapped.mp3'),
		ref: truetrapped_bgm,
	},
	WORDZZLE_SOUND: {
		audio: require('../components/soundManager/sounds/wordzzle.mp3'),
		ref: wordzzle_bgm,
	},
	CODERED_SOUND: {
		audio: require('../components/soundManager/sounds/code_red.mp3'),
		ref: codered_bgm,
	},
	FLAPPYBIRD_SOUND: {
		audio: require('../components/soundManager/sounds/flappy_bird.mp3'),
		ref: flappybird_sound,
	},
	WHACKAMOLE_SOUND: {
		audio: require('../components/soundManager/sounds/whack_mole.mp3'),
		ref: whackamole_sound,
	},
	SPACESHOOTER_SOUND: {
		audio: require('../components/soundManager/sounds/space_shooter.mp3'),
		ref: spaceshooter_sound,
	},
	WHACK_SOUND: {
		audio: require('../components/soundManager/sounds/whack_sound.mp3'),
		ref: whack_sound,
	},
	END_SOUND: {
		audio: require('../components/soundManager/sounds/end_game.mp3'),
		ref: endgame_sound,
	},
};

const playAudio = ({ soundRef }) => {
	soundRef.current?.play((success) => {
		if (success) {
			soundRef.current.release();
		}
	});
};

const playSoundSystem = ({ soundRef, audio, volume, loop }) => {
	soundRef.current = new Sound(audio, (error) => {
		if (!error) {
			if (loop) {
				soundRef.current.setNumberOfLoops(loop);
			}
			soundRef.current.setVolume(volume);
			playAudio({ soundRef });
		}
	});
};

export const playSoundEffect = (audio) => {
	const soundRef = createRef();
	playSoundSystem({ soundRef, audio, volume: 0.9 });
};

export const usePBDashSound = ({ sound, isPause = false, loop = -1, isMusicOn = true }) => {
	const appState = useAppState();
	const { ref, audio } = sound || {};
	const isFocused = useIsFocused();

	useEffect(() => {
		if (!sound || !isMusicOn) {
			return;
		}

		ref.current = new Sound(audio, (error) => {
			if (!error && !isPause) {
				ref.current.setNumberOfLoops(loop);
				ref.current.setVolume(1);
				ref.current.play();
			}
		});
		return () => {
			ref.current?.stop();
		};
	}, []);

	useEffect(() => {
		if (!appState || !isFocused || isPause) {
			ref.current?.pause();
			return;
		}

		ref.current?.play();
	}, [appState, isFocused, isPause, isMusicOn]);
};

export const useGameBgm = (audio) => {
	const soundRef = createRef();
	const appState = useAppState();
	const isFocused = useIsFocused();

	useEffect(() => {
		playSoundSystem({ soundRef, audio, volume: 0.5, loop: -1 });

		return () => {
			if (soundRef?.current) {
				soundRef.current?.stop();
			}
		};
	}, []);

	useEffect(() => {
		if (!appState || !isFocused) {
			if (soundRef?.current) {
				soundRef.current?.pause();
			}
			return;
		}

		playAudio({ soundRef });

		return () => {
			if (soundRef?.current) {
				soundRef.current?.stop();
			}
		};
	}, [appState, isFocused]);
};
