import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeNewView } from './component';
import { actions } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { NavigationContainer } from '@react-navigation/native';

storiesOf('screens/home', module).addDecorator((getStory) =>
  <NavigationContainer>
  <SafeAreaProvider>
  {getStory()}
</SafeAreaProvider>
    </NavigationContainer>
    ).add('Default', () => (<HomeNewView
    onNavigation={actions('onNavigation')}
    onCloseMoreModal={actions('onCloseMoreModal')}
    onOpenMoreModal={actions('onOpenMoreModal')}
    handlePressMore={actions('handlePressMore')}
    handleAuthNavigation={actions('handleAuthNavigation')}
    onPromotionPress={actions('onPromotionPress')}
    showMore={boolean('showMore', false)}
    selfTestModuleAvailable={boolean('selfTestModuleAvailable', false)}
    dashboardDisabled={boolean('dashboardDisabled', true)}
    reliefDisabled={boolean('reliefDisabled', true)}
  />));
