import React from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';

import routes from '../routes';
import { NotificationTab, NotificationDetails } from 'screens/notification';
import { LG360StatusSummary } from '../../screens/leadgen360';

const Stack = createStackNavigator();

const NotificationNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerMode: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen name={routes.NOTIFICATION} component={NotificationTab} />
			<Stack.Screen
				name={routes.NOTIFICATION_DETAILS}
				component={NotificationDetails}
			/>
			<Stack.Screen
				name={routes.LG360_SUMMARY_STATUS}
				component={LG360StatusSummary}
			/>
		</Stack.Navigator>
	);
};

export default NotificationNavigator;
