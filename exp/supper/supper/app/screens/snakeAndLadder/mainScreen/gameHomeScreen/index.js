import { routes } from 'navigations';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { SettingPopUp } from 'screens/snakeAndLadder/components/settingPopUp';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';
import { campaignStatus, getGame, setFinish } from 'stores';
import HomeBackground from '../../assets/mainScreen/bg-mainscreen.png';
import Exit from '../../assets/mainScreen/icons/back.png';
import Setting1 from '../../assets/mainScreen/icons/settings.png';
import { LOADING } from 'constant';
import { Loading } from 'atoms';

const pbDashTitle = require('../../assets/mainScreen/game-title.png');
const touchToPlay = require('../../assets/mainScreen/play-title.png');

export const LadderDash = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedAvatar, isFinished, campaignId, endDate, status, todayDate, playerPosition } =
    useSelector(getGame);

  const [isSettingPopUp, setIsSettingPopup] = useState(false);

  const end = new Date(endDate);
  const finalDate = new Date(end);
  finalDate.setDate(end.getDate() + 7);
  const today = new Date(todayDate);

  useEffect(() => {
    if (playerPosition < 208) {
      dispatch(setFinish(false));
    }

    if (playerPosition >= 208) {
      dispatch(setFinish(true));
    }
  }, []);


  useEffect(() => {
    dispatch(campaignStatus({ campaignId }));
  }, [dispatch]);

  useEffect(() => {
    if (!endDate) {
      return;
    }

    if (today > finalDate) {
      navigation.replace(routes.FINAL_LEADERBOARD);
    }
  }, [endDate, navigation]);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleClosePopUp = () => {
    playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
    setIsSettingPopup(false);
  };
  return (
    <ImageBackground source={HomeBackground} resizeMode="stretch" style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topRow}>
          {/* Left - Exit */}
          <TouchableOpacity
            onPress={() => {
              playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
              navigation.goBack();
            }}
          >
            <Image source={Exit} style={styles.icon} />
          </TouchableOpacity>

          <View style={styles.settingView}>
            <TouchableOpacity
              onPress={() => {
                playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

                setIsSettingPopup(true);
              }}
            >
              <Image source={Setting1} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.middleContainer}
          activeOpacity={0.9}
          onPress={() => {
            playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

            if (today > end) {
              navigation.navigate(routes.FINAL_LEADERBOARD);
              return;
            }

            if (isFinished) {
              navigation.navigate(routes.ENDING_SCREEN);
              return;
            }

            if (!selectedAvatar) {
              navigation.navigate(routes.LADDER_TUTORIAL);
              return;
            }

            navigation.navigate(routes.SNAKE_AND_LADDER);
          }}
        >
          <View style={styles.titleView}>
            <Image source={pbDashTitle} style={styles.pbDashTitle} resizeMode="contain" />
          </View>
          <View style={styles.startBtnView}>
            <Animated.Image
              source={touchToPlay}
              resizeMode="contain"
              style={[styles.touchToPlay, { transform: [{ scale: scaleAnim }] }]}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <SettingPopUp
        isSettingVisible={isSettingPopUp}
        handleClosePopUp={handleClosePopUp}
        navigation={navigation}
      />
      {status === LOADING && <Loading preset={'blurFullScreen'} />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingView: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  middleContainer: {
    paddingTop: 70,
    flex: 1,
    justifyContent: 'center',
  },
  pbDashTitle: {
    width: '120%',
    height: '100%',
  },
  touchToPlay: {
    width: '100%',
    height: '50%',
  },
  titleView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  startBtnView: { flex: 3, alignItems: 'center', justifyContent: 'flex-end' },
});
