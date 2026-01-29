import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Header } from 'molecules';
import { Screen } from 'atoms';
import { colors } from 'configs';
import { routes } from 'navigations';

import { PendingAdministerTab } from '../pendingAdminiesterTab';
import { CompleteAdministerTab } from '../completeAdministerTab';
import { Typography } from 'styles';
import { useNavigation } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

export const CovidAdministratorNavigator = () => {
	const navigation = useNavigation();
	const handleGoBack = () => navigation.goBack();
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleGoBack,
				}}
				centerComponent={{
					text: 'Administer Self Test Result',
					style: Typography.H6,
				}}
			/>
			<TopTab.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						fontFamily: 'Montserrat-Regular',
						fontSize: 12,
						textTransform: 'none',
					},
					tabBarStyle: { backgroundColor: colors.background, shadowRadius: 0 },
					tabBarIndicatorStyle: {
						backgroundColor: colors.primary,
						height: 1.5,
					},
				}}
			>
				<TopTab.Screen
					name={routes.COVID_PENDING_TAB}
					options={{ tabBarLabel: 'Pending' }}
					component={PendingAdministerTab}
				/>
				<TopTab.Screen
					name={routes.COVID_COMPLETE_TAB}
					options={{ tabBarLabel: 'Completed' }}
					component={CompleteAdministerTab}
				/>
			</TopTab.Navigator>
		</Screen>
	);
};
