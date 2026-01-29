import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { ECardTextInput } from './index';
import { colors } from 'configs';

storiesOf('organisms/eCardTextInput', module)
	.addDecorator((getStory) => <View >{getStory()}</View>)
	.add('Default', () => (
		<>
			<ECardTextInput
				style={{fontSize: 20, height:100, textAlign: 'center' }}
				placeholderTextColor={colors.black}
				placeholder={'May the miracle of Christmas bring you joy and happiness'}
				fontFamily="PTSans-NarrowBold"
			/>
		</>
	));
