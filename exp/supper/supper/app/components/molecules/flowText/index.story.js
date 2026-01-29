import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  FLowText,
} from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

storiesOf('molecules/flowText', module).addDecorator((getStory) => <SafeAreaProvider>
  {getStory()}
</SafeAreaProvider>).add('Default', () => (
  <FLowText
    data={['Profile', 'Settings', 'Enable PB SecureSign']}
  />
))
