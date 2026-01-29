import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import React from 'react';
import { Card, IconNew, Space } from 'atoms';
import TestImage from 'assets/pbExLogo.png';

storiesOf('atoms/card', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>{getStory()}</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<>
			<Card>
				<Card.Title title={'Title'} subtitle={'subtitle'} />
			</Card>
			<Space height={20} />
			<Card>
				<Card.Title
					title={'Title'}
					subtitle={'subtitle'}
					left={<IconNew name={'coffee'} type={'font-awesome'} size={20} />}
					right={<IconNew name={'coffee'} type={'font-awesome'} size={20} />}
				/>
			</Card>
		</>
	))
	.add('Card Image', () => (
		<Card>
			<Card.Image source={TestImage} />
		</Card>
	));
