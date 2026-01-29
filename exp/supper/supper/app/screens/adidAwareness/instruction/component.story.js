import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { ADIDInstructionScreen } from './component';

storiesOf('screens/adidAwareness/instruction', module).addDecorator((getStory) =>
 <NavigationContainer>
   <SafeAreaProvider>
     <View
       style={{ flex: 1 }}>{getStory()}</View>
   </SafeAreaProvider>
 </NavigationContainer>
 ).add('Default', () => (
  <ADIDInstructionScreen />
))
