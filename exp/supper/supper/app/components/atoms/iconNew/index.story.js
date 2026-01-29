import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storiesOf } from '@storybook/react-native';
import { text } from '@storybook/addon-knobs';

import { colors } from 'configs';
import { IconNew } from './index';

storiesOf('atoms/iconNew', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View
				style={{
					backgroundColor: colors.lightGrey,
					padding: 20,
					alignItems: 'center',
				}}
			>
				{getStory()}
			</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<IconNew
			type={text('icon type', 'antdesign')}
			name={text('icon name', 'star')}
			size={50}
			color={colors.blue}
		/>
	));
