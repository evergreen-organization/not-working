import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { action } from '@storybook/addon-actions';
import { SelfTestHistoryView } from './component';

const list = [
	{
		approvalDate: '',
		approverId: null,
		base64Image: null,
		date: '9/15/2022 12:41:14',
		id: 87,
		result: 'Positive',
		staffName: 'UAT-39940',
		staffNo: '39940',
		status: 'Withdrawn',
	},
	{
		approvalDate: '',
		approverId: null,
		base64Image: null,
		date: '9/15/2022 12:41:14',
		id: 87,
		result: 'Positive',
		staffName: 'UAT-39940',
		staffNo: '39940',
		status: 'Approved',
	},
	{
		approvalDate: '',
		approverId: null,
		base64Image: null,
		date: '9/15/2022 12:41:14',
		id: 87,
		result: 'Positive',
		staffName: 'UAT-39940',
		staffNo: '39940',
		status: 'Rejected',
	},
];
storiesOf('screens/selfTest/selfTestHistory', module)
	.addDecorator((getStory) => (
		<NavigationContainer>
			<SafeAreaProvider>{getStory()}</SafeAreaProvider>
		</NavigationContainer>
	))
	.add('Default', () => (
		<SelfTestHistoryView
			historyOnPress={action('historyOnPress')}
			handleNavigation={action('handleNavigation')}
			handleActionSheet={action('handleActionSheet')}
			list={list}
			status={'succeeded'}
		/>
	));
