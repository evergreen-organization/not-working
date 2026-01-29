import { NavigationContainer } from '@react-navigation/native';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ADIDFaqResult } from './index';

storiesOf('screens/adidAwareness/faqResult', module)
	.addDecorator((getStory) => (
		<NavigationContainer>
			<SafeAreaProvider>{getStory()}</SafeAreaProvider>
		</NavigationContainer>
	))
	.add('Default', () => <ADIDFaqResult />);
