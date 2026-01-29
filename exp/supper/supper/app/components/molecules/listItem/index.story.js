import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import React from 'react';
import { ListItem } from './index';
import { text } from '@storybook/addon-knobs';
import { colors } from 'configs';
import AlarmImage from 'assets/icon/alarm.png';
import { IconNew } from 'atoms';

storiesOf('molecules/listItem', module)
	.addDecorator((getStory) => <View style={{ paddingHorizontal: 50, flex: 1 }}>{getStory()}</View>)
	.add('Default', () => (
		<>
			<ListItem
				title={text('title', 'This is list title')}
				description={text('description', 'This is list description')}
				style={{ backgroundColor: colors.white }}
			/>
			<ListItem
				title={text('title', 'This is list title')}
				style={{ backgroundColor: colors.white }}
				leftIcon={AlarmImage}
			/>
			<ListItem
				title={text('title', 'This is list title')}
				style={{ backgroundColor: colors.white }}
				rightIcon={AlarmImage}
			/>
			<ListItem
				title={text('title', 'This is list title')}
				style={{ backgroundColor: colors.white }}
				LeftComponent={<IconNew type={'material'} name={'edit'} />}
			/>
			<ListItem
				title={text('title', 'This is list title')}
				style={{ backgroundColor: colors.white }}
				RightComponent={<IconNew type={'material'} name={'edit'} />}
			/>
			<ListItem
				title={text('title', 'This is list title')}
				style={{ backgroundColor: colors.white }}
			>
				<IconNew type={'material'} name={'edit'} />
			</ListItem>
		</>
	));
