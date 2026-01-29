import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { boolean, text } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';

import { colors } from 'configs';
import { Alert } from './index';
storiesOf('molecules/alert', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ backgroundColor: colors.white, paddingTop: 20 }}>
				{getStory()}
			</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<Alert
			isVisible={boolean('isVisible', true)}
			onClose={actions('onClose')}
			onConfirm={actions('onConfirm')}
			confirmButtonTitle={text('ConfirmButton', 'Confirm')}
			cancelButtonTitle={text('CancelButton', 'Cancel')}
			title={text('title', 'Confirmation')}
			description={text('description', 'This is an alert description')}
		/>
	));
