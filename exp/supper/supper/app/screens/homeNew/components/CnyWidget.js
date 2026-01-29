import React, { useState } from 'react'
import { createRef } from 'react'
import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { Easing } from 'react-native'
import { Image } from 'react-native'
import { Animated } from 'react-native'
import Sound from 'react-native-sound'

const bgmRef = createRef()
export function CnyDragonDance() {
  const { width } = useWindowDimensions()
  const [animatedVal] = useState(new Animated.Value(0))
  const translateX = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width]
  })

  useEffect(() => {
    Animated.timing(animatedVal,
      {
        delay: 1000,
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start()
  }, [])

  return (
    <Animated.View style={{ top: -50, marginBottom: -90, zIndex: 1, transform: [{ translateX: translateX }] }}>
      <Image
        resizeMode='contain'
        style={{ height: 90, width: 130 }} source={require('../../../assets/cny/dragon-dance-1.gif')} />
    </Animated.View>
  )
}

export function CnyWealthGod() {
  const { width } = useWindowDimensions()
  const [animatedVal] = useState(new Animated.Value(0))
  const [invert, setInvert] = useState(false)
  const translateX = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: [width, (width + 80) * -1]
  })

  useEffect(() => {
    Animated.timing(animatedVal,
      {
        delay: 5000,
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => {
        setInvert(true)
        Animated.timing(animatedVal,
          {
            toValue: 0,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
          }).start()
      })
  }, [])

  return (
    <Animated.View style={{ top: -30, zIndex: 1, elevation: 2, transform: [{ translateX: translateX }], marginBottom: -80 }}>
      <Image
        resizeMode='contain'
        style={{ height: 80, transform: [{ rotateY: invert ? '180deg' : '0deg' }] }} source={require('../../../assets/cny/floating-wealth-god.gif')} />
    </Animated.View>
  )
}

export const useCNY_BGM = () => {
  const bgm = 'cny_song_chai_shen.mp3'
  useEffect(() => {
    bgmRef.current = new Sound(bgm, Sound.MAIN_BUNDLE, (error) => {
      if (!error) {
        bgmRef.current.setVolume(0.5)
        bgmRef.current.play()
      }
    })

    return () => { bgmRef.current.stop() }
  }, [])
}