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
			<Tag
				title={text('title', 'Example')}
				colorScheme={Tag.colorScheme.info}
				isBold={false}
			/>

			<View style={{ height: 20 }} />
			<Tag title={text('title', 'Example')} variant={Tag.variants.dark} />
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				variant={Tag.variants.dark}
				colorScheme={Tag.colorScheme.info}
				isBold={false}
			/>
			<View style={{ height: 10 }} />
		</View>
	))
	.add('Touchable', () => (
		<View>
			<Tag title={text('title', 'Example')} onPress={action('on Press Tag')} />
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				onPress={action('on Press Tag')}
				colorScheme={Tag.colorScheme.warning}
				isBold={false}
			/>
			<View style={{ height: 20 }} />
			<Tag
				title={text('title', 'Example')}
				variant={Tag.variants.dark}
				onPress={action('on Press Tag')}
			/>
			<View style={{ height: 10 }} />
			<Tag
				title={text('title', 'Example')}
				variant={Tag.variants.dark}
				colorScheme={Tag.colorScheme.warning}
				onPress={action('on Press Tag')}
				isBold={false}
			/>
		</View>
	));
