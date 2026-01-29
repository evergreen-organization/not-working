import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { ImageInputView } from './component';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/imageInput', module)
	.addDecorator((getStory) => <View>{getStory()}</View>)
	.add('Default', () => (
		<>
			<ImageInputView
				values={null}
				onAddNewPhoto={action('onPress')}
				index={0}
				onResetPhoto={action('onResetPhoto')}
			/>
		</>
	));
