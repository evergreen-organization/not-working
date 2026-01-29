import React from 'react';

import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { News } from 'screens/news';
import { PromotionDetails } from 'screens/promotion';

import Leave from '../../screens/home/leave/Leave';
import PendingLeave from '../../screens/home/leave/pendingLeave/PendingLeave';
import { Invitations } from 'screens/home/invitations';
import {
	LibraryMain,
	LibraryList,
	ReadingGoals,
} from '../../screens/home/library';
import { HomeNew } from '../../screens/homeNew/index';
import { MeetingList, MeetingDetails } from 'screens';

import routes from '../routes';
import { Training } from '../../screens/training';
import { Regulation } from 'screens/regulation';
import { TravelDeclarationList } from '../../screens/interstateTravel';
import { Dashboard } from 'screens/dashboard';

const Stack = createStackNavigator();

const HomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={() => ({
				headerMode: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			})}
		>
			<Stack.Screen name={routes.HOME} component={HomeNew} />
			<Stack.Screen name={routes.MEETING} component={MeetingList} />
			<Stack.Screen name={routes.MEETING_DETAILS} component={MeetingDetails} />
			<Stack.Screen name={routes.NEWS} component={News} />
			<Stack.Screen name={routes.INVITATIONS} component={Invitations} />

			{/* leave */}
			<Stack.Screen name={routes.LEAVE} component={Leave} />
			<Stack.Screen name={routes.PENDING_LEAVE} component={PendingLeave} />

			{/* promotion */}
			<Stack.Screen
				name={routes.PROMOTION_DETAILS}
				component={PromotionDetails}
			/>

			{/* training */}
			<Stack.Screen name={routes.TRAINING} component={Training} />

			{/* circulars */}
			<Stack.Screen name={routes.REGULATION} component={Regulation} />

			<Stack.Screen
				name={routes.INTERSTATE}
				component={TravelDeclarationList}
			/>

			{/* library */}
			<Stack.Screen name={routes.LIBRARY} component={LibraryMain} />
			<Stack.Screen name={routes.LIBRARY_LIST} component={LibraryList} />
			<Stack.Screen name={routes.READING_GOALS} component={ReadingGoals} />

			<Stack.Screen name={routes.DASHBOARD} component={Dashboard} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;
