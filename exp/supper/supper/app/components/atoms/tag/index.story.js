import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { View } from 'react-native';
import { Tag } from './index';

storiesOf('atoms/tag', module)
	.addDecorator((getStory) => (
		<View style={{ paddingHorizontal: 50 }}>{getStory()}</View>
	))
	.add('Default', () => (
		<View>
			<Tag title={text('title', 'Example')} />
			<View style={{ height: 10 }} />
			<Tag title={text('title', 'Example')} colorScheme={'error'} />
			<View style={{ height: 10 }} />
			<Tag title={text('title', 'Example')} colorScheme={'success'} />
			<View style={{ height: 10 }} />
			<Tag title={text('title', 'Example')} colorScheme={'warning'} />

			<View style={{ height: 20 }} />
			<Tag title={text('title', 'Example')} preset={'dark'} />
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				preset={'dark'}
				colorScheme={'error'}
			/>
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				preset={'dark'}
				colorScheme={'success'}
			/>
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				preset={'dark'}
				colorScheme={'warning'}
			/>
			<View style={{ height: 10 }} />
		</View>
	))
	.add('Touchable', () => (
		<View>
			<Tag
				title={text('title', 'Example')}
				onPress={action('on Press TagNew')}
			/>
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				onPress={action('on Press TagNew')}
				colorScheme={'warning'}
			/>
			<View style={{ height: 20 }} />
			<Tag
				title={text('title', 'Example')}
				preset={'dark'}
				onPress={action('on Press TagNew')}
			/>
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				preset={'dark'}
				colorScheme={'warning'}
				onPress={action('on Press TagNew')}
			/>
		</View>
	));
