import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import React from 'react';
import { Dot } from './index';

storiesOf('atoms/dot', module)
	.addDecorator((getStory) => <View style={{ flex: 1 }}>{getStory()}</View>)
	.add('Default', () => <Dot size={6} />);
