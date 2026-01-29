import { storiesOf } from '@storybook/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { HistoryDetailView } from './component';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const item = {
	approvalDate: '',
	approverId: null,
	base64Image: null,
	date: '9/15/2022 12:41:14',
	id: 87,
	result: 'Negative',
	staffName: 'UAT-39940',
	staffNo: '39940',
	status: 'Approved',
};

storiesOf('screens/selfTest/selfTestHistoryDetail', module)
	.addDecorator((getStory) => (
		<NavigationContainer>
			<SafeAreaProvider>{getStory()}</SafeAreaProvider>
		</NavigationContainer>
	))
	.add('Default', () => (
		<HistoryDetailView
			onWithdraw={action('onWithdraw')}
			loading={boolean('loading', false)}
			imageUri={null}
			item={item}
		/>
	));
