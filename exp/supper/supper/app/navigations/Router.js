import React, { useCallback } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { getUserLoggedIn } from '../stores/user';
import { navigationRef } from './RootNavigation';
import { SystemBars } from 'react-native-edge-to-edge';

const Router = ({ navigationIntegration }) => {
	const isUserLoggedIn = useSelector(getUserLoggedIn);
	const onReady = useCallback(() => {
		RNBootSplash.hide();
		navigationIntegration.registerNavigationContainer(navigationRef);
	}, []);

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={onReady}
			key={isUserLoggedIn ? 'app-navigator' : 'auth-navigator'}
		>
			<SystemBars style="auto" />
			{isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};

export default Router;
