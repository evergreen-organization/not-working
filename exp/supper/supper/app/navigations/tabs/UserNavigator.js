import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { Profile } from 'screens/user/profile';
import { Settings } from 'screens/user/settings';
import { Disclaimer } from 'screens/user/disclaimer';
import { UserMain } from 'screens/user/userMain';

import routes from '../routes';

const Stack = createStackNavigator();

const UserNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerMode: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen name={routes.USER} component={UserMain} />
			<Stack.Screen name={routes.PROFILE} component={Profile} />
			<Stack.Screen name={routes.SETTINGS} component={Settings} />
			<Stack.Screen name={routes.DISCLAIMER} component={Disclaimer} />
		</Stack.Navigator>
	);
};

export default UserNavigator;
