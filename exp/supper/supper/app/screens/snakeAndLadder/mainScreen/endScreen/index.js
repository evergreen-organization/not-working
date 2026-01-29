import { useNavigation } from '@react-navigation/native';
import { routes } from 'navigations';
import React, { useEffect } from 'react';
import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';
import { getGame, initGame } from 'stores';

export const EndingScreen = () => {
  const { campaignId } = useSelector(getGame) || {};
  const dispatch = useDispatch()
  const navigation = useNavigation();
  usePBDashSound({ sound: PBDASH_SOUND.END_SOUND });

  useEffect(() => {
    dispatch(initGame({ campaignId }))
    const onBackPress = () => {
      // Prevent going back
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/mainScreen/bg-ending.png')}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.centeredButtonWrapper}>
          <TouchableOpacity
            onPress={() => {
              playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

              navigation.navigate(routes.MISSION);
            }}
          >
            <Image
              source={require('../../assets/mainScreen/btn-mission.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
            navigation.navigate(routes.HOME);
          }}
        >
          <Image
            source={require('../../assets/mainScreen/btn-exit-ending.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  centeredButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  buttonImage: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
  },
});
