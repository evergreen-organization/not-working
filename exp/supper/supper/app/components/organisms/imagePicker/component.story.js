import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomImagePickerView } from './component';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/customImagePicker', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ paddingHorizontal: 12 }}>{getStory()}</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<CustomImagePickerView
			handleActionSheet={action('onPress')}
			imageUri={null}
			actionSheet={null}
		/>
	));
