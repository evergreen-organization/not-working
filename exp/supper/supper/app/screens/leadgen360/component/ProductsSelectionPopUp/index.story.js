import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { ProductSelectionPopUpComp } from './component';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const data = [{ label: 'Label1' }, { label: 'Label2' }, { label: 'Label3' }];
storiesOf('screens/leadgen/productsSelectionPopUp', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ flex: 1 }}>{getStory()}</View>
		</SafeAreaProvider>
	))
	.add('Default', () => (
		<ProductSelectionPopUpComp
			visible={boolean('visible', true)}
			onClose={action('OnClose')}
			handleConfirm={action('handleSubmit')}
			getStatus={boolean('status', true)}
			data={data}
			handleSelectProduct={action('handleSelectProduct')}
			handleInfoPress={action('handleInfoPress')}
			isInfoShow={boolean('infoShow', true)}
			dataLabel={text('dataLabel', 'Product Interested')}
		/>
	));
