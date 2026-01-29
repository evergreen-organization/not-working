import { routes } from 'navigations';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BOSS_TYPE,
  GAME_STATUS,
  NO_INTERNET_MSG,
} from 'screens/snakeAndLadder/constant/constant.js';
import {
  addShownMessage,
  clearMiniGameResult,
  getGame,
  initGame,
  markTileCompleted,
  resetCompletedTiles,
  resetShownMessages,
  setFinish,
  setIsRetry,
} from 'stores';
import ladderPopup from '../../assets/ladder_alert.png';
import defaultAvatar from '../../assets/player.png';
import snakePopup from '../../assets/snake_alert.png';
import { gameUtils } from '../../utils/gameUtils';
import { useGameApi } from '../../utils/useGameApi';
import { avatars } from '../avatarScreen/index.js';
import { SnakeAndLadderScreen } from './component.js';
import {
  allBoardSnakes,
  boardAssets,
  boxCordinates,
  columns,
  getNextAvailableType,
  initialCordinates,
  startCoordinate,
} from './conf.js';
import { styles } from './style';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound/index.js';
import { useNetInfo } from '@react-native-community/netinfo';
import { showFailure } from 'utils';
import { NoDicePopup } from 'screens/snakeAndLadder/components/noDicePopup/index.js';

export const SnakeAndLadder = ({ navigation }) => {
  const utils = gameUtils();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const [diceRoll, setDiceRoll] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [rollTrigger, setRollTrigger] = useState(0);
  const {
    tileResult,
    diceCount,
    playerPosition,
    campaignId,
    selectedAvatar,
    currentPool,
    completedTiles,
    shownInfoMessages,
    serverPosition,
    status,
    isRetry,
  } = useSelector(getGame);
  const [popupImage, setPopupImage] = useState(null); // holds the image
  const [showPopup, setShowPopup] = useState(false); // toggles visibility
  const [currentBoard, setCurrentBoard] = useState(1); // current board number
  const [boardTiles, setBoardTiles] = useState({});
  const [showDice, setShowDice] = useState(false);
  const [isSettingPopup, setIsSettingPopup] = useState(false);
  const [showNoDicePopup, setShowNoDicePopup] = useState(false);

  const selectedAssets = boardAssets[currentBoard] || boardAssets[0];
  const netInfo = useNetInfo();

  const selectedAvatarImage = avatars.find((a) => a.id === selectedAvatar)?.image;
  const playerImage = selectedAvatarImage || defaultAvatar;
  const api = useGameApi();

  const currentPosRef = useRef(0);
  const animatedPosition = useRef(
    new Animated.ValueXY({
      x: initialCordinates.left,
      y: initialCordinates.bottom,
    }),
  ).current;

  // Calculate boss position (at tile 48)
  const BOSS_TILE_INDEX = 47; // 0-indexed, so tile 48 is index 47
  const bossCoordinate = calculateBossCoordinate();

  function calculateBossCoordinate() {
    const row = Math.floor(BOSS_TILE_INDEX / columns);
    const col = BOSS_TILE_INDEX % columns;

    // Snake pattern: even rows go left-to-right, odd rows go right-to-left
    const adjustedCol = row % 2 === 0 ? col : columns - 1 - col;
    const defaultCoord = { x: width / 2, y: height / 2 };
    const tileCoord = boxCordinates[row]?.[adjustedCol] || defaultCoord;

    return {
      x: tileCoord.x,
      y: tileCoord.y + 64, // Boss offset
    };
  }

  const initializeGame = async () => {
    try {
      const response = await dispatch(initGame({ campaignId }));
      const serverPlayerPosition = response?.payload?.data?.playerPosition;

      // Sync player position if server is ahead of local
      const shouldSyncPosition =
        serverPlayerPosition && serverPosition && playerPosition < serverPlayerPosition;

      if (shouldSyncPosition) {
        api.updatePlayerPosition(playerPosition, 0);
      }
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }
  };

  useEffect(() => {
    initializeGame();
  }, []); // Run only on mount

  // Update board state when player position changes
  useEffect(() => {
    if (isRolling) {
      return;
    }

    const { tileNo, boardNo } = utils.getBoardPosition(playerPosition);
    setCurrentBoard(boardNo);
    setBoardTiles(allBoardSnakes[boardNo]);
    currentPosRef.current = tileNo;
    animateToPosition(tileNo);
  }, [playerPosition, completedTiles]);

  // Handle mini-game results
  useEffect(() => {
    if (!tileResult) {
      return;
    }

    const { tile, result } = tileResult;
    const from = parseInt(tile, 10);
    const to = parseInt(boardTiles[tile], 10);
    const isLadderBase = to > from;

    if (isLadderBase && result === GAME_STATUS.PASSED && !isRetry) {
      // Skip post-mini-game logic for first win on ladder base
      dispatch(clearMiniGameResult());
      return;
    }

    const passed = result === GAME_STATUS.PASSED;
    handlePostMiniGame(tile, passed);
    dispatch(clearMiniGameResult());
  }, [tileResult]);

  const throwDice = () => {
    if (isRolling) {
      return;
    }

    dispatch(setIsRetry(false));
    setIsRolling(true);
    playSoundEffect(PBDASH_SOUND.DICE_SOUND.audio);
    dispatch(resetCompletedTiles());

    const newDiceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(newDiceRoll);
    setRollTrigger((prev) => prev + 1);

    const currentPosition = currentPosRef.current;
    const intendedPosition = Math.min(currentPosition + newDiceRoll, 51); // Clamp max position if needed

    // Update server position immediately
    const positionToSend = utils.getPlayerPosition({
      boardNo: currentBoard,
      tileNo: intendedPosition,
    });
    api.updatePlayerPosition(positionToSend, 1);
  };

  const handleRollPress = async () => {
    // Early returns for invalid states
    if (isRolling) {
      return;
    }
    if (diceCount <= 0) {
      setShowNoDicePopup(true);
      return;
    }

    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      showFailure(NO_INTERNET_MSG);
      return;
    }

    // Execute dice roll
    playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
    setShowDice(true);
    throwDice();

    setTimeout(() => setShowDice(false), 4000);
  };

  const startAnimatedMovement = (diceNumber) => {
    const startPosition = currentPosRef.current; // Get the true current position
    moveOneStep(diceNumber, startPosition);
  };

  const moveOneStep = (stepsRemaining, currentPosition) => {
    // steps finish then trigger game
    if (stepsRemaining <= 0) {
      handleFinalPosition(currentPosition);
      return;
    }

    const nextPosition = currentPosition + 1;
    currentPosRef.current = nextPosition;

    // bigger than 50 then trigger boss
    if (nextPosition > 50) {
      animateToBoss();
      handleFinalPosition(51);
      return;
    }

    animateToNextTile(stepsRemaining, nextPosition);
  };

  const handleFinalPosition = (nextPosition) => {
    const position = utils.getPlayerPosition({ boardNo: currentBoard, tileNo: nextPosition });
    if (position === 208) {
      dispatch(setFinish(true));
    }
    handleTileInteraction(nextPosition);
  };

  const handleTileInteraction = (position) => {
    const isSnakeOrLadderStart = utils.checkStartSnakeOrLadder({ boardTiles, position });
    const isSnakeOrLadderEnd = utils.checkEndSnakeOrLadder({ boardTiles, position });
    if (isSnakeOrLadderStart) {
      handleSnakeOrLadderStart(position);
      return;
    }
    if (isSnakeOrLadderEnd) {
      showRandomInfoMessage();
      return;
    }
    triggerMiniGame(position);
  };

  const handleSnakeOrLadderStart = (nextPosition) => {
    const from = nextPosition;
    const to = parseInt(boardTiles[from], 10);
    const isSnake = to < from;

    setPopupImage(isSnake ? snakePopup : ladderPopup);
    setShowPopup(true);

    playSoundEffect(isSnake ? PBDASH_SOUND.FAILED_BGM.audio : PBDASH_SOUND.SUCCESS_BGM.audio);
    setTimeout(() => {
      setShowPopup(false);
      triggerMiniGame(nextPosition);
    }, 2000);
  };

  const showRandomInfoMessage = () => {
    let message = utils.getRandomMessage(shownInfoMessages);

    if (!message) {
      dispatch(resetShownMessages());
      message = utils.getRandomMessage([]);
    }

    dispatch(addShownMessage(message));
    navigation.navigate(routes.DY_KNOW, { message });
  };

  const animateToNextTile = (stepsRemaining, nextPosition) => {
    const coords = utils.getTileCoordinates(nextPosition);
    Animated.timing(animatedPosition, {
      toValue: { x: coords.x, y: coords.y },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      stepsRemaining--;
      moveOneStep(stepsRemaining, nextPosition);
    });
  };

  const animateToPosition = (pos) => {
    if (pos === 0 || pos == null) {
      animateToStart();
    } else if (pos > 50) {
      animateToBoss();
    } else if (pos > 0 && pos <= 50) {
      const row = Math.floor((pos - 1) / columns);
      const column = (pos - 1) % columns;
      const coords = boxCordinates[row][column];
      Animated.timing(animatedPosition, {
        toValue: { x: coords.x, y: coords.y },
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      console.warn(`Invalid position: ${pos}`);
      animateToStart();
    }
  };

  const animateToStart = () => {
    Animated.timing(animatedPosition, {
      toValue: { x: startCoordinate.x, y: startCoordinate.y },
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const animateToBoss = () => {
    Animated.timing(animatedPosition, {
      toValue: { x: bossCoordinate.x, y: bossCoordinate.y },
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const triggerMiniGame = (tile) => {
    const type = tile > 50 ? BOSS_TYPE : String(getNextAvailableType(dispatch, currentPool));
    const position = utils.getPlayerPosition({ boardNo: currentBoard, tileNo: tile });
    navigation.navigate(routes.BINGO_GAME_INSTRUCTION, {
      type,
      tile,
      position,
      dispatch,
      currentBoard,
      onDone: (wasDone) => {
        handlePostMiniGame(tile, wasDone);
      },
    });
  };

  const handlePostMiniGame = (tile, wasPassed) => {
    // If kill boss
    if (tile > 50 && wasPassed) {
      // Reset player to tile 0
      const position = utils.getPlayerPosition({ boardNo: currentBoard, tileNo: tile }) + 1;
      const { boardNo, tileNo } = utils.getBoardPosition(position);
      setCurrentBoard(boardNo);
      setBoardTiles(allBoardSnakes[boardNo]);
      currentPosRef.current = tileNo;
      animateToPosition(tileNo);
      api.updatePlayerPosition(position);
      console.log({ path: 'snakeAndLadder/handlePostMiniGame/bossPass', boardNo, tileNo });
      return;
    }

    const destinationTile = boardTiles[tile]; // snake or ladder

    // No snake or ladder on this tile — nothing to do
    if (!destinationTile) {
      return;
    }

    const from = parseInt(tile, 10);
    const to = parseInt(destinationTile, 10);

    const isSnake = to < from;
    const isLadder = to > from;

    // Don't change position if ladder is passed or snake is not passed
    if ((isSnake && wasPassed) || (isLadder && !wasPassed)) {
      dispatch(
        markTileCompleted({
          tileId: tile,
          passed: wasPassed,
          attempted: true,
        }),
      );
      return;
    }

    setShowPopup(false);
    currentPosRef.current = to;
    animateToPosition(to);
    const toPosition = utils.getPlayerPosition({ boardNo: currentBoard, tileNo: to });
    api.updatePlayerPosition(toPosition);
  };

  const handleClosePopUp = () => {
    playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

    setIsSettingPopup(false);
  };

  const props = {
    playerPosition,
    diceCount,
    animatedPosition,
    throwDice,
    isRolling,
    diceRoll,
    rollTrigger,
    setIsRolling,
    startAnimatedMovement,
    navigation,
    currentBoard,
    playerImage,
    handleClosePopUp,
    handleRollPress,
    showDice,
    isSettingPopup,
    selectedAssets,
    setShowDice,
    setIsSettingPopup,
    status,
  };
  return (
    <>
      <SnakeAndLadderScreen {...props} />

      {showPopup && popupImage && (
        <TouchableOpacity activeOpacity={1} style={styles.vwPopup}>
          <Image source={popupImage} style={styles.popupImg} />
        </TouchableOpacity>
      )}
      {showNoDicePopup && <NoDicePopup onCancel={() => setShowNoDicePopup(false)} />}
    </>
  );
};

SnakeAndLadder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
