import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ADIDAwarenessPopUp } from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

storiesOf('screens/adidAwareness/awarenessPopUp', module)
	.addDecorator((getStory) => <SafeAreaProvider>{getStory()}</SafeAreaProvider>)
	.add('Default', () => <ADIDAwarenessPopUp />);
