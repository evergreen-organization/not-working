import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Entypo from 'react-native-vector-icons/Entypo';

import { Icon, Screen, Text } from 'atoms';
import { BottomModal } from 'molecules';
import { colors } from 'configs';
import { routes } from 'navigations';

import { NotificationTabPersonal } from '../notificationTabPersonal';
import { NotificationTabAnnouncement } from '../notificationTabAnnouncement';
import { styles } from './styles';

const TopTab = createMaterialTopTabNavigator();

export const NotificationTabView = ({
	handleAddNewNotification,
	handleOpenNotificationModal,
	handleCloseNotificationModal,
	showModal,
	user,
}) => {
	return (
		<Screen>
			<View style={styles.headerContainer}>
				<Text variant={'H6'} style={styles.headerText}>
					Notifications
				</Text>
				{user.isPnAdmin === 1 && (
					<TouchableOpacity
						style={styles.headerIconContainer}
						onPress={handleOpenNotificationModal}
					>
						<Entypo name="plus" style={styles.headerIcon} />
					</TouchableOpacity>
				)}
			</View>
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
					name={routes.NOTIFICATION_PERSONAL}
					component={NotificationTabPersonal}
					options={{ tabBarLabel: 'Personal' }}
				/>
				<TopTab.Screen
					name={routes.NOTIFICATION_ANNOUNCEMENT}
					component={NotificationTabAnnouncement}
					options={{ tabBarLabel: 'Announcement' }}
				/>
			</TopTab.Navigator>
			<BottomModal isVisible={showModal} onCancel={handleCloseNotificationModal}>
				<TouchableOpacity style={styles.modalContainer} onPress={handleAddNewNotification}>
					<Icon type={'entypo'} name={'plus'} style={styles.icon} />
					<Text variant={'P7'}>New Notification</Text>
				</TouchableOpacity>
			</BottomModal>
		</Screen>
	);
};
