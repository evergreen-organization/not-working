import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import React from 'react';

import { Numpad } from './index';
import { action } from '@storybook/addon-actions';

storiesOf('molecules/numpad', module)
	.addDecorator((getStory) => <View style={{ flex: 1 }}>{getStory()}</View>)
	.add('Default', () => (
		<Numpad onPress={action('onPress')} onDelete={action('onDelete')} />
	));
