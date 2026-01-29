import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { PinInput } from './index';
import { text } from '@storybook/addon-knobs';

storiesOf('organisms/pinInput', module)
	.addDecorator((getStory) => <View style={{ flex: 1 }}>{getStory()}</View>)
	.add('Default', () => (
		<PinInput
			value={text('value', '1')}
			onChange={action('onChange')}
			title={text('title', 'Set Up New Pin')}
			errorTitle={text('errorTitle', 'Fail to Enroll')}
		/>
	));
