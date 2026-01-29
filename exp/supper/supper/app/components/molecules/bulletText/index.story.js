import React from 'react'
import {View} from 'react-native'
import { storiesOf } from '@storybook/react-native'
import {
  BulletText,
} from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {text} from '@storybook/addon-knobs'

const data = [
  'Text 1',
  'Text 2',
  'Text 3',
  'Text 4',
]
storiesOf('molecules/bulletText', module).addDecorator((getStory) => <SafeAreaProvider>
  <View style={{paddingHorizontal:20, paddingVertical:10}}>
    {getStory()}
  </View>
</SafeAreaProvider>).add('Default', () => (
    <BulletText data={data} />
))
