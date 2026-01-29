import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storiesOf } from '@storybook/react-native';
import { text, number } from '@storybook/addon-knobs';

import { colors } from 'configs';
import { Icon } from './index';

storiesOf('atoms/icon', module)
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
		<Icon
			type={text('icon type', 'antdesign')}
			name={text('icon name', 'star')}
			style={{
				fontSize: number('fontSize', 25),
				color: text('color', '#FFE664'),
			}}
		/>
	));
