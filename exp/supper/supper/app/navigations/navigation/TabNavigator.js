import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from '../tabs/HomeNavigator';
import NotificationNavigator from '../tabs/NotificationNavigator';
import UserNavigator from '../tabs/UserNavigator';
import routes from '../routes';
import { colors } from '../../configs/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { Text } from 'atoms';
import useTabBarAnimation from 'navigations/hooks/useTabBarAnimation';

const Tab = createBottomTabNavigator();

const bottomTabLabel = (label) => {
	return {
		tabBarLabel: ({ focused, color }) => (
			<Text bold={!!focused} style={[styles.bottomTabLabel, { color: color }]}>
				{label}
			</Text>
		),
	};
};

const TabNavigator = () => {
	const { translateY } = useTabBarAnimation();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.tabBarActiveTint,
				tabBarInactiveTintColor: colors.tabBarInactiveTint,
				tabBarStyle: {
					backgroundColor: colors.tabBarBg,
					borderTopWidth: 0,
					transform: [{ translateY: translateY }],
				},
			}}
		>
			<Tab.Screen
				name={routes.HOME_NAVIGATOR}
				component={HomeNavigator}
				options={{
					...bottomTabLabel('Home'),
					tabBarIcon: ({ focused, color }) => (
						<Entypo name="home" style={{ color: color, fontSize: 22 }} />
					),
					tabBarTestID: 'home-navigator',
				}}
			/>
			<Tab.Screen
				name={routes.NOTIFICATION_NAVIGATOR}
				component={NotificationNavigator}
				options={{
					...bottomTabLabel('Notification'),
					tabBarIcon: ({ focused, color }) => (
						<MaterialIcons name="notifications" style={{ color: color, fontSize: 23 }} />
					),
					tabBarTestID: 'notification-navigator',
				}}
			/>
			<Tab.Screen
				name={routes.USER_NAVIGATOR}
				component={UserNavigator}
				options={{
					...bottomTabLabel('Profile'),
					tabBarIcon: ({ focused, color }) => (
						<MaterialIcons name="person" style={{ color: color, fontSize: 25 }} />
					),
					tabBarTestID: 'user-navigator',
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	big: {
		width: 27,
		height: 27,
	},
	small: {
		width: 27,
		height: 27,
		opacity: 0.6,
	},
	bottomTabLabel: {
		fontSize: 11,
	},
});

export default TabNavigator;
