import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storiesOf } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { text, number } from '@storybook/addon-knobs';

import { Typography } from 'styles';
import { Header } from './index';
import { colors } from 'configs';

storiesOf('molecules/header', module)
	.addDecorator((getStory) => (
		<NavigationContainer>
			<SafeAreaProvider>{getStory()}</SafeAreaProvider>
		</NavigationContainer>
	))
	.add('Default', () => (
		<Header
			leftComponent={{
				icon: text('Left Icon Name', 'chevron-left'),
				type: text('Left Icon type', 'font-awesome'),
				testID: 'header-back-button',
			}}
			centerComponent={{
				text: text('Header Text', 'Test Header'),
				style: Typography.H6,
			}}
			rightComponent={{
				testID: 'add-travel-declaration',
				icon: text('Right Icon Name', 'plus'),
				type: text('Right Icon Type', 'entypo'),
				styles: {
					fontSize: number('Right Icon size', 25),
					color: colors.primary,
				},
			}}
		/>
	));
