import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { Toggle } from './index';
import { boolean, text } from '@storybook/addon-knobs';
import { IconNew } from 'atoms';
import { action } from '@storybook/addon-actions';

storiesOf('atoms/toggle', module)
	.addDecorator((getStory) => (
		<View style={{ paddingHorizontal: 50 }}>{getStory()}</View>
	))
	.add('Default', () => (
		<>
			<Toggle
				value={boolean('toggle', true)}
				onPress={action('Check box onPress')}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				value={boolean('toggle', true)}
				label={text('label', 'This is a label text')}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				value={boolean('toggle', true)}
				label={text('label', 'This is a label text')}
				labelPosition={'left'}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				value={boolean('toggle', true)}
				helper={text('helper', 'This is helper text')}
			/>
			<View style={{ height: 10 }} />
			<Toggle status={'disabled'} value={boolean('toggle', true)} />
			<View style={{ height: 10 }} />
			<Toggle status={'error'} value={boolean('toggle', true)} />
			<View style={{ height: 10 }} />
			<Toggle
				value={boolean('toggle', true)}
				label={'Check Box with customize icon'}
				checkboxIcon={
					<IconNew type={'material-community'} name={'eye'} size={15} />
				}
			/>
		</>
	))
	.add('Radio', () => (
		<>
			<Toggle variant={'radio'} value={boolean('radio', true)} />
			<View style={{ height: 10 }} />
			<Toggle
				variant={'radio'}
				value={boolean('radio', true)}
				label={text('label', 'This is a label text')}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'radio'}
				value={boolean('radio', true)}
				label={text('label', 'This is a label text')}
				labelPosition={'left'}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'radio'}
				value={boolean('radio', true)}
				helper={text('helper', 'This is helper text')}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'radio'}
				status={'disabled'}
				label={text('label', 'This is a label text')}
				value={boolean('radio', true)}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'radio'}
				status={'error'}
				value={boolean('radio', true)}
				label={text('label', 'This is a label text')}
				labelPosition={'left'}
			/>
		</>
	))
	.add('Switch', () => (
		<>
			<Toggle variant={'switch'} value={boolean('switch', true)} />
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				value={boolean('switch', true)}
				label={text('label', 'This is a label text')}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				value={boolean('switch', true)}
				label={text('label', 'This is a label text')}
				labelPosition={'left'}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				value={boolean('switch', true)}
				helper={text('helper', 'This is helper text')}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				status={'disabled'}
				label={text('label', 'This is a label text')}
				value={boolean('switch', true)}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				status={'error'}
				value={boolean('switch', true)}
				label={text('label', 'This is a label text')}
				labelPosition={'left'}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				switchAccessibilityMode={'text'}
				value={boolean('switch', true)}
				label={'Switch Accessibility Text Mode'}
				labelPosition={'left'}
			/>
			<View style={{ height: 10 }} />
			<Toggle
				variant={'switch'}
				switchAccessibilityMode={'icon'}
				value={boolean('switch', true)}
				label={'Switch Accessibility Icon Mode'}
				labelPosition={'left'}
			/>
		</>
	));
