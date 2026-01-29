import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { ADIDFaq } from './index';

storiesOf('screens/adidAwareness/faq', module).addDecorator((getStory) =>
  <NavigationContainer>
    <SafeAreaProvider>{getStory()}
    </SafeAreaProvider>
  </NavigationContainer>
).add('Default', () => (
  <ADIDFaq
  />
))
