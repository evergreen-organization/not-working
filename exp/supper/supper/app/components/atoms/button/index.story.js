import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import React from 'react';
import { Button } from './index';
import { text } from '@storybook/addon-knobs';
import Alarm from 'assets/icon/alarm.png';
import { Space } from 'atoms';
import { colors } from 'configs';

storiesOf('atoms/button', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
				{getStory()}
			</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<>
			<Button title={text('buttonText', 'Button Text')} />
			<Space height={10} />
			<Button title={text('buttonText', 'Button Text')} leftIcon={Alarm} />
			<Space height={10} />
			<Button title={text('buttonText', 'Button Text')} rightIcon={Alarm} />
			<Space height={10} />
			<Button
				title={text('buttonText', 'Button Text')}
				color={colors.secondary}
			/>
			<Space height={10} />
			<Button title={text('buttonText', 'Button Text')} loading={true} />
		</>
	))
	.add('Text', () => (
		<>
			<Button preset={'text'} title={text('buttonText', 'Button Text')} />
			<Space height={10} />
			<Button
				preset={'text'}
				title={text('buttonText', 'Button Text')}
				leftIcon={Alarm}
			/>
			<Space height={10} />
			<Button
				preset={'text'}
				title={text('buttonText', 'Button Text')}
				rightIcon={Alarm}
			/>
			<Space height={10} />
			<Button
				preset={'text'}
				title={text('buttonText', 'Button Text')}
				color={colors.secondary}
			/>
			<Space height={10} />
			<Button
				preset={'text'}
				title={text('buttonText', 'Button Text')}
				loading={true}
			/>
		</>
	))
	.add('Outline', () => (
		<>
			<Button preset={'outline'} title={text('buttonText', 'Button Text')} />
			<Space height={10} />
			<Button
				preset={'outline'}
				title={text('buttonText', 'Button Text')}
				leftIcon={Alarm}
			/>
			<Space height={10} />
			<Button
				preset={'text'}
				title={text('buttonText', 'Button Text')}
				rightIcon={Alarm}
			/>
			<Space height={10} />
			<Button
				preset={'outline'}
				title={text('buttonText', 'Button Text')}
				color={colors.secondary}
			/>
			<Space height={10} />
			<Button
				preset={'outline'}
				title={text('buttonText', 'Button Text')}
				loading={true}
			/>
		</>
	));
