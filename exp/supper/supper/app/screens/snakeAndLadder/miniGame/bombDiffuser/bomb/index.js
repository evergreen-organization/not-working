import React, { useEffect, useMemo, useRef, useState } from 'react';
import Moment from 'moment';
import { useAppState } from '@react-native-community/hooks';

import {
  GAME_INDICATOR,
  GAME_QUESTION_CONFIG,
  GAME_TYPE,
  NO_INTERNET_MSG,
  NO_INTERNET_TITLE,
  RETRY_TEXT,
} from '../../../constant/constant';
import { BombDiffuserComp } from './component';
import { useSelector } from 'react-redux';
import { getGame } from 'stores';

import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const MAX_TIME = 25;
export const BombDiffuser = ({ route, navigation }) => {
  const { type, tile, currentBoard, position, questions, questionSession, isRetry } =
    route.params || {};

  const { campaignId, isMusicOn } = useSelector(getGame);
  const GAME_CONFIG = GAME_QUESTION_CONFIG[type];

  const currentAppState = useAppState();
  const isBackground = currentAppState === 'background';

  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [num, setNum] = useState(MAX_TIME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [bingoResult, setBingoResult] = useState(null);

  const netInfo = useNetInfo();

  const alertVisibleRef = useRef(false); // Prevents multiple alerts
  const lastQuestionAlertShownRef = useRef(false);
  const backgroundMoment = useRef(0);
  const intervalRef = useRef();
  const hasNavigated = useRef(false);
  const lastTimerMS = useRef(Moment().valueOf());

  const rawQuestion = questions?.[currentQuestionIndex];

  usePBDashSound({ sound: PBDASH_SOUND.CODERED_SOUND, isMusicOn });

  useEffect(() => {
    const isLastQuestion = currentQuestionIndex === GAME_CONFIG.QUESTION_NUMBER - 1;

    if (
      isLastQuestion &&
      !lastQuestionAlertShownRef.current &&
      (netInfo.isConnected === false || netInfo.isInternetReachable === false)
    ) {
      showNoInternetAlert();
      lastQuestionAlertShownRef.current = true;
    }

    if (netInfo.isConnected && netInfo.isInternetReachable) {
      lastQuestionAlertShownRef.current = false;
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable, currentQuestionIndex, GAME_CONFIG]);

useEffect(() => {
  if (!isBackground) {
    const interval = Moment().diff(backgroundMoment.current, 'seconds');

    if (num - interval > 0) {
      setNum(num - interval);
    }

    lastTimerMS.current = Moment().valueOf();
  }

  backgroundMoment.current = Moment();
}, [isBackground]);

  useEffect(() => {
    if (success) return;

    clearInterval(intervalRef.current);

    if (!isTimerRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    if (!intervalRef.current) {
      lastTimerMS.current = Moment().valueOf();
      intervalRef.current = setInterval(() => {
        const now = Moment().valueOf();
        const elapsed = Math.floor((now - lastTimerMS.current) / 1000);

        if (elapsed >= 1) {
          setNum((prevNum) => {
            const newNum = Math.max(prevNum - elapsed, 0);

            if (newNum <= 0) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              return 0;
            }
            return newNum;
          });

          lastTimerMS.current = now;
        }
      }, 200);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isTimerRunning, success, isRetry]);

  // Reset game state when retry
  useEffect(() => {
    if (isRetry) {
      setIsWrongAnswer(false);
      setIsCorrectAnswer(false);
      setNum(MAX_TIME);
      setCurrentQuestionIndex(0);
      setSuccess(false);
      setIsTimerRunning(true);
      setUserAnswers([]);
      hasNavigated.current = false;
      setBingoResult(null);
      lastTimerMS.current = Moment().valueOf();
    }
  }, [isRetry]);

  useEffect(() => {
    let timer;

    if (isWrongAnswer) {
      timer = setTimeout(() => setIsWrongAnswer(false), 1500);
    }

    if (isCorrectAnswer) {
      timer = setTimeout(() => setIsCorrectAnswer(false), 1500);
    }

    return () => clearTimeout(timer);
  }, [isWrongAnswer, isCorrectAnswer]);

  useEffect(() => {
    if (hasNavigated.current) {
      return;
    }

    if (num === 0) {
      const correctAnswersOnly = userAnswers.filter((a) => a.answer === 0);
      hasNavigated.current = true;
      setBingoResult(GAME_INDICATOR.LOSE);
      setUserAnswers(correctAnswersOnly);
    } else if (success) {
      hasNavigated.current = true;
      setBingoResult(GAME_INDICATOR.WIN);
    }
  }, [num, success]);

  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const showNoInternetAlert = () => {
    if (alertVisibleRef.current) {
      return;
    }

    alertVisibleRef.current = true;

    Alert.alert(
      NO_INTERNET_TITLE,
      NO_INTERNET_MSG,
      [
        {
          text: RETRY_TEXT,
          onPress: () => {
            alertVisibleRef.current = false;

            // Add a small delay before checking again to prevent immediate recursion
            setTimeout(() => {
              if (netInfo.isConnected === false || netInfo.isInternetReachable === false) {
                showNoInternetAlert();
              }
            }, 1000);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const currentQuestion = useMemo(() => {
    if (!rawQuestion) {
      return {};
    }

    const shuffledOptions = shuffleArray(rawQuestion.options);
    const correctAnswer = rawQuestion.options[0];
    const correctIndex = shuffledOptions.findIndex((opt) => opt === correctAnswer);

    return {
      ...rawQuestion,
      shuffledOptions,
      correctIndex,
    };
  }, [rawQuestion]);

  const handleCorrectPress = () => {
    playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
    playSoundEffect(PBDASH_SOUND.SUCCESS_BGM.audio);

    setIsWrongAnswer(false);
    setIsCorrectAnswer(true);
    setNum((prev) => prev + 2);
  };

  const handleWrongPress = () => {
    playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
    playSoundEffect(PBDASH_SOUND.FAILED_BGM.audio);

    setIsWrongAnswer(true);
    setIsCorrectAnswer(false);

    setNum((prev) => {
      if (prev - 7 > 0) {
        return prev - 7;
      }
      return 0;
    });
  };

  const handleAnswer = async (answerIndex) => {
    const currentQ = currentQuestion;
    const isCorrect = answerIndex === currentQ.correctIndex;
    const answerToSend = isCorrect ? 0 : 1;

    const newAnswer = { questionId: currentQ.questionId, answer: answerToSend };
    setUserAnswers((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex((a) => a.questionId === currentQ.questionId);

      if (existingIndex !== -1) {
        updated[existingIndex] = newAnswer;
      } else {
        updated.push(newAnswer);
      }

      return updated;
    });
    setIsTimerRunning(false);

    if (!isCorrect) {
      handleWrongPress();
      setTimeout(() => {
        setIsTimerRunning(true);
      }, 1500);
      return;
    }

    handleCorrectPress();

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const updatedAnswers = [...userAnswers];
    const existingIndex = updatedAnswers.findIndex((a) => a.questionId === currentQ.questionId);

    if (existingIndex !== -1) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex === GAME_CONFIG.QUESTION_NUMBER - 1) {
      setSuccess(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    setIsTimerRunning(true);
  };

  const props = {
    handleAnswer,
    num,
    currentQuestion,
    currentQuestionIndex,
    success,
    isWrongAnswer,
    type,
    navigation,
    isCorrectAnswer,
    tile,
    route,
    currentBoard,
    position,
    campaignId,
    GAME_TYPE,
    questionSession,
    userAnswers,
    bingoResult,
  };

  return <BombDiffuserComp {...props} />;
};
