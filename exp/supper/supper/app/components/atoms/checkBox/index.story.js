import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Checkbox } from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { boolean } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';

storiesOf('atoms/checkBox', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
				{getStory()}
			</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<>
			<Checkbox
				status={boolean('status', true)}
				onPress={actions('onPress')}
				multiple={boolean('multiple', true)}
			/>
			<Checkbox
				status={boolean('status', true)}
				onPress={actions('onPress')}
				multiple={boolean('multiple', true)}
			/>
		</>
	));
