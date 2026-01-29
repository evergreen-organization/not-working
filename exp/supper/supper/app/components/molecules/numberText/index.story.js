import React from 'react'
import {View} from 'react-native'
import { storiesOf } from '@storybook/react-native'
import {
  NumberText,
} from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const data=[
  'Text 1',
  'Text 3',
  'Text 3',
  'Text 4',
]
storiesOf('molecules/numberText', module).addDecorator((getStory) => <SafeAreaProvider>
  <View style={{paddingHorizontal:20, paddingVertical:10}}>
    {getStory()}
  </View>
</SafeAreaProvider>).add('Default', () => (
  <>
    <NumberText data={data}/>
  </>
))
