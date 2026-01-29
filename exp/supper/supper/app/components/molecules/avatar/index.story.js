import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import { colors } from 'configs';

import { Avatar } from './index';
import TestAvatarImage from 'assets/avatar/004.png';
import { IconNew } from 'atoms';

storiesOf('molecules/avatar', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View
				style={{
					backgroundColor: colors.white,
					paddingTop: 20,
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{getStory()}
			</View>
		</SafeAreaProvider>
	))
	.add('Image', () => (
		<Avatar
			preset={'type'}
			containerStyle={{ backgroundColor: colors.lightGrey }}
			source={TestAvatarImage}
			rounded
			size={number('Avatar Size', 120)}
			accessory
		/>
	))
	.add('Text', () => (
		<Avatar
			preset={'text'}
			title={'AN'}
			rounded
			size={number('Avatar Size', 120)}
			accessory
			accessorySize={number('Accessory Size', 30)}
		/>
	))
	.add('Icon', () => (
		<Avatar
			preset={'icon'}
			icon={<IconNew type="antdesign" name="android1" size={80} />}
			rounded
			size={number('Avatar Size', 120)}
			accessory
			accessoryIcon={<IconNew type="antdesign" name="edit" />}
			onPressAccessory={action('accessoryPress')}
		/>
	));
