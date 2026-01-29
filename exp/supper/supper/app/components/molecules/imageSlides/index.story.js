import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ImageSlides from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdidImage from 'assets/adid/adid-1.png';

storiesOf('molecules/imageSlides', module)
	.addDecorator((getStory) => <SafeAreaProvider>{getStory()}</SafeAreaProvider>)
	.add('Default', () => (
		<ImageSlides data={[AdidImage, AdidImage, AdidImage]} />
	));
