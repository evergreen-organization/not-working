import { colors } from 'configs';
import React, { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import { routes } from 'navigations';

import {
  BOSS_TYPE,
  GAME_INSTRUCTIONS,
  GAME_STATUS,
} from 'screens/snakeAndLadder/constant/constant';
import winBgBoss1 from '../../../assets/boss/bg-success-boss1.png';
import winBgBoss2 from '../../../assets/boss/bg-success-boss2.png';
import winBgBoss3 from '../../../assets/boss/bg-success-boss3.png';
import winBgBoss4 from '../../../assets/boss/bg-success-boss4.png';
import btnLeft from '../../../assets/trivia/btn-back.png';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { useDispatch, useSelector } from 'react-redux';
import { getGame, markBoardCompleted, setFinish, setMiniGameResult } from 'stores';
import { useGameApi } from 'screens/snakeAndLadder/utils/useGameApi';
import { LOADING } from 'constant';
import { Loading } from 'atoms';

export const BingoReadingWin = ({
  navigation,
  type,
  tile,
  currentBoard,
  onCancel,
  endGameParams,
}) => {
  const gameApi = useGameApi();
  const dispatch = useDispatch();

  const { questionStatus, isMusicOn } = useSelector(getGame) || {};

  const instructionData = GAME_INSTRUCTIONS?.[type] || {};
  const { exitButton } = GAME_INSTRUCTIONS[type] || {};

  let backgroundImg = instructionData.winBg;

  if (type === BOSS_TYPE) {
    switch (currentBoard) {
      case 0:
        backgroundImg = winBgBoss1;
        break;
      case 1:
        backgroundImg = winBgBoss2;
        break;
      case 2:
        backgroundImg = winBgBoss3;
        break;
      case 3:
        backgroundImg = winBgBoss4;
        break;
      default:
        backgroundImg = instructionData.winBg;
    }
  }

  usePBDashSound({ sound: PBDASH_SOUND.SUCCESS_BGM, loop: 0, isMusicOn });

  useEffect(() => {
    if (endGameParams) {
      gameApi.endGame(endGameParams);
    }
    if (type === BOSS_TYPE && currentBoard === 3) {
      dispatch(setFinish(true));
    }
  }, []);

  const submitCancel = () => {
    dispatch(setMiniGameResult({ tile, result: GAME_STATUS.PASSED }));
    if (tile === 50) {
      dispatch(markBoardCompleted(currentBoard));
    }

    onCancel();
  };

  const handleExit = () => {
    playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

    if (type === BOSS_TYPE) {
      if (currentBoard === 3) {
        navigation.navigate(routes.ENDING_SCREEN);
      } else {
        navigation.navigate(routes.STORY_LINE, {
          currentBoard,
        });
      }
    } else {
      submitCancel();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.background}>
        {/* {typeof score === 'number' && (
					<View style={styles.scoreContainer}>
						<Text style={styles.scoreText}>YOUR SCORE: {score}</Text>
					</View>
				)} */}

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleExit}>
            <Image
              source={exitButton ? exitButton : btnLeft}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {questionStatus === LOADING && <Loading preset={'blurFullScreen'} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  buttonImage: {
    width: 120,
    height: 120,
  },

  content: {
    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#561CE6',
    fontFamily: "'-RonySiswadi-Architect-3",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.secondaryFont,
    marginBottom: 20,
  },
  scoreContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 250,
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'orange',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
